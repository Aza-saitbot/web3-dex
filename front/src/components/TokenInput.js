import { Input, MenuItem, Select } from '@mui/material'
import React from 'react'

const settingsProps = {
  input: {
    style: { fontSize: 46 },
  },
};
export const TokenInput = ({ amount, onAmountChange, token, onTokenChange, disabled, tokens }) => (
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
      <Select
        className="!rounded-3xl bg-white !text-black"
        value={token}
        onChange={onTokenChange}
      >
        {tokens.map(({ ticker, img }) => (
          <MenuItem key={ticker} value={ticker}>
            <div className="flex gap-2">
              <img className="h-6 w-6" src={img} alt={ticker} />
              <div>{ticker}</div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  </div>
);
