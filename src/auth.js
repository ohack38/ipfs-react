import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import * as KeyResolver from 'key-did-resolver'


// Create a ThreeIdConnect connect instance as soon as possible in your app to start loading assets
const threeID = new ThreeIdConnect()

async function authenticateWithEthereum(ethereumProvider) {
  // Request accounts from the Ethereum provider
  const accounts = await ethereumProvider.request({
    method: 'eth_requestAccounts',
  })
  console.log('before Authprovider')
  // Create an EthereumAuthProvider using the Ethereum provider and requested account
  const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
  // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
  // generate the authentication secret
  console.log('before 3idConnect')
  await threeID.connect(authProvider)

  const ceramic = new CeramicClient()
  console.log('ceramic-client: ', ceramic)
  const did = new DID({
    // Get the DID provider from the 3ID Connect instance
    provider: threeID.getDidProvider(),
    resolver: {
      ...get3IDResolver(ceramic),
      ...getKeyResolver(),
    },
  })
  console.log('did: ', did)
  // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
  // authentication flow using 3ID Connect and the Ethereum provider
  await did.authenticate()
  console.log('auth')
  // The Ceramic client can create and update streams using the authenticated DID
  ceramic.did = did
  console.log('Connected with DID:', did.id)

}

async function authenticateDid(){
    const seed = new Uint8Array(32)// 32 bytes of entropy, Uint8Array
    const provider = new Ed25519Provider(seed)
    const did = new DID({ provider, resolver: KeyResolver.getResolver() })

    // Authenticate with the provider
    await did.authenticate()

    // Read the DID string - this will throw an error if the DID instance is not authenticated
    const aliceDID = did.id

    console.log(aliceDID)
}

// When using extensions such as MetaMask, an Ethereum provider may be injected as `window.ethereum`
export async function tryAuthenticate() {
  if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider')
  }
   // await authenticateDid()
    await authenticateWithEthereum(window.ethereum)
}



