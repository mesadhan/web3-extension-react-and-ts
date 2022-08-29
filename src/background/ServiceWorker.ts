// chrome.action.onClicked.addListener(tab => { … });
// let active = false;
//
// function makeOrange(color: string): void {
//   document.body.style.backgroundColor = color;
// }
//
// chrome.action.onClicked.addListener((tab) => {
//   active = !active;
//   const color = active ? 'orange' : 'white';
//   chrome.scripting.executeScript({
//     target: {tabId: tab.id ? tab.id : -1},
//     func: makeOrange,
//     args: [color]
//   }).then();
// });

//
// chrome.extension.connect()
// chrome.extension.onConnect
// chrome.extension.onMessage
// chrome.extension.sendMessage()

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
   if (msg.action === 'somethingComplex') {
       console.log('msg', 'api response done');
   }
  sendResponse({status:'ok', data:'Hello, from Service Worker'})
});

export {}
