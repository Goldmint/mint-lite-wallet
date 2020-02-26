"use strict";const config={networkUrl:{main:"https://service.goldmint.io/mint/mainnet/v1",test:"https://service.goldmint.io/mint/testnet/v1"},api:{getBalance:"/wallet/"}};var isLoggedIn=!1,isFirefox="undefined"!=typeof InstallTrigger,brows=isFirefox?browser:chrome,script=document.createElement("script");function http(e,t,s=""){let n=new XMLHttpRequest,o="GET"===e.toUpperCase()?t+s:t;return n.open(e.toUpperCase(),o,!0),n.setRequestHeader("Content-Type","application/json"),"GET"===e.toUpperCase()?n.send():n.send(JSON.stringify(s)),new Promise((e,t)=>{n.onload=(()=>{if(n.status>=200&&n.status<300)try{e(JSON.parse(n.responseText))}catch(t){e(null)}else e(null)})})}function generateId(){return Math.random().toString(36).substr(2,9)}script.setAttribute("type","text/javascript"),script.setAttribute("src",brows.extension.getURL("inpage.js")),document.documentElement.insertBefore(script,document.head),brows.runtime.onMessage.addListener((e,t,s)=>{e.hasOwnProperty("loginStatus")&&isLoggedIn!==e.loginStatus&&(isLoggedIn=e.loginStatus),e.hasOwnProperty("login")&&(isLoggedIn=e.login)}),brows.runtime.sendMessage({checkLoginStatus:!0}),window.addEventListener("message",e=>{if(e&&e.data&&"question"===e.data.type&&e.data.resource in actions){let t=void 0;try{t=JSON.parse(e.data.data)}catch(e){}window.postMessage&&actions[e.data.resource](t).then(t=>{try{window.postMessage({type:"answer",id:e.data.id,isSuccess:!0,data:t},"*")}catch(e){}},t=>{try{window.postMessage({type:"answer",id:e.data.id,isSuccess:!1,data:t},"*")}catch(e){}})}});var actions={getAccount:e=>new Promise((e,t)=>{brows.runtime.onMessage.addListener(function t(s,n,o){brows.runtime.onMessage.removeListener(t),s.hasOwnProperty("loginStatus")&&(isLoggedIn=s.loginStatus,brows.storage.local.get(null,t=>{e(isLoggedIn?[t.wallets[t.currentWallet].publicKey]:[])}))}),brows.runtime.sendMessage({checkLoginStatus:!0})}),getCurrentNetwork:e=>new Promise((e,t)=>{brows.runtime.onMessage.addListener(function t(s,n,o){brows.runtime.onMessage.removeListener(t),s.hasOwnProperty("loginStatus")&&(isLoggedIn=s.loginStatus,brows.storage.local.get(null,t=>{e(isLoggedIn?t.currentNetwork||"main":null)}))}),brows.runtime.sendMessage({checkLoginStatus:!0})}),getBalance:e=>new Promise((t,s)=>{brows.runtime.onMessage.addListener(function s(n,o,r){brows.runtime.onMessage.removeListener(s),n.hasOwnProperty("loginStatus")&&(isLoggedIn=n.loginStatus,brows.storage.local.get(null,s=>{let n=config.networkUrl[s.currentNetwork||"main"];isLoggedIn?http("GET",n+config.api.getBalance,e.address).then(e=>{t(e?{gold:e.res.balance.gold,mint:e.res.balance.mint}:null)}):t(null)}))}),brows.runtime.sendMessage({checkLoginStatus:!0})}),sendTransaction:e=>new Promise((t,s)=>{brows.runtime.onMessage.addListener(function s(n,o,r){if(brows.runtime.onMessage.removeListener(s),n.hasOwnProperty("loginStatus")){if(!(isLoggedIn=n.loginStatus))return t(null);brows.storage.local.get(null,s=>{const n=generateId(),o=s.wallets[s.currentWallet].publicKey;let r={id:n,from:o,to:e.to,token:e.token,amount:e.amount,network:s.currentNetwork||"main"},i=[];s.unconfirmedTx&&(i=s.unconfirmedTx),i.push(r),brows.storage.local.set({unconfirmedTx:i},()=>{brows.runtime.sendMessage({sendTransaction:n})}),brows.runtime.onMessage.addListener(function e(s,o,r){brows.runtime.onMessage.removeListener(e),s.hasOwnProperty("sendTxResultContent")&&s.sendTxResultContent.id===n&&t(s.sendTxResultContent.hash)})})}}),brows.runtime.sendMessage({checkLoginStatus:!0})}),openSendTokenPage:e=>new Promise((t,s)=>{brows.runtime.onMessage.addListener(function s(n,o,r){if(brows.runtime.onMessage.removeListener(s),n.hasOwnProperty("loginStatus")){if(!(isLoggedIn=n.loginStatus))return t(null);const s={address:e.address,token:e.token,amount:e.amount};brows.storage.local.set({openSendTokenPage:s},()=>{brows.runtime.sendMessage({openSendTokenPage:e}),t(!0)})}}),brows.runtime.sendMessage({checkLoginStatus:!0})}),signMessage:e=>new Promise((t,s)=>{brows.runtime.onMessage.addListener(function s(n,o,r){if(brows.runtime.onMessage.removeListener(s),n.hasOwnProperty("loginStatus")){if(!(isLoggedIn=n.loginStatus))return t(null);if(!e.bytes||"object"!=typeof e.bytes)return t(null);brows.storage.local.get(null,s=>{const n=generateId(),o=e.publicKey||s.wallets[s.currentWallet].publicKey,r=window.location.host;let i,a=document.querySelectorAll("link");[].forEach.call(a,e=>{e.rel.indexOf("icon")>=0&&(i=e.href)});let g={id:n,bytes:e.bytes,publicKey:o,host:r,iconUrl:i||null},u=[];s.messagesForSign&&(u=s.messagesForSign),u.push(g),brows.storage.local.set({messagesForSign:u},()=>{brows.runtime.sendMessage({signMessage:n})}),brows.runtime.onMessage.addListener(function e(s,o,r){brows.runtime.onMessage.removeListener(e),s.hasOwnProperty("sendSignResultContent")&&s.sendSignResultContent.id===n&&t(s.sendSignResultContent.result)})})}}),brows.runtime.sendMessage({checkLoginStatus:!0})}),verifySignature:e=>new Promise((t,s)=>{t(e.result)}),getGoWasmJsPath:e=>new Promise((e,t)=>{e(brows.extension.getURL("assets/libs/mint/gowasm.js"))}),getMintWasmPath:e=>new Promise((e,t)=>{e(brows.extension.getURL("assets/libs/mint/mint.wasm"))})};
