import React, {useState} from 'react'
import {Button} from '@mui/material'
import rocketPng from '../assets/rocket.png'
import {Register, useAccount, useConnect, useDisconnect, useSwitchChain} from 'wagmi';

const Header = () => {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, status, variables } = useConnect();
  const { chains } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const [chainId, setChainId] = useState<
    Register["config"]["state"]["chainId"]
  >(chains[0].id);

  return (
    <div className={'p-8 text-3xl flex justify-between'}>
      <div className={'flex'}>
        <div className={'text-xl mr-10'}>
          <img src={rocketPng} alt=""/>
        </div>
        <div className={'flex gap-10'}>
          {
            ['Swap', 'Tokens'].map(tab =>
              <Button key={tab} className="hover:bg-gray-700/80 text-white hover:bg-blue-700" style={{
                color: 'white'
              }
              } variant="text">{tab}</Button>)
          }
        </div>
      </div>
      <div>
        <div>
          {isConnected ? null : (
            <div>
              choose chain :
              {chains.map((x) => (
                <button
                  disabled={x.id === chainId}
                  key={x.id}
                  onClick={() => setChainId(x.id)}
                >
                  {x.name}
                </button>
              ))}
              <br />
            </div>
          )}
          choose wallet :
          {connectors
            .filter((x) => x.id !== connector?.uid)
            .map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector, chainId })}
              >
                {connector.name}
                {variables?.connector === connector &&
                  status === "pending" &&
                  " (connecting)"}
              </button>
            ))}
          {isConnected && (
            <div>
              <br />
              <button onClick={() => disconnect()}>
                Disconnect from {connector?.uid}
              </button>
            </div>
          )}
        </div>

        {error && <div>{error.message}</div>}
      </div>
{/*      <div>
        <Button className="hover:bg-gray-700/80 !text-white" onClick={connect} >  {isConnected ? (address.slice(0,4) +"..." +address.slice(38)) : "Connect"}</Button>
      </div>*/}
    </div>
  )
}

export default Header