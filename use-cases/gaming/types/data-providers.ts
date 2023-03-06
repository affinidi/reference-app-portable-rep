export interface BattleNetProfileCredentialSubject {
  accountId: number
  battleTag: string
  games: {
    diablo3?: {
      paragonLevel: number
      guildName?: string
      totalKills: number
      heroes: {
        id: number
        name: string
        class: string
        level: number
        totalKills: number
        timePlayed: {
          demonHunter: number
          barbarian: number
          witchDoctor: number
          necromancer: number
          wizard: number
          monk: number
          crusader: number
        }
      }[]
    }
    starcraft2?: {
      id: string
      displayName: string
      realmId: number
      totalSwarmLevel: number
      totalAchievementPoints: number
      currentBestTeamLeagueName?: string
      totalCareerGames: number
      seasonCareerGames: {
        total: number
        terranWins: number
        zergWins: number
        protossWins: number
      },
      completedCampaignDifficulties: {
        wingOfLiberty?: string,
        heartOfTheSwarm?: string,
        legacyOfTheVoid?: string,
      }
    }
    worldOfWarcraft?: {
      id: number
      characters: {
        id: number
        name: string
        factionName: string
        raceName: string
        characterClassName: string
        specializationName?: string
        realmName: string
        guildName?: string
        level: number
        achievementPoints: number
        money?: number
        totalItemValueGained?: number
      }[]
    }
  }
}
