import PropTypes from 'prop-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import '../index.css'

export function SelectedTokenDialog(props) {
  const { tokens, open,setSelectedToken,handleCloseModal } = props;

  return (
    <div className="windows-scroll">
      <Dialog  sx={{
        '& .MuiPaper-root': {
          borderRadius: 5,
          width: 400,
        },
      }} onClose={handleCloseModal} open={open}>
        <DialogTitle>Выбери токен</DialogTitle>
        <List  sx={{ pt: 0 }}>
          {tokens.map((token) => (
            <ListItem disablePadding key={token.ticker} value={token.ticker}>
              <ListItemButton onClick={() => setSelectedToken(token)}>
                <div className="flex items-center gap-2">
                  <img className="h-8 w-8" src={token.img} alt={token.ticker} />
                  <div className={'grid'}>
                    <div className={'font-semibold text-lg'}>{token.ticker}</div>
                    <div>{token.name}</div>
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

SelectedTokenDialog.propTypes = {
  tokens: PropTypes.array.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setSelectedToken: PropTypes.func.isRequired,
};