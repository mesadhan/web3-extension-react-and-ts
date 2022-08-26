import React, {ReactElement} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Volt from "./Volt";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white"
        },
      },
    },
  }
});

const Popup = (): ReactElement => {
  document.body.style.width = '357px';
  document.body.style.height = '600px';
  document.body.style.margin = '0';

  return (
      // <Container className="">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>

        <Volt />

      </ThemeProvider>
      // </Container>
  );
};

export default Popup;


/*
# MUI CSS REF/:
- https://mui.com/system/spacing/
- https://mui.com/system/properties/
 */