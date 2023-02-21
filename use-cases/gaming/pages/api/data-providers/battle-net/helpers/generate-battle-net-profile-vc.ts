import { nanoid } from 'nanoid'
import { BattleNetProfileCredentialSubject } from 'types/data-providers'
import { VerifiableCredential } from 'types/vc'

const VC_JSON_SCHEMA_URL = 'https://schema.affinidi.com/@did:elem:EiC8fehVnWr2XAXlNSdHWg8fy1s8rMImwgn3YaNZQL--jg/BattleNetProfileV1-3.json'
const VC_JSON_LD_CONTEXT_URL = 'https://schema.affinidi.com/@did:elem:EiC8fehVnWr2XAXlNSdHWg8fy1s8rMImwgn3YaNZQL--jg/BattleNetProfileV1-3.jsonld'

export function generateBattleNetProfileVc(holderDid: string, credentialSubject: BattleNetProfileCredentialSubject): VerifiableCredential {
  return {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      VC_JSON_LD_CONTEXT_URL,
    ],
    id: `claimId:${nanoid()}`,
    type: ['VerifiableCredential', 'BattleNetProfile'],
    holder: {
      id: holderDid,
    },
    issuanceDate: new Date().toISOString(),
    credentialSubject,
    credentialSchema: {
      type: 'JsonSchemaValidator2018',
      id: VC_JSON_SCHEMA_URL,
    }
  }
}
