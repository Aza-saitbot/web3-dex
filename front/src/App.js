import { Button } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Swap from './components/Swap'
import Tokens from './components/Tokens'
import Header from './components/Header'

const App = () =>{
  return (
    <div className="text-white h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <Header/>
      <Routes>
        <Route path="/" element={<Swap />} />
        <Route path="/tokens" element={<Tokens />}/>
      </Routes>
    </div>
  );
}

export default App;
