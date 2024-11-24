import React from 'react'
import { Button } from '@mui/material'

const Header = () => {
  return (
    <div className={'p-8 text-3xl flex gap-2'}>
      {
        ['Swap', 'Tokens'].map(tab =>
          <Button key={tab} className="hover:bg-gray-700/80 text-white hover:bg-blue-700" style={{
          color: 'white'}
          } variant="text">{tab}</Button>)
      }
    </div>
  )
}

export default Header