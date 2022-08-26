import browser from 'webextension-polyfill';
import store from '../app/store';
import { isDev } from '../shared/utils';




// import Web3 from "web3";
// let loadWeb3Test = async () => {
//   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
//   const network = await web3.eth.net.getNetworkType();
//   console.log('network', network);
// }



store.subscribe(() => {
  console.log('state', store.getState());
});

// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('onInstalled', 'show the welcome page');







    //show the welcome page
    // const url = browser.runtime.getURL(isDev ? 'src/welcome/welcome.html' : 'welcome.html'); // TODO: better approach
    // await browser.tabs.create({ url });
  }
});



chrome.runtime.onUpdateAvailable.addListener( async () => {
  //await loadWeb3Test();
  chrome.runtime.reload()
})



export {};
