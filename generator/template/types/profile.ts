import { DataProvider } from '../utils/data-providers'
import { VerifiableCredential } from './vc'

export type VcProfileMap = {
  [provider in DataProvider]: VerifiableCredential | undefined
}
