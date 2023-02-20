export interface BattleNetProfileCredentialSubject {
  accountId: number
  battleTag: string
  games: {
    diablo3?: {
      paragonLevel: number
      guildName?: string
      kills: number
      heroes: {
        id: number
        name: string
        class: string
        kills: number
      }[]
    }
    starcraft2?: {
      id: string
      displayName: string
      realm: number
      totalSwarmLevel: number
      totalAchievementPoints: number
      currentBestTeamLeagueName?: string
      totalCareerGames: number
      seasonCareerGames: {
        terranWins: number
        zergWins: number
        protossWins: number
      }
    }
    worldOfWarcraft?: {
      id: number
      characters: {
        id: number
        name: string
        faction: string
        race: string
        characterClass: string
        realm: string
        guildName?: string
        level: number
        achievementPoints: number
        specialization: string
        money: number
        totalItemValueGained: number
      }[]
    }
  }
}
