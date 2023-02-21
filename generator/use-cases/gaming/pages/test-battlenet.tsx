import { FC } from 'react'
import { Header, Container, Button } from 'components'
import { DataProvider, initiateDataImport } from 'utils/data-providers'

const TestBattleNet: FC = () => {
  async function handleTest() {
    await initiateDataImport(DataProvider.BATTLE_NET)
  }

  return (
    <>
      <Header title="Test Battle.net" />
      <Container>
        <Button onClick={handleTest}>Authenticate & issue VC</Button>
      </Container>
    </>
  )
}

export default TestBattleNet
