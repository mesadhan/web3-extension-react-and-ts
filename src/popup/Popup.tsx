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


  /*return (
      <section id="popup">
        <h2>WEB-EXTENSION-STARTER</h2>

        <button onClick={showMetaMaskInfo}> MetaMask</button>


        <button
            id="options__button"
            type="button"
            onClick={(): Promise<Tabs.Tab> => {
              return openWebPage('options.html');
            }}
        >
          Options Page
        </button>
        <div className="links__holder">
          <ul>
            <li>
              <button
                  type="button"
                  onClick={(): Promise<Tabs.Tab> => {
                    return openWebPage(
                        'https://github.com/abhijithvijayan/web-extension-starter'
                    );
                  }}
              >
                GitHub
              </button>
            </li>
            <li>
              <button
                  type="button"
                  onClick={(): Promise<Tabs.Tab> => {
                    return openWebPage(
                        'https://www.buymeacoffee.com/abhijithvijayan'
                    );
                  }}
              >
                Buy Me A Coffee
              </button>
            </li>
          </ul>
        </div>
      </section>
  );*/
};

export default Popup;
