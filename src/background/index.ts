import {browser} from 'webextension-polyfill-ts';
// import 'emoji-log';


browser.runtime.onUpdateAvailable.addListener( async () => {
  browser.runtime.reload()
})

browser.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name); // refresh
  // helloWorld();
  console.log("Hello, world!");
});


// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  //   console.emoji('🦄', 'extension installed');

  if (details.reason === 'install') {
    console.log('onInstalled', 'show the welcome page');

    browser.alarms.create('refresh', {periodInMinutes: 3});

    //show the welcome page
    // const url = browser.runtime.getURL(isDev ? 'src/welcome/welcome.html' : 'welcome.html'); // TODO: better approach
    // await browser.tabs.create({ url });
  }
});


// browser.runtime.onMessage.addListener( (request:any, sender:any, sendResponse:any) =>  {
//   console.log('msg', request);
//   sendResponse({status: 'ok', data: 'hello from background js'});
// });
