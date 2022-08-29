import {browser, Tabs} from "webextension-polyfill-ts";


export const openWebPage = (url: string): Promise<Tabs.Tab> => {
    return browser.tabs.create({url});
}


export const onSendMessage = async (action:string) => {
    console.log('msg', 'onClickBackground');
    const res = await browser.runtime.sendMessage({ action: action });
    return res;
}



