import React, { useRef, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Button, ButtonGroup, Input, MenuItem, Popover, Select, TextField } from '@mui/material'
import tokenList from '../tokenList.json'

const buttons = [
  <Button className={'!text-black'} key={0.5}>O.5%</Button>,
  <Button className={'!text-black'} key={2.5}>2.5%</Button>,
  <Button className={'!text-black'} key={5.0}>5.0%</Button>
]

const settingsProps = {
  input: {
    style: {
      fontSize: 46
    }
  }
}
const Swap = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [tokenOneAmount, setTokenOneAmount] = useState(0)
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0)
  const [tokenOne, setTokenOne] = useState(tokenList[0].ticker);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1].ticker);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpenPopup(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsOpenPopup(false)
  }

  const onChangeAmount = (e) => {
    setTokenOneAmount(e.target.value)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleChangeOneToken = (event) => {
    setTokenOne(event.target.value)
  }

  const handleChangeTwoToken = (event) => {
    setTokenTwo(event.target.value)
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
              <ButtonGroup  variant="text" aria-label="Basic button group">
                {buttons}
              </ButtonGroup>
            </div>
          </Popover>
        </div>
        <div className={'grid gap-2 mt-5'}>
          <div className={'relative'}>
            <Input componentsProps={settingsProps} className={'w-full h-full bg-gray-100 rounded-2xl pl-5'} disableUnderline={true}
                   placeholder={'0'} value={tokenOneAmount} onChange={onChangeAmount}/>
            <div className={'absolute top-1/2 right-5 -translate-y-1/2'}>
              <Select className={'!rounded-3xl bg-white !text-black'} defaultValue={tokenOne} value={tokenOne} onChange={handleChangeOneToken}>
                {tokenList.filter(token => token.ticker !== tokenTwo).map(token =>
                  <MenuItem key={token.ticker} value={token.ticker}>
                    <div className={'flex gap-2'}>
                      <img className={'h-6 w-6'} src={token.img} alt={token.ticker}/>
                      <div>{token.ticker}</div>
                    </div>
                  </MenuItem>)
                }
              </Select>
            </div>
          </div>

         <div className={'relative'}>
           <Input componentsProps={settingsProps} className={'w-full h-full bg-gray-100 rounded-2xl pl-5'} disableUnderline={true} placeholder={'0'}
                  value={tokenTwoAmount} disabled={true} onChange={onChangeAmount}/>
           <div className={'absolute top-1/2 right-5 -translate-y-1/2'}>
             <Select className={'!rounded-3xl bg-white !text-black'} value={tokenTwo} onChange={handleChangeTwoToken}>
               {tokenList.filter(token => token.ticker !== tokenOne).map(token =>
                 <MenuItem key={token.ticker} value={token.ticker}>
                   <div className={'flex gap-2'}>
                     <img className={'h-6 w-6'} src={token.img} alt={token.ticker}/>
                     <div>{token.ticker}</div>
                   </div>
                 </MenuItem>)
               }
             </Select>
           </div>
         </div>

        </div>
      </div>
    </div>
  )
}

export default Swap