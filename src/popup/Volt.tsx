import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Box, Button, Card, Grid, Typography} from "@mui/material";
import logo from '../logo.png'

import {onSendMessage, openWebPage,} from "../utils";
import createMetaMaskProvider from "metamask-extension-provider";
import {EthereumEvents} from "../utils/events";
import Web3 from "web3";
import {MetaMaskInpageProvider} from "@metamask/inpage-provider";

const HOST_BASE_URL = 'http://localhost:7001'

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

const metaMaskProvider: MetaMaskInpageProvider = createMetaMaskProvider();


const Volt: React.FC = () => {

  document.body.style.width = '357px';
  document.body.style.height = '600px';
  document.body.style.margin = '0';


  /* --------------------- Web3 implementation started ---------------------*/
  // const [isAuthenticated, setAuthenticated]: any = useState(false);
  const [provider, setProvider]: any = useState(null);

  const getAccounts = async (provider: any) => {
    if (provider) {
      const [accounts, chainId] = await Promise.all([
        provider.request({
          method: 'eth_requestAccounts',
        }),
        provider.request({method: 'eth_chainId'}),
      ]);
      return [accounts, chainId];
    }
    return false;
  }

  const onGenSignature = async () => {

    if(!await provider?.selectedAddress){
      alert('Please unlock your metamask wallet')
    }

    // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-personal.html#id17
    const web3: any = new Web3(provider);
    let message = "Some string"
    let hash = web3.utils.sha3(message)
    let account = await provider.selectedAddress;
    let signature = await web3.eth.personal.sign(hash, account, "hash")
    console.log('signature', signature);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({account, signature})
    };

    const request = await fetch(`${HOST_BASE_URL}/api/v1/verification/signature`, requestOptions)
    const res = await request.json()
    //alert(`API Response: ${JSON.stringify(res)}`)
    setVerifyResult(JSON.stringify(res))
  }

  useEffect(() => {


    console.log('isUnlocked_metamask', provider?._metamask.isUnlocked() )

    if (!metaMaskProvider?.isMetaMask) {
      alert("Please Install metamask extension")
    }
    metaMaskProvider.on(EthereumEvents.CONNECT, (chainId) => {
      console.log('provider', metaMaskProvider);
      setProvider(metaMaskProvider)
    });


    metaMaskProvider.on(EthereumEvents.ACCOUNTS_CHANGED, (accounts) => {
      console.log('msg', 'accounts change', accounts);
    });


    const fetchData = async () => {
    }

    fetchData().catch(console.error);
  }, []);

  /* --------------------- Web3 implementation done ---------------------*/

  const [formData, setFormData] = useState<FormDataI>({account: ''})
  const [verifyResult, setVerifyResult] = useState('')


  const onCallBackground = async () => {
    const res: onSendMessageI = await onSendMessage('onTestCall');
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
                {/*To decentralized web3*/}
                Status: {metaMaskProvider?.isMetaMask ? "MetaMask is Installed" : 'Please Install MetaMask Extension'}
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


            <Alert severity={metaMaskProvider?.selectedAddress ? "success" : 'error'}>
              {metaMaskProvider?.selectedAddress ? "Metamask Wallet Account Selected" : 'Please Select Metamask Wallet Account'}
            </Alert>

            <br/>

            {/*<Button
                variant="contained" fullWidth={true} size='medium'
                color={isAuthenticated ? 'error': "success"}
                onClick={isAuthenticated ? handleDisconnect : connectWallet}>
              {isAuthenticated ? "Disconnect" : "Connected"}
            </Button>*/}

            <Button onClick={onGenSignature} fullWidth={true} size='medium' color='info'
                    variant="contained">
              Grab Volt Information</Button>
          </Grid>


          <Grid item md={12} justifyContent={'space-between'} display={'flex'}>
            <button type="button" onClick={() => {
              return openWebPage('options.html');
            }}>Details Page
            </button>
            <button type="button" onClick={onCallBackground}>Call Background</button>
          </Grid>


          <Grid item md={12}>
            Account <pre style={{textAlign: 'center', fontSize: '12px'}}> {provider?.selectedAddress} </pre>
            Verify Result <pre style={{textAlign: 'center', fontSize: '12px'}}> {verifyResult} </pre>
          </Grid>


        </Grid>


      </Card>
  );
};

export default Volt;