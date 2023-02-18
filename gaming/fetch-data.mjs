import fs from 'fs/promises'
import axios from 'axios'

async function test() {
  const { clientId, clientSecret, issuer, region, accessToken } = JSON.parse(await fs.readFile('.env', { encoding: 'utf-8' }))

  const { accountId, battleTag } = await fetchBattleNetProfile({ accessToken })

  // TODO: avatar, name
  
  console.log({ accountId, battleTag })

  const diabloProfile = await fetchDiablo3Profile({ region, accessToken, battleTag })
  console.log(diabloProfile)

  const starcraftProfile = await fetchStarcraft2Profile({ accessToken, accountId, region })
  console.log(starcraftProfile)

  const worldOfWarcraftProfile = await fetchWorldOfWarcraftProfile({ region, accessToken })
  console.log(worldOfWarcraftProfile)
}

async function fetchBattleNetProfile({ accessToken }) {
  const {
    data: { id, battletag }
  } = await axios('https://oauth.battle.net/oauth/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
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
        timePlayed,
      }
    } = await axios(`https://${region}.api.blizzard.com/d3/profile/${encodeURIComponent(battleTag)}/?locale=en_US&access_token=${accessToken}`)

    return {
      paragonLevel,
      guildName,
      kills: Object.values(kills).reduce((a, b) => a + b, 0),
      heroes: heroes.map((hero) => ({
        name: hero.name,
        class: hero.class,
        level: hero.level,
        kills: Object.values(hero.kills).reduce((a, b) => a + b, 0),
      })),
      timePlayed,
    }
  } catch (error) {
    if (error.response.status === 404) {
      return null
    }

    throw error
  }
}

async function fetchStarcraft2Profile({ region, accountId, accessToken }) {
  const {
    data: [profile],
  } = await axios(`https://${region}.api.blizzard.com/sc2/player/${accountId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!profile) {
    return null
  }

  const {
    profileId,
    regionId,
    realmId,
  } = profile

  const {
    data: {
      summary: {
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
        campaign: {
          difficultyCompleted
        }
      }
    }
  } = await axios(`https://${region}.api.blizzard.com/sc2/profile/${regionId}/${realmId}/${profileId}?locale=en_US&access_token=${accessToken}`)

  return {
    swarmLevel: totalSwarmLevel,
    achievementPoints: totalAchievementPoints,
    games: totalCareerGames,
    bestTeamLeague: currentBestTeamLeagueName,
    season: {
      games: totalGamesThisSeason,
      terranWins,
      zergWins,
      protossWins,
    },
    campaigns: {
      wingsOfLiberty: difficultyCompleted['wings-of-liberty'],
      heartOfTheSwarm: difficultyCompleted['heart-of-the-swarm'],
      legacyOfTheVoid: difficultyCompleted['legacy-of-the-void'],
    }
  }
}

async function fetchWorldOfWarcraftProfile({ region, accessToken }) {
  try {
    const {
      data: {
        wow_accounts
      }
    } = await axios(`https://${region}.api.blizzard.com/profile/user/wow?namespace=profile-${region}&locale=en_US&access_token=${accessToken}`)

    const accountCharacters = wow_accounts.flatMap(i => i.characters)

    const characters = await Promise.all(
      accountCharacters.map(async (character) => {
        const characterId = character.id
        const realmId = character.realm.id
        const realmSlug = character.realm.slug
        const characterName = character.name.toLowerCase()

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
        } = await axios(`https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${encodeURIComponent(characterName)}?namespace=profile-${region}&locale=en_US&access_token=${accessToken}`)

        const {
          data: {
            money,
            protected_stats: {
              total_item_value_gained,
            }
          }
        } = await axios(`https://${region}.api.blizzard.com/profile/user/wow/protected-character/${realmId}-${characterId}?namespace=profile-${region}&locale=en_US&access_token=${accessToken}`)
      
        return {
          faction: faction.name,
          race: race.name,
          characterClass: characterClass.name,
          specialization: specialization.name,
          realm: realm.name,
          guild: guild.name,
          level,
          achievementPoints,
          money,
          totalItemValueGained: total_item_value_gained,
        }
      })
    )

    return { characters }
  } catch (error) {
    if (error.response.status === 404) {
      return null
    }
  }
}

test()
