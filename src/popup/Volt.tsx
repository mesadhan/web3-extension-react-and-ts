import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, alertClasses, Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import logo from '../logo.png'
import storage from "../utils/storage";

import {
  onSendMessage,
  openWebPage,
} from "../utils";
import createMetaMaskProvider from "metamask-extension-provider";
import {EthereumEvents} from "../utils/events";


interface FormDataI {
  account: string;
}

interface onSendMessageI {
  status: string;
  data: string;
}
interface walletInfo {
  account: string;
  chainId: string;
}

const Volt: React.FC = () => {

  document.body.style.width = '357px';
  document.body.style.height = '600px';
  document.body.style.margin = '0';


  /* --------------------- Web3 implementation started ---------------------*/
  const [isAuthenticated, setAuthenticated]:any = useState(false);
  const [voltInfo, setVoltInfo]:any = useState<walletInfo>();


  useEffect(() => {

    const fetchData = async () => {
      await connectEagerly();
    }

   fetchData().catch(console.error);

    return () => {
      const provider = getProvider();
      unsubscribeToEvents(provider);
    }
  }, []);


  const connectEagerly = async () => {
    const metamask = await storage.get('metamask-connected');

    if (metamask?.connected) {
      setAuthenticated(true)
      const info = await storage.get('metamask-data');
      console.log('volt-information', info);
      setVoltInfo(info);

    }else{
      await connectWallet();
    }
  }

  const connectWallet = async () => {
    console.log("connectWallet runs....")
    try {
      const provider:any = getProvider();
      const [accounts, chainId]:any = await getAccounts(provider);
      if (accounts && chainId) {
        const account = getNormalizeAddress(accounts);
        // const web3:any = new Web3(provider);
        // setAccount(account);
        // setChainId(chainId);
        // setWeb3(web3);
        setAuthenticated(true);
        storage.set('metamask-connected', { connected: true });
        storage.set('metamask-data', {account, chainId});

        setVoltInfo({account, chainId})
        subscribeToEvents(provider)
      }
    } catch (e) {
      setAuthenticated(false);
      console.log("MetaMask - RPC Error: Already processing");
      // alert('error while connecting wallet')
      storage.set('metamask-connected', { connected: false });
      storage.set('metamask-data', {});
    } finally {
      console.log("connected ...");
    }
  }

  const getProvider = () => {
    return createMetaMaskProvider();
  }

  const getAccounts = async (provider:any) => {
    if (provider) {
      const [accounts, chainId] = await Promise.all([
        provider.request({
          method: 'eth_requestAccounts',
        }),
        provider.request({ method: 'eth_chainId' }),
      ]);
      return [accounts, chainId];
    }
    return false;
  }

  const getNormalizeAddress = (accounts:any) => {
    return accounts[0] ? accounts[0].toLowerCase() : null
  }

  const subscribeToEvents = (provider:any) => {
    if (provider && provider.on) {
      provider.on(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
      provider.on(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
      provider.on(EthereumEvents.CONNECT, handleConnect);
      provider.on(EthereumEvents.DISCONNECT, handleDisconnect);
    }
  }

  const unsubscribeToEvents = (provider:any) => {
    if (provider && provider.removeListener) {
      provider.removeListener(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
      provider.removeListener(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
      provider.removeListener(EthereumEvents.CONNECT, handleConnect);
      provider.removeListener(EthereumEvents.DISCONNECT, handleDisconnect);
    }
  }

  const handleAccountsChanged = (accounts:any) => {
    const account = getNormalizeAddress(accounts);
    storage.set('metamask-connected', { connected: true });
    storage.set('metamask-data', {account, chainId:''});
    console.log("[account changes]: ", account)
    setVoltInfo({account, chainId:''});
  }
  const handleChainChanged = (chainId:any) => {
    console.log("[chainId changes]: ", chainId)
    storage.set('metamask-data', {account:'', chainId:chainId});
    setVoltInfo({account:'', chainId:chainId});
  }
  const handleConnect = () => {
    setAuthenticated(true);
    console.log("[connected]")
  }
  const handleDisconnect = () => {
    setAuthenticated(false);
    setVoltInfo({account:'', chainId:''});

    console.log("[disconnected]")
    storage.set('metamask-connected', { connected: false });
    storage.set('metamask-data', {} );
  }

  /* --------------------- Web3 implementation done ---------------------*/

  const [formData, setFormData] = useState<FormDataI>({account: ''})


  const onCallBackground = async () => {
    const res:onSendMessageI = await onSendMessage('onTestCall');
    console.log('result', res);
    alert(res?.data)
  }


  useLayoutEffect(() => {
    console.log('msg', 'useLayoutEffect');
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
      <Card sx={{p: 2}}>
        <Grid
            spacing={2}
            container
            direction="column"
            justifyContent="center"
            style={{minHeight: '100vh'}}>

          <Grid item md={12} justifyContent="center" sx={{textAlign: 'center'}}>


            <Box>
              <img src={logo} alt={"logo"}/>
            </Box>

            <Typography component="div" sx={{mt: 2, fontSize: 12}}>
              <Box sx={{textTransform: 'uppercase'}}>Welcome!</Box>
              <Box sx={{
                textTransform: 'uppercase',
                mb: 2,
                mt: 2,
              }}>
                To decentralized web3
              </Box>
            </Typography>

          </Grid>


          <Grid item md={12}>
            {/*<TextField name={'account'} onChange={onInputChange}
                       defaultValue={formData?.account}
                       fullWidth={true} size='small'
                       label="WALLET ACCOUNT NO"></TextField>*/}
          </Grid>

          <Grid item md={12}>

            <Alert severity={isAuthenticated ? "success": 'error'}>
              Status: {isAuthenticated ? "success": 'error'}
            </Alert>

            <br/>

            <Button
                variant="contained" fullWidth={true} size='medium'
                color={isAuthenticated ? 'error': "success"}
                onClick={isAuthenticated ? handleDisconnect : connectWallet}>
              {isAuthenticated ? "Disconnect" : "Connected"}
            </Button>

            {/*<Button onClick={loadBCData} fullWidth={true} size='medium' color='info'
                    variant="contained">
              Grab Volt Information</Button>*/}
          </Grid>


          <Grid item md={12} justifyContent={'space-between'} display={'flex'}>
            <button type="button" onClick={() => {return openWebPage('options.html');}}>Details Page</button>
            <button type="button" onClick={onCallBackground}>Call Background</button>
          </Grid>


          <Grid item md={12}>
            Account <pre style={{textAlign: 'center', fontSize: '12px'}}> {voltInfo?.account} </pre>
            Signature <pre style={{textAlign: 'center', fontSize: '12px'}}> {voltInfo?.chainId} </pre>
          </Grid>


        </Grid>


      </Card>
  );
};

export default Volt;