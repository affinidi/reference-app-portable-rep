import { FC } from 'react'

import { BattleNetProfileCredentialSubject } from 'types/data-providers'
import { AvatarIcon } from 'assets/avatar'
import { Box, Typography } from 'components'

import Card from '../Card/Card'

import * as S from './Starcraft.styled'

type StarcraftProps = {
  data: BattleNetProfileCredentialSubject['games']['starcraft2']
}

const Starcraft: FC<StarcraftProps> = ({ data }) => (
  <>
    <S.UserInfo direction="row" alignItems="center" gap={16}>
      <AvatarIcon />

      <Box gap={8}>
        <Typography variant="h7">{data?.displayName}</Typography>
        {data?.currentBestTeamLeagueName && <Typography variant="p2">Best team league</Typography>}
      </Box>
    </S.UserInfo>

    <div className="grid lg:grid-cols-12 lg:gap-x-16 gap-x-12 gap-y-8">
      <div className="lg:col-span-4 col-span-12">
        <Card name="Swarm level" count={data?.totalSwarmLevel} />
      </div>

      <div className="lg:col-span-4 col-span-12">
        <Card name="Achievement points" count={data?.totalAchievementPoints} />
      </div>

      <div className="lg:col-span-4 col-span-12">
        <Card name="Career games" subText="total" count={data?.totalCareerGames} />
      </div>

      <div className="lg:col-span-4 col-span-12">
        <Card name="Career games" subText="current season" count={data?.seasonCareerGames?.total} />
      </div>
    </div>

    <S.Title variant="h7">Season career games</S.Title>

    <div className="grid lg:grid-cols-12 lg:gap-x-16 gap-x-12 gap-y-8">
      <div className="lg:col-span-2 col-span-6">
        <S.Block gap={8}>
          <S.BlockTitle variant="p1">Terran wins</S.BlockTitle>
          <Typography variant="h5">{data?.seasonCareerGames?.terranWins}</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-2 col-span-6">
        <S.Block gap={8}>
          <S.BlockTitle variant="p1">Protos wins</S.BlockTitle>
          <Typography variant="h5">{data?.seasonCareerGames?.protossWins}</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-2 col-span-6">
        <S.Block gap={8}>
          <S.BlockTitle>Zerg wins</S.BlockTitle>
          <Typography variant="h5">{data?.seasonCareerGames?.zergWins}</Typography>
        </S.Block>
      </div>
    </div>

    <S.Title variant="h7">Campaigns completed</S.Title>

    <div className="grid lg:grid-cols-12 lg:gap-x-16 gap-x-12">
      {data?.completedCampaignDifficulties?.heartOfTheSwarm && (
        <div className="lg:col-span-4 col-span-12">
          <S.Block alignItems="center" justifyContent="center" gap={8} $isBig>
            <Typography variant="h6">Starcraft</Typography>
            <Typography variant="p0">Hart of the swarm</Typography>
          </S.Block>
        </div>
      )}

      {data?.completedCampaignDifficulties?.wingOfLiberty && (
        <div className="lg:col-span-4 col-span-12">
          <S.Block alignItems="center" justifyContent="center" gap={8} $isBig>
            <Typography variant="h6">Starcraft</Typography>
            <Typography variant="p0">Wings of libery</Typography>
          </S.Block>
        </div>
      )}

      {data?.completedCampaignDifficulties?.legacyOfTheVoid && (
        <div className="lg:col-span-4 col-span-12">
          <S.Block alignItems="center" justifyContent="center" gap={8} $isBig>
            <Typography variant="h6">Starcraft</Typography>
            <Typography variant="p0">Legacy of the void</Typography>
          </S.Block>
        </div>
      )}
    </div>
  </>
)

export default Starcraft
