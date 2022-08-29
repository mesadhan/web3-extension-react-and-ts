import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import logo from '../logo.png'
import createMetaMaskProvider from "metamask-extension-provider";
import {browser, Tabs} from 'webextension-polyfill-ts';

const openWebPage = (url: string): Promise<Tabs.Tab> => {
  return browser.tabs.create({url});
}

interface FormDataI {
  account: string;
}

const getProvider = () => {
  // if (window.ethereum) {
  //   console.log('found window.ethereum>>');
  //   return window.ethereum;
  // } else {
  return createMetaMaskProvider();
  // }
}


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


const Volt: React.FC = () => {
  document.body.style.width = '357px';
  document.body.style.height = '600px';
  document.body.style.margin = '0';


  const [formData, setFormData] = useState<FormDataI>({account: ''})
  const [accountInfo, setAccountInfo] = useState<FormDataI>({account: ''})


  const onCallBackground = async () => {
    console.log('msg', 'onClickBackground');

    const res = await browser.runtime.sendMessage({ action: "onTestCall" });
    console.log('result', res);
  }


  useLayoutEffect(() => {
    console.log('msg', 'useLayoutEffect');
  })

  useEffect(() => {

    /*const fetchData = async () => {
      await loadBCData();
    }

    fetchData().catch(console.error);*/

  }, [])

  const loadBCData = async (event: any) => {
    const provider = getProvider();
    let accounts: any = await getAccounts(provider)

    setFormData({ account: accounts[0] })
    setAccountInfo({account: accounts[0]})
  }


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
            // direction="column"
            // justifyContent="center"
            // alignItems="stretch|center"
            // sx={{ m: "2rem" }}
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
            <Button onClick={loadBCData} fullWidth={true} size='medium' color='info'
                    variant="contained">
              Grab Volt Information</Button>
          </Grid>


          <Grid item md={12}>
            {/*<Button onClick={loadBCData} fullWidth={true} size='medium' color='info'*/}
            {/*        variant="contained">*/}
            {/*  Grab Volt Information</Button>*/}

            <button type="button" onClick={() => {return openWebPage('options.html');}}>Options Page</button>
            <button type="button" onClick={onCallBackground}>Call Background</button>
          </Grid>


          <Grid item md={12}>
            <p style={{textAlign: 'center', fontSize: '12px'}}>{accountInfo?.account}</p>
          </Grid>


        </Grid>


      </Card>
  );
};

export default Volt;