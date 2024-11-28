import { Button, Input, MenuItem, Select } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from 'react'
import { UIDialog } from './UIDialog'
import tokenList from '../tokenList.json'

const settingsProps = {
  input: {
    style: { fontSize: 46 },
  },
};
export const TokenInput = ({ amount, onAmountChange, selectedToken,setSelectedToken,disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (selectedToken) => {
    setOpenModal(false);
    setSelectedToken(selectedToken);
  };

  return <>
    <UIDialog tokens={tokenList} onClose={handleCloseModal} open={openModal} selectedValue={selectedToken}/>
    <div className="relative">
      <Input
        componentsProps={settingsProps}
        className="w-full h-full bg-gray-100 rounded-2xl pl-5"
        disableUnderline
        placeholder="0"
        value={amount}
        onChange={onAmountChange}
        disabled={disabled}
      />
      <div className="absolute top-1/2 right-5 -translate-y-1/2">
        <Button className="flex !bg-white !text-black !rounded-2xl p-2 gap-2" onClick={onOpenModal}>
          <img className="h-6 w-6" src={selectedToken.img} alt={selectedToken.ticker} />
          <div>{selectedToken.ticker}</div>
          <KeyboardArrowDownIcon/>
        </Button>
      </div>
    </div>
  </>
}

