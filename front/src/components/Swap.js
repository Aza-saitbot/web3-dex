import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Button, ButtonGroup, Popover } from '@mui/material'
import tokenList from '../tokenList.json'
import { TokenInput } from './TokenInput'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { SelectedTokenDialog } from './SelectedTokenDialog'
import axios from 'axios';


const buttons = [0.5, 2.5, 5.0].map((value) => (
  <Button className="!text-black" key={value}>
    {value}%
  </Button>
))
const Swap = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [tokenOneAmount, setTokenOneAmount] = useState(0)
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0)
  const [tokenOne, setTokenOne] = useState(tokenList[0])
  const [tokenTwo, setTokenTwo] = useState(tokenList[1])
  const [isRotating, setIsRotating] = useState(false)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modeSelectedToken, setModeSelectedToken] = useState(1)
  const [prices,setPrices]=useState(null)

  const onOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpenPopup(true)
  }


  const onChangeAmountOne=(e)=> {
    setTokenOneAmount(e.target.value);
    if(e.target.value && prices){
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
    }else{
      setTokenTwoAmount(null);
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
    setIsOpenPopup(false)
  }

  const onSwitchTokens = () => {
    setIsRotating(prevState => !prevState)
    setTokenOne(tokenTwo)
    setTokenTwo(tokenOne)
    setTokenOneAmount(tokenTwoAmount)
    setTokenTwoAmount(tokenOneAmount)
  }

  const onSelectedToken = (selectedToken) => {
    setPrices(null)
    setTokenOneAmount(null)
    setTokenTwoAmount(null)
    if (modeSelectedToken === 1) {
      setTokenOne(selectedToken)
      fetchPrices(selectedToken.address, tokenTwo.address)
    } else {
      setTokenTwo(selectedToken)
      fetchPrices(selectedToken.address, tokenTwo.address)
    }
    setIsOpenModal(false)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const fetchPrices = async (one, two) => {
    const res = await axios.get(`http://localhost:5000/token-price`, {
      params: {addressOne: one, addressTwo: two}
    })
    setPrices(res.data)
  }

  const onSwap = () => {

  }

  useEffect(()=>{
    fetchPrices(tokenList[0].address, tokenList[1].address)
  }, [])

  return (
    <>
      <SelectedTokenDialog tokens={tokenList} open={isOpenModal} handleCloseModal={() => setIsOpenModal(false)}
                           setSelectedToken={onSelectedToken}/>
      <div className="flex justify-center pt-16">
        <div className="grid gap-2 grid-rows-[auto,1fr] bg-white w-[550px] h-[400px] p-4 rounded-2xl">
          <div className="flex justify-between">
            <p className="text-2xl">Swap</p>
            <Button aria-describedby={id} variant="text" onClick={handleClick}>
              <SettingsIcon style={{cursor: 'pointer', color: 'black'}}/>
            </Button>
            <Popover
              id={id}
              open={isOpenPopup}
              anchorEl={anchorEl}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              onClose={handleClose}
            >
              <div className="p-4">
                <ButtonGroup variant="text" aria-label="Basic button group">
                  {buttons}
                </ButtonGroup>
              </div>
            </Popover>
          </div>
          <div className="grid relative gap-2 mt-5">
            <TokenInput
              amount={tokenOneAmount}
              onAmountChange={onChangeAmountOne}
              onOpenModal={() => {
                setModeSelectedToken(1)
                onOpenModal()
              }}
              selectedToken={tokenOne}
            />
            <div className={'absolute right-[230px] z-10 top-1/2 -translate-y-1/2'}>
              <Button
                className={`!transition-transform !duration-300 !text-black border-px !border-white-500 !rounded-full h-fit !bg-gray-300 ${isRotating ? '!rotate-180' : ''}`}
                onClick={onSwitchTokens}
                variant="text"
                style={{border: '8px solid white'}}
              >
                <SwapVertIcon/>
              </Button>
            </div>
            <TokenInput
              amount={tokenTwoAmount}
              onAmountChange={(e) => setTokenTwoAmount(e.target.value)}
              onOpenModal={() => {
                setModeSelectedToken(2)
                onOpenModal()
              }}
              disabled={true}
              selectedToken={tokenTwo}
            />
          </div>
          <Button className={'!py-4 !bg-gradient-to-r from-cyan-400 to-blue-400 !text-white'} disabled={!tokenOneAmount || !tokenTwoAmount}
                  variant="outlined" onClick={onSwap}>
            Swap
          </Button>
        </div>
      </div>
    </>

  )
}

export default Swap
