import fs from 'fs/promises'
import axios from 'axios'

async function test() {
  const { region, accessToken } = JSON.parse(await fs.readFile('.env', { encoding: 'utf-8' }))

  const battleNetProfile = await fetchBattleNetProfile({ accessToken })
  const { accountId, battleTag } = battleNetProfile

  const worldOfWarcraft = await fetchWorldOfWarcraftProfile({ region, accessToken })
  const diablo3 = await fetchDiablo3Profile({ region, accessToken, battleTag })
  const starcraft2 = await fetchStarcraft2Profile({ accessToken, accountId, region })

  return {
    accountId,
    battleTag,
    games: {
      diablo3,
      starcraft2,
      worldOfWarcraft,
    }
  }
}

async function fetchBattleNetProfile({ accessToken }) {
  const {
    data: { id, battletag }
  } = await axios('https://oauth.battle.net/oauth/userinfo', {
    headers: generateAuthorizationHeaders(accessToken)
  })

  return {
    accountId: id,
    battleTag: battletag,
  }
}

async function fetchDiablo3Profile({ region, battleTag, accessToken }) {
  try {
    const {
      data: {
        paragonLevel,
        guildName,
        kills,
        heroes,
      }
    } = await axios(`https://${region}.api.blizzard.com/d3/profile/${encodeURIComponent(battleTag)}/`, {
      params: { locale: 'en_US' },
      headers: generateAuthorizationHeaders(accessToken),
    })

    return {
      paragonLevel,
      guildName,
      kills: Object.values(kills).reduce((a, b) => a + b, 0),
      heroes: heroes.map((hero) => ({
        id: hero.id,
        name: hero.name,
        class: hero.class,
        level: hero.level,
        kills: Object.values(hero.kills).reduce((a, b) => a + b, 0),
      })),
    }
  } catch (error) {
    if ([500, 404].includes(error.response.status)) {
      return undefined
    } else {
      throw error
    }
  }
}

async function fetchStarcraft2Profile({ region, accountId, accessToken }) {
  try {
    const {
      data: [profile],
    } = await axios(`https://${region}.api.blizzard.com/sc2/player/${accountId}`, {
      params: { locale: 'en_US' },
      headers: generateAuthorizationHeaders(accessToken),
    })
  
    if (!profile) {
      return undefined
    }
  
    const { profileId, regionId, realmId } = profile
    const {
      data: {
        summary: {
          id,
          displayName,
          totalSwarmLevel,
          totalAchievementPoints,
        },
        career: {
          terranWins,
          zergWins,
          protossWins,
          totalCareerGames,
          totalGamesThisSeason,
          currentBestTeamLeagueName,
        }
      }
    } = await axios(`https://${region}.api.blizzard.com/sc2/profile/${regionId}/${realmId}/${profileId}`, {
      params: { locale: 'en_US' },
      headers: generateAuthorizationHeaders(accessToken),
    })
  
    return {
      id,
      displayName,
      realmId,
      totalSwarmLevel,
      totalAchievementPoints,
      currentBestTeamLeagueName,
      totalCareerGames,
      seasonCareerGames: {
        total: totalGamesThisSeason,
        terranWins,
        zergWins,
        protossWins,
      }
    }
  } catch (error) {
    if ([500, 404].includes(error.response.status)) {
      return undefined
    } else {
      throw error
    }
  }
}

async function fetchWorldOfWarcraftProfile({ region, accessToken }) {
  try {
    const {
      data: {
        id,
        wow_accounts,
      }
    } = await axios(`https://${region}.api.blizzard.com/profile/user/wow`, {
      params: {
        locale: 'en_US',
        namespace: `profile-${region}`,
      },
      headers: generateAuthorizationHeaders(accessToken),
    })

    const accountCharacters = wow_accounts.flatMap(i => i.characters)

    const characters = (await Promise.all(
      accountCharacters.map(
        (character) => fetchWorldOfWarcraftCharacter({ character, region, accessToken })
      )
    ))

    return {
      id,
      characters: characters.filter(Boolean)
    }
  } catch (error) {
    if ([500, 404].includes(error.response.status)) {
      return undefined
    } else {
      throw error
    }
  }
}

async function fetchWorldOfWarcraftCharacter({ character, region, accessToken }) {
  try {
    const {
      data: {
        faction,
        race,
        active_spec: specialization,
        character_class: characterClass,
        realm,
        guild,
        level,
        achievement_points: achievementPoints,
      }
    } = await axios(`https://${region}.api.blizzard.com/profile/wow/character/${encodeURIComponent(character.realm.slug)}/${encodeURIComponent(character.name.toLowerCase())}`, {
      params: {
        locale: 'en_US',
        namespace: `profile-${region}`,
      },
      headers: generateAuthorizationHeaders(accessToken),
    })

    let money, totalItemValueGained
    try {
      const { data } = await axios(`https://${region}.api.blizzard.com/profile/user/wow/protected-character/${character.realm.id}-${character.id}`, {
        params: {
          locale: 'en_US',
          namespace: `profile-${region}`,
        },
        headers: generateAuthorizationHeaders(accessToken),
      })
      money = data.money
      totalItemValueGained = data.protected_stats.total_item_value_gained
    } catch (error) {
      if (![500, 404].includes(error.response.status)) {
        throw error
      }
    }

    return {
      id: character.id,
      name: character.name,
      factionName: faction.name,
      raceName: race.name,
      characterClassName: characterClass.name,
      specializationName: specialization?.name,
      realmName: realm.name,
      guildName: guild?.name,
      level,
      achievementPoints,
      money,
      totalItemValueGained,
    }
  } catch (error) {
    if ([500, 404].includes(error.response.status)) {
      return undefined
    } else {
      throw error
    }
  }
}

function generateAuthorizationHeaders(accessToken) {
  return {
    'Authorization': `Bearer ${accessToken}`
  }
}

test()
  .then((result) => console.log(JSON.stringify(result, null, 2)))
