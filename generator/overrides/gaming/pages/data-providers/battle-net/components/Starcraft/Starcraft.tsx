import { FC } from 'react'
import Image from 'next/image'

import { BattleNetProfileCredentialSubject } from 'types/data-providers'
import { AvatarIcon } from 'assets/avatar'
import starcraftHeartOfTheSwarm from 'public/images/starcraftHeartOfTheSwarm@3x.webp'
import starcraftWingOfLiberty from 'public/images/starcraftWingOfLiberty@3x.webp'
import starcraftLegacyOfTheVoid from 'public/images/starcraftLegacyOfTheVoid@3x.webp'
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

    <div className="grid lg:grid-cols-12 lg:gap-x-16 gap-x-12 gap-y-8">
      {data?.completedCampaignDifficulties?.heartOfTheSwarm && (
        <div className="lg:col-span-4 col-span-12">
          <S.Block alignItems="center" justifyContent="center" $isBig>
            <Image src={starcraftHeartOfTheSwarm} alt="Starcraft: Hart of the swarm" />
          </S.Block>
        </div>
      )}

      {data?.completedCampaignDifficulties?.wingOfLiberty && (
        <div className="lg:col-span-4 col-span-12">
          <S.Block alignItems="center" justifyContent="center" $isBig>
            <Image src={starcraftWingOfLiberty} alt="Starcraft: Wings of liberty" />
          </S.Block>
        </div>
      )}

      {data?.completedCampaignDifficulties?.legacyOfTheVoid && (
        <div className="lg:col-span-4 col-span-12">
          <S.Block alignItems="center" justifyContent="center" $isBig>
            <Image src={starcraftLegacyOfTheVoid} alt="Starcraft: Legacy of the void" />
          </S.Block>
        </div>
      )}

      {!data?.completedCampaignDifficulties?.legacyOfTheVoid &&
        !data?.completedCampaignDifficulties?.heartOfTheSwarm &&
        !data?.completedCampaignDifficulties?.wingOfLiberty && (
          <div className="col-span-12">
            <Typography variant="p1">No finished campaigns.</Typography>
          </div>
      )}
    </div>
  </>
)

export default Starcraft
