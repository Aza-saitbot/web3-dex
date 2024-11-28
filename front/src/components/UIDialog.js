import PropTypes from 'prop-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import '../index.css'

export function UIDialog(props) {
  const { tokens,onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <div className="windows-scroll">
      <Dialog  sx={{
        '& .MuiPaper-root': {
          borderRadius: 5,
          width: 400,
        },
      }} onClose={handleClose} open={open}>
        <DialogTitle>Выбери токен</DialogTitle>
        <List  sx={{ pt: 0 }}>
          {tokens.map(({ ticker, img, name }) => (
            <ListItem disablePadding key={ticker} value={ticker}>
              <ListItemButton onClick={() => handleListItemClick(ticker)}>
                <div className="flex items-center gap-2">
                  <img className="h-8 w-8" src={img} alt={ticker} />
                  <div className={'grid'}>
                    <div className={'font-semibold text-lg'}>{ticker}</div>
                    <div>{name}</div>
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

UIDialog.propTypes = {
  tokens: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};