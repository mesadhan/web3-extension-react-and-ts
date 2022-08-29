import {browser, Tabs} from "webextension-polyfill-ts";
import Web3 from "web3";
import storage from "./storage";
import createMetaMaskProvider from "metamask-extension-provider";
import {EthereumEvents} from "./events";

export const getNormalizeAddress = (accounts:any) => {
    return accounts[0] ? accounts[0].toLowerCase() : null
}


export const openWebPage = (url: string): Promise<Tabs.Tab> => {
    return browser.tabs.create({url});
}

export const onSendMessage = async (action:string) => {
    console.log('msg', 'onClickBackground');
    const res = await browser.runtime.sendMessage({ action: action });
    return res;
}

export const getAccounts = async (provider:any) => {
    if (provider) {
        const [accounts, chainId] = await Promise.all([
            provider.request({
                method: 'eth_requestAccounts',
            }),
            provider.request({ method: 'eth_chainId' }),
        ]);
        return [accounts, chainId];
    }
    return false;
}

export const getProvider = () => {
    return createMetaMaskProvider();
}


const subscribeToEvents = (provider:any) => {
    if (provider && provider.on) {
        provider.on(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
        provider.on(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
        provider.on(EthereumEvents.CONNECT, handleConnect);
        provider.on(EthereumEvents.DISCONNECT, handleDisconnect);
    }
}

export const unsubscribeToEvents = (provider:any) => {
    if (provider && provider.removeListener) {
        provider.removeListener(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
        provider.removeListener(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
        provider.removeListener(EthereumEvents.CONNECT, handleConnect);
        provider.removeListener(EthereumEvents.DISCONNECT, handleDisconnect);
    }
}


export const connectWallet = async () => {
    console.log("connectWallet runs....")
    try {
        const provider:any = getProvider();
        const [accounts, chainId]:any = await getAccounts(provider);
        if (accounts && chainId) {
            // setAppLoading(true);
            const account = getNormalizeAddress(accounts);
            const web3:any = new Web3(provider);
            // setAccount(account);
            // setChainId(chainId);
            // setWeb3(web3);
            // setAuthenticated(true);
            storage.set('metamask-connected', { connected: true });
            storage.set('metamask-data', {account, chainId});
            subscribeToEvents(provider)
        }
    } catch (e) {
        console.log("error while connect", e);
        return storage.get('metamask-data');
    } finally {
        // setAppLoading(false);
        console.log("connected ...");
        return storage.get('metamask-data');
    }
}

export const disconnectWallet = () => {
    console.log("disconnectWallet runs")
    try {
        storage.set('metamask-connected', { connected: false });
        storage.set('metamask-data', { data: JSON.stringify({}) } );
        // setAccount(null);
        // setChainId(null);
        // setAuthenticated(false);
        // setWeb3(null);
    } catch (e) {
        console.log(e);
    }
}

const handleAccountsChanged = (accounts:any) => {
    // setAccount(getNormalizeAddress(accounts));
    console.log("[account changes]: ", getNormalizeAddress(accounts))
}

const handleChainChanged = (chainId:any) => {
    // setChainId(chainId);
    console.log("[chainId changes]: ", chainId)
}

const handleConnect = () => {
    // setAuthenticated(true);
    console.log("[connected]")
}

const handleDisconnect = () => {
    console.log("[disconnected]")
    disconnectWallet();
}
