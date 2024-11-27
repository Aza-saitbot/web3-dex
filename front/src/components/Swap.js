import React, { useRef, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Button, ButtonGroup, Input, Popover, TextField } from '@mui/material'

const buttons = [
  <Button key={0.5}>O.5%</Button>,
  <Button key={2.5}>2.5%</Button>,
  <Button key={5.0}>5.0%</Button>
]
const Swap = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [tokenOneAmount,setTokenOneAmount]=useState(0)
  const [tokenTwoAmount,setTokenTwoAmount]=useState(0)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpenPopup(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsOpenPopup(false)
  }

  const onChange=(e)=>{
    setTokenOneAmount(e.target.value)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const settingsProps = {
    input: {
      style: {
        fontSize: 46
      }
    }
  }

  return (
    <div className={'flex justify-center pt-16'}>
      <div className={'grid grid-rows-[auto,1fr] bg-white w-[550px] h-[400px] p-4 rounded-2xl'}>
        <div className={'flex justify-between'}>
          <p className={'text-2xl'}>Swap</p>
          <Button aria-describedby={id} variant={'text'} onClick={handleClick}>
            <SettingsIcon style={{cursor: 'pointer', color: 'black'}}/>
          </Button>
          <Popover
            id={id}
            open={isOpenPopup}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={handleClose}
          >
            <div className={'p-4'}>
              <ButtonGroup variant="text" aria-label="Basic button group">
                {buttons}
              </ButtonGroup>
            </div>
          </Popover>
        </div>
        <div className={'grid gap-2 mt-5'}>
          <Input componentsProps={settingsProps} className={'w-full bg-gray-100 rounded-2xl pl-5'} disableUnderline={true} placeholder={'0'} value={tokenOneAmount} onChange={onChange}  />

          <Input componentsProps={settingsProps} className={'w-full bg-gray-100 rounded-2xl pl-5'} disableUnderline={true} placeholder={'0'} value={tokenTwoAmount} disabled={true} onChange={onChange}  />
        </div>
      </div>
    </div>
  )
}

export default Swap