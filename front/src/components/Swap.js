import React, { useRef, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Button, ButtonGroup, Popover } from '@mui/material'

const buttons = [
  <Button key={0.5}>O.5%</Button>,
  <Button key={2.5}>2.5%</Button>,
  <Button key={5.0}>5.0%</Button>
]
const Swap = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpenPopup(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsOpenPopup(false)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className={'flex justify-center pt-30'}>
      <div className={'bg-white w-1/2 p-4 rounded-2xl'}>
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
        <div>

          Content
        </div>
      </div>
    </div>
  )
}

export default Swap