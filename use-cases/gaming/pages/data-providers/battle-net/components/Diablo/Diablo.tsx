import { FC } from 'react'

import { BattleNetProfileCredentialSubject } from 'types/data-providers'
import { Typography } from 'components'

import Card from '../Card/Card'
import Panel from '../Panel/Panel'

import * as S from './Diablo.styled'

type DiabloProps = {
  data: BattleNetProfileCredentialSubject['games']['diablo3']
}

const formatPercentage = (value = 0) => (value * 100).toFixed()

const Diablo: FC<DiabloProps> = ({ data }) => (
  <>
    <S.MainTitle variant="h7">Guild name</S.MainTitle>

    <div className="grid lg:grid-cols-12 lg:gap-x-16 gap-x-12 gap-y-8">
      <div className="lg:col-span-4 col-span-12">
        <Card name="Paragon level" count={data?.paragonLevel || 0} />
      </div>

      <div className="lg:col-span-4 col-span-12">
        <Card name="Total kills" count={data?.totalKills || 0} />
      </div>
    </div>

    <S.Title variant="h7">Time played</S.Title>

    <div className="grid lg:grid-cols-12 lg:gap-x-16 gap-x-12 gap-y-8">
      <div className="lg:col-span-4 col-span-12">
        <S.Block direction="row" alignItems="center" justifyContent="space-between" gap={8}>
          <S.BlockTitle variant="p1">Demon hunter</S.BlockTitle>
          <Typography variant="p1">{formatPercentage(data?.timePlayed?.demonHunter)}%</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-4 col-span-12">
        <S.Block direction="row" alignItems="center" justifyContent="space-between" gap={8}>
          <S.BlockTitle variant="p1">Witch doctor</S.BlockTitle>
          <Typography variant="p1">{formatPercentage(data?.timePlayed?.witchDoctor)}%</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-4 col-span-12">
        <S.Block direction="row" alignItems="center" justifyContent="space-between" gap={8}>
          <S.BlockTitle variant="p1">Necromancer</S.BlockTitle>
          <Typography variant="p1">{formatPercentage(data?.timePlayed?.necromancer)}%</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-4 col-span-12">
        <S.Block direction="row" alignItems="center" justifyContent="space-between" gap={8}>
          <S.BlockTitle variant="p1">Wizard</S.BlockTitle>
          <Typography variant="p1">{formatPercentage(data?.timePlayed?.wizard)}%</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-4 col-span-12">
        <S.Block direction="row" alignItems="center" justifyContent="space-between" gap={8}>
          <S.BlockTitle variant="p1">Monk</S.BlockTitle>
          <Typography variant="p1">{formatPercentage(data?.timePlayed?.monk)}%</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-4 col-span-12">
        <S.Block direction="row" alignItems="center" justifyContent="space-between" gap={8}>
          <S.BlockTitle variant="p1">Crusader</S.BlockTitle>
          <Typography variant="p1">{formatPercentage(data?.timePlayed?.crusader)}%</Typography>
        </S.Block>
      </div>

      <div className="lg:col-span-4 col-span-12">
        <S.Block direction="row" alignItems="center" justifyContent="space-between" gap={8}>
          <S.BlockTitle variant="p1">Barbarian</S.BlockTitle>
          <Typography variant="p1">{formatPercentage(data?.timePlayed?.barbarian)}%</Typography>
        </S.Block>
      </div>
    </div>


    <S.Title variant="h7">Heroes</S.Title>

    <div className="grid lg:grid-cols-1 lg:gap-x-16 gap-x-12 gap-y-8">
      {data?.heroes.map(hero => (
        <Panel title={hero.name} key={hero.id}>
          <div className="grid lg:grid-cols-12 lg:gap-x-16 gap-x-12">
            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Class</S.Label>
              <Typography variant="p1">{hero.class}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Level</S.Label>
              <Typography variant="p1">{hero.level}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Kills</S.Label>
              <Typography variant="p1">{hero.totalKills}</Typography>
            </div>
          </div>
        </Panel>
      ))}

      {!data?.heroes?.length && (
        <div className="col-span-12">
          <Typography variant="p1">No heroes yet.</Typography>
        </div>
      )}
    </div>
  </>
)

export default Diablo
