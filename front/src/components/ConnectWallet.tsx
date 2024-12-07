import React, {useEffect, useState} from 'react';
import {Register, useAccount, useConnect, useDisconnect, useSwitchChain} from 'wagmi';
import {Alert, Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const ConnectWallet = () => {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, status, variables } = useConnect();
  const { chains } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const [chainId, setChainId] = useState<
    Register["config"]["state"]["chainId"]
  >(chains[0].id);
  const [isOpen,setIsOpen]=useState(false)

  useEffect(()=>{
    if (isConnected) setIsOpen(false)
  },[isConnected])

  return (
    <div>
      {error && <Alert className={'fixed z-50 top-10 right-10 '} severity="error">{error.message}</Alert>}
      <Dialog sx={{
        '& .MuiPaper-root': {
          borderRadius: 5,
          width: 400,
          padding: '10px',
        },
      }} onClose={()=>setIsOpen(false)} open={isOpen}>
        <DialogTitle>Connect wallet</DialogTitle>
        <div>
          {isConnected ? null : (
            <div>
              choose chain :
              {chains.map((x) => (
                <Button
                  disabled={x.id === chainId}
                  key={x.id}
                  onClick={() => setChainId(x.id)}
                >
                  {x.name}
                </Button>
              ))}
            </div>
          )}
          choose wallet :
          {connectors
            .filter((x) => x.id !== connector?.uid)
            .map((connector) => (
              <Button
                key={connector.id}
                onClick={() => connect({ connector, chainId })}
              >
                {connector.name}
                {variables?.connector === connector &&
                  status === "pending" &&
                  " (connecting)"}
              </Button>
            ))}
        </div>
      </Dialog>
      {isConnected
        ? <Button className="hover:bg-gray-700/80 !text-white" onClick={() => disconnect()}>Disconnect from  {connector?.uid ? (connector?.uid.slice(0,4) +"..." +connector?.uid.slice(38)) : ""}</Button>
        : <Button className="hover:bg-gray-700/80 !text-white" onClick={() => setIsOpen(true)}>Connect wallet</Button>
      }
      </div>
  );
};

export default ConnectWallet;