import axios from 'axios'
import { BattleNetProfileCredentialSubject } from 'types/data-providers'
import { battleNetRegion } from '../../env'

export async function gatherBattleNetProfile(accessToken: string, region: string = battleNetRegion): Promise<BattleNetProfileCredentialSubject> {
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

async function fetchBattleNetProfile(input: { accessToken: string }) {
  const {
    data: { id, battletag }
  } = await axios('https://oauth.battle.net/oauth/userinfo', {
    headers: generateAuthorizationHeaders(input.accessToken)
  })

  return {
    accountId: id,
    battleTag: battletag,
  }
}

async function fetchDiablo3Profile(input: { region: string, battleTag: string, accessToken: string }) {
  try {
    const {
      data: {
        paragonLevel,
        guildName,
        kills,
        heroes,
      }
    } = await axios<{
      paragonLevel: number
      guildName?: string
      kills: Record<string, number>
      heroes: {
        id: number
        name: string
        class: string
        level: number
        kills: Record<string, number>
      }[]
    }>(`https://${input.region}.api.blizzard.com/d3/profile/${encodeURIComponent(input.battleTag)}/`, {
      params: { locale: 'en_US' },
      headers: generateAuthorizationHeaders(input.accessToken),
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

async function fetchStarcraft2Profile(input: { region: string, accountId: number, accessToken: string }) {
  try {
    const {
      data: [profile],
    } = await axios<{
      profileId: number
      realmId: number
      regionId: number
    }[]>(`https://${input.region}.api.blizzard.com/sc2/player/${input.accountId}`, {
      params: { locale: 'en_US' },
      headers: generateAuthorizationHeaders(input.accessToken),
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
    } = await axios<{
      summary: {
        id: string
        displayName: string
        totalSwarmLevel: number
        totalAchievementPoints: number
      }
      career: {
        terranWins: number
        zergWins: number
        protossWins: number
        totalCareerGames: number
        totalGamesThisSeason: number
        currentBestTeamLeagueName?: string
      }
    }>(`https://${input.region}.api.blizzard.com/sc2/profile/${regionId}/${realmId}/${profileId}`, {
      params: { locale: 'en_US' },
      headers: generateAuthorizationHeaders(input.accessToken),
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

async function fetchWorldOfWarcraftProfile(input: { region: string, accessToken: string }) {
  try {
    const {
      data: {
        id,
        wow_accounts,
      }
    } = await axios<{
      id: number,
      wow_accounts: {
        characters: WarcraftAccountCharacter[]
      }[]
    }>(`https://${input.region}.api.blizzard.com/profile/user/wow`, {
      params: {
        locale: 'en_US',
        namespace: `profile-${input.region}`,
      },
      headers: generateAuthorizationHeaders(input.accessToken),
    })

    const accountCharacters = wow_accounts.flatMap(i => i.characters)
    const characters = (await Promise.all(
      accountCharacters.map(
        (character) => fetchWorldOfWarcraftCharacter({
          character,
          region: input.region,
          accessToken: input.accessToken,
        })
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

async function fetchWorldOfWarcraftCharacter(input: { character: WarcraftAccountCharacter, region: string, accessToken: string }) {
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
    } = await axios<{
      faction: { name: string }
      race: { name: string }
      active_spec?: { name: string }
      character_class: { name: string }
      realm: { name: string }
      guild?: { name: string }
      level: number
      achievement_points: number
    }>(`https://${input.region}.api.blizzard.com/profile/wow/character/${encodeURIComponent(input.character.realm.slug)}/${encodeURIComponent(input.character.name.toLowerCase())}`, {
      params: {
        locale: 'en_US',
        namespace: `profile-${input.region}`,
      },
      headers: generateAuthorizationHeaders(input.accessToken),
    })

    let money, totalItemValueGained
    try {
      const { data } = await axios(`https://${input.region}.api.blizzard.com/profile/user/wow/protected-character/${input.character.realm.id}-${input.character.id}`, {
        params: {
          locale: 'en_US',
          namespace: `profile-${input.region}`,
        },
        headers: generateAuthorizationHeaders(input.accessToken),
      })
      money = data.money
      totalItemValueGained = data.protected_stats.total_item_value_gained
    } catch (error) {
      if (![500, 404].includes(error.response.status)) {
        throw error
      }
    }

    return {
      id: input.character.id,
      name: input.character.name,
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

interface WarcraftAccountCharacter {
  id: number
  name: string
  realm: {
    id: number
    slug: string
  }
}
