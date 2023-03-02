import { FC } from 'react'

import { BattleNetProfileCredentialSubject } from 'types/data-providers'
import { Typography } from 'components'

import Panel from '../Panel/Panel'

import * as S from './WorldOfWarcraft.styled'

type WorldOfWarcraftProps = {
  data: BattleNetProfileCredentialSubject['games']['worldOfWarcraft']
}

const WorldOfWarcraft: FC<WorldOfWarcraftProps> = ({ data }) => (
  <>
    <S.MainTitle variant="h7">My characters</S.MainTitle>

    <div className="grid lg:grid-cols-1 lg:gap-x-16 gap-x-12 gap-y-8">
      {data?.characters.map(character => (
        <Panel title={character.name} key={character.id}>
          <div className="grid grid-cols-12 lg:gap-x-16 gap-x-12 gap-y-8">
            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Level</S.Label>
              <Typography variant="p1">{character.level}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Achievement points</S.Label>
              <Typography variant="p1">{character.achievementPoints}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Money</S.Label>
              <Typography variant="p1">{character.money}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Character class</S.Label>
              <Typography variant="p1">{character.characterClassName}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Realm</S.Label>
              <Typography variant="p1">{character.realmName}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Money</S.Label>
              <Typography variant="p1">{character.money}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Guild</S.Label>
              <Typography variant="p1">{character.guildName}</Typography>
            </div>

            <div className="md:col-span-4 lg:col-span-2 col-span-6">
              <S.Label variant="p5">Specialization</S.Label>
              <Typography variant="p1">{character.specializationName}</Typography>
            </div>
          </div>
        </Panel>
      ))}

      {!data?.characters.length && (
        <div className="col-span-12">
          <Typography variant="p1">No characters yet.</Typography>
        </div>
      )}
    </div>
  </>
)

export default WorldOfWarcraft
