import React, {useEffect, useLayoutEffect, useState} from 'react';
import {alertClasses, Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import logo from '../logo.png'
import storage from "../utils/storage";

import {
  connectWallet, disconnectWallet,
  getProvider,
  onSendMessage,
  openWebPage, unsubscribeToEvents
} from "../utils";


interface FormDataI {
  account: string;
}

interface onSendMessageI {
  status: string;
  data: string;
}

const Volt: React.FC = () => {
  document.body.style.width = '357px';
  document.body.style.height = '600px';
  document.body.style.margin = '0';


  const [isAuthenticated, setAuthenticated]:any = useState(false);
  const [voltInfo, setVoltInfo]:any = useState(false);
  // const [appLoading, setAppLoading]:any = useState(false);



  useEffect(() => {

    const fetchData = async () => {
      const info = await connectEagerly();
      console.log('msg', 'connectEagerly...')
      console.log('volt-information', info);
      setVoltInfo(info);
      // setVoltInfo(JSON.stringify(info) );
    }

   fetchData().catch(console.error);

    return () => {
      const provider = getProvider();
      unsubscribeToEvents(provider);
    }
  }, [isAuthenticated]);


  const connectEagerly = async () => {
    const metamask = await storage.get('metamask-connected');

    if (metamask?.connected) {
      setAuthenticated(true)
      await connectWallet();
    }

    return await storage.get('metamask-data');
  }


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

            <Button
                variant="contained" fullWidth={true} size='medium'
                color={isAuthenticated ? "error" : "success"}
                onClick={isAuthenticated ? disconnectWallet : connectWallet}>
              {isAuthenticated ? "Disconnect Wallet" : "Connect Wallet"}
            </Button>

            {/*<Button onClick={loadBCData} fullWidth={true} size='medium' color='info'
                    variant="contained">
              Grab Volt Information</Button>*/}
          </Grid>


          <Grid item md={12} justifyContent={'space-between'} display={'flex'}>
            <button type="button" onClick={() => {return openWebPage('options.html');}}>Options Page</button>
            <button type="button" onClick={onCallBackground}>Call Background</button>
          </Grid>


          <Grid item md={12}>
            Account: <pre style={{textAlign: 'center', fontSize: '12px'}}> {voltInfo?.account} </pre>
            <pre style={{textAlign: 'center', fontSize: '12px'}}>Signature: {voltInfo?.chainId} </pre>
          </Grid>


        </Grid>


      </Card>
  );
};

export default Volt;