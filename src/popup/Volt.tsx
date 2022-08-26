import React, {ReactElement, useEffect, useLayoutEffect, useState} from 'react';
import {Box, Button, Card, Grid, Stack, TextField, Typography} from "@mui/material";
import logo from '../logo.png'
// import Web3 from "web3";
// import Web3 from 'web3/dist/web3.min.js';

interface FormDataI {
  account: string;
}


const Volt = (): ReactElement => {
  document.body.style.width = '357px';
  document.body.style.height = '600px';
  document.body.style.margin = '0';

  const [formData, setFormData] = useState<FormDataI>({account: ''})
  const [accountInfo, setAccountInfo] = useState<FormDataI>({account: ''})


  useLayoutEffect(() => {
    console.log('msg', 'useLayoutEffect');
  })

  useEffect(() => {

    /*const fetchData = async () => {
      await loadBCData();
    }

    fetchData().catch(console.error);*/

  }, [])

  const loadBCData = async () => {

    console.log('msg', formData);
    setAccountInfo({
      account: formData.account
    })


    // const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    // const network = await web3.eth.net.getNetworkType();
    // console.log('network', network);
    // const accounts = await web3.eth.getAccounts()
    // setAccountInfo({ account: accounts[0] })
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
            <TextField name={'account'} onChange={onInputChange} fullWidth={true} size='small'
                       label="WALLET ACCOUNT NO"></TextField>
          </Grid>

          <Grid item md={12}>
            <Button onClick={loadBCData} fullWidth={true} size='medium' color='info'
                    variant="contained">
              Grab Volt Information</Button>
          </Grid>


          <Grid item md={12}>
            <p style={{textAlign: 'center'}}>{accountInfo?.account}</p>
          </Grid>


        </Grid>


      </Card>
  );
};

export default Volt;