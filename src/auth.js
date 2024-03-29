import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'


// DOCS
// 3ID did libraries provide support for the did:3 method, either using a seed or an authId associated to an authSecret (recommended).
// 3ID Connect uses crypto wallet as auth secret
// side note: If this would be rewrittewn, it would be done using did:pkh instead of did:3 since thats whats being focused one

// Create a ThreeIdConnect connect instance as soon as possible in your app to start loading assets
const threeID = new ThreeIdConnect()

async function authenticateWithEthereum(ethereumProvider) {
    // Request accounts from the Ethereum provider
    const accounts = await ethereumProvider.request({
        method: 'eth_requestAccounts',
    })
    // Create an EthereumAuthProvider using the Ethereum provider and requested account
    const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
    // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
    // generate the authentication secret
    await threeID.connect(authProvider)

    const ceramic = new CeramicClient()
    const did = new DID({
        // Get the DID provider from the 3ID Connect instance
        provider: threeID.getDidProvider(),
        resolver: {
            ...get3IDResolver(ceramic),
            ...getKeyResolver(),
        },
    })
    // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
    // authentication flow using 3ID Connect and the Ethereum provider
    await did.authenticate()
    // The Ceramic client can create and update streams using the authenticated DID
    ceramic.did = did

    return did.id
}

let didId;
// When using extensions such as MetaMask, an Ethereum provider may be injected as `window.ethereum`
if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider')
}
didId = await authenticateWithEthereum(window.ethereum)

export { didId }



