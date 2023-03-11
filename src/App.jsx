import React, { useState } from 'react';

import './App.css'

import { tryAuthenticate } from './auth'

function App() {

//    const [walletConnected, setWalletConnected] = useState(false);

    return (
        <div className="App">
            <div className='navbar'>
                <button onClick={tryAuthenticate}>Connect Wallet</button>
            </div>
        </div>
    )
}

export default App
