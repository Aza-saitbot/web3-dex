import { Button, Input } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {ChangeEvent, FC} from 'react'
import {ITokenItem} from '../models';

const settingsProps = {
  input: {
    style: { fontSize: 46 },
  },
};

interface ITokenInputProps {
  amount: number
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  selectedToken: ITokenItem
  onOpenModal: () => void
  disabled?: boolean
}
export const TokenInput:FC<ITokenInputProps> = ({ amount, onAmountChange, selectedToken,onOpenModal,disabled=false }) => {
  return <div className="relative">
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

}

