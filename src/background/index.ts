// import {browser} from "webextension-polyfill-ts";


chrome.runtime.onMessage.addListener((request:any, sender:any, sendResponse:any) => {
  if (request.action === 'onTestCall') {
    sendResponse({status: 'ok', data: 'Hello, from Background Service Worker'})
  }
});

export {}