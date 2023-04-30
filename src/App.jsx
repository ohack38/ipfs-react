import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import { didId } from './auth'
import Feed from './components/feed/Feed';
import Navbar from './components/Navbar';
import Share from './components/share/Share';
import Friends from './components/friends/Friends';

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
                    : <Navbar activeDid={wallet.did} />
                }
            </div>

            <Routes>
                <Route path='/' element={<Feed activeDid={wallet.did} />} />
                <Route path='/share' element={<Share />} />
                <Route path='/friends' element={<Friends />} />
            </Routes>

        </div>
    )
}

export default App
