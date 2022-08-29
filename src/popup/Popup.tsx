import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import './styles.css';
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


const Popup: React.FC = () => {


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
