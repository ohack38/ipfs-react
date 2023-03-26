import React, { useState } from 'react';

import './App.css'

import { didId } from './auth'
import Feed from './components/feed/Feed';

function App() {

    const [wallet, setWallet] = useState({
        did: ""
    });

    const connectWallet = () => {
        const did = didId
        if (did != "") {
            setWallet({ did: did })
            console.log(did)
        }
    }
    return (
        <div className="App">
            <div className='navbar'>
                {wallet.did == ""
                    ? <button onClick={connectWallet}>Connect Wallet</button>
                    : <Feed activeDid={wallet.did} />
                }
            </div>
        </div>
    )
}

export default App
