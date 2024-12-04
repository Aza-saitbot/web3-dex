import React from 'react'
import { Button } from '@mui/material'
import rocketPng from '../assets/rocket.png'

const Header = () => {
  return (
    <div className={'p-8 text-3xl flex justify-between'}>
      <div className={'flex'}>
        <div className={'text-xl mr-10'}>
          <img src={rocketPng} alt=""/>
        </div>
        <div className={'flex gap-10'}>
          {
            ['Swap', 'Tokens'].map(tab =>
              <Button key={tab} className="hover:bg-gray-700/80 text-white hover:bg-blue-700" style={{
                color: 'white'
              }
              } variant="text">{tab}</Button>)
          }
        </div>
      </div>
      <div>
        <Button className="hover:bg-gray-700/80 text-white" style={{
          color: '#78767a',
          backgroundColor: 'white'
        }
        } variant="contained">Connect Wallet</Button>
      </div>
    </div>
  )
}

export default Header