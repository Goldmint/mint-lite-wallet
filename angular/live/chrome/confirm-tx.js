"use strict";!function(){const n={networkUrl:{main:"https://service.goldmint.io/mint/mainnet/v1",test:"https://service.goldmint.io/mint/testnet/v1"},api:{getBalance:"/wallet/",addTx:"/tx",blockChainStatus:"/status"},timeTxFailed:18e5};let e="\n        body, html {\n            margin: 0;\n            padding: 0;\n            min-width: 300px;\n            width: 100%;\n            height: 520px;\n            overflow: hidden;\n            font-size: 16px;\n            font-family: Avenir,Helvetica,Arial,sans-serif;\n            line-height: 1.5;\n        }\n        header {\n            background: #212121;\n            color: #ccc;\n            height: 57px;\n            padding: 0 1rem;\n            display: flex;\n            align-items: center;\n        }\n        header svg {\n          min-width: 25px;\n        }\n        header > div {\n            width: 100%;\n            width: 100%;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            margin-left: 15px;\n        }\n        .icon-gold {\n            color: #e9cb6b;\n            fill: #e9cb6b;\n        }\n        .confirm-container, .failed-container {\n            padding: 1rem;\n        }\n        .confirm-block {\n            margin-top: 0.5rem;\n        }\n        .h4, h4 {\n            font-size: 1.5rem;\n            margin-top: 0;\n            margin-bottom: 1rem;\n            font-weight: 500;\n            line-height: 1.2;\n            text-align: center;\n        }\n        .confirm-info-block {\n            border-bottom: 2px solid #e9cb6b;\n            border-top: 2px solid #e9cb6b;\n            padding: 0.5rem 0;\n        }\n        .button-block {\n            display: flex;\n            margin-top: 1.5rem;\n            justify-content: center;\n        }\n        .confirm-address-block {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n        }\n        .confirm-item {\n            font-size: 14px;\n            color: #7a7a7a;\n        }\n        .confirm-item.name {\n            max-width: 104px;\n            min-width: 86px;\n            overflow: hidden;\n        }\n        .confirm-details-block {\n            text-align: center;\n            margin-top: 0.5rem;\n        }\n        .trs-fee {\n            font-size: .875rem;\n        }\n        .nonce-info {\n            font-size: .75em;\n            color: #ababab;\n        }\n        .btn:not(:disabled):not(.disabled) {\n            cursor: pointer;\n        }\n        .btn {\n            font-size: 1.125rem;\n            letter-spacing: .1em;\n            text-transform: uppercase;\n            padding: .875rem 1.25rem;\n            min-height: 57px;\n            min-width: 150px;\n            cursor: pointer;\n            display: inline-block;\n            font-weight: 700;\n            text-align: center;\n            white-space: nowrap;\n            vertical-align: middle;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            border: 1px solid transparent;\n            line-height: 1.5;\n            border-radius: 0;\n            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n        }\n        .btn-sm {\n            font-size: .875rem;\n            line-height: 1rem;\n            letter-spacing: 0;\n            text-transform: none;\n            padding: .625rem .875rem;\n            min-height: 38px;\n            min-width: 75px;\n        }\n        .btn-primary {\n            background-color: #e9cb6b;\n            border-color: #e9cb6b;\n            color: #1c1c1c;\n            max-width: 250px;\n        }\n        .btn-cancel {\n            margin-right: 0.25rem;\n            width: 50%;\n        }\n        .btn-confirm {\n            margin-left: 0.25rem;\n            width: 50%;\n        }\n        [type=reset], [type=submit], button, html [type=button] {\n            -webkit-appearance: button;\n        }\n        .btn-primary:hover {\n            color: #212529;\n            background-color: #fadc7d;\n            border-color: #fadc7d;\n        }\n        .btn:focus, .btn:hover {\n            text-decoration: none;\n            outline: none;\n        }\n        .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {\n            background-color: #fadc7d;\n            border-color: #fadc7d;\n        }\n        .btn-primary:not([disabled]):not(.disabled).active, .btn-primary:not([disabled]):not(.disabled):active {\n            color: #fff;\n        }\n        .btn-primary.focus, .btn-primary:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {\n            box-shadow: 0 0 0 0.2rem rgba(233,203,107,.5);\n        }\n        .failed-icon {\n            text-align: center;\n            margin-top: 24px;\n        }\n        .failed-text {\n            margin-bottom: 8px;\n        }\n        #errorMessage {\n          text-align: center;\n        }\n        .btn-done {\n            width: 100%;\n        }\n        .btn-primary.disabled, .btn-primary:disabled {\n            color: #212529;\n            background-color: #e9cb6b;\n            border-color: #e9cb6b;\n            cursor: not-allowed;\n        }\n        .btn.disabled, .btn:disabled {\n            opacity: .65;\n        }\n        .failed-container {\n            display: none;\n        }\n        body.failed .confirm-container {\n            display: none;\n        }\n        body.failed .failed-container {\n            display: block;\n        }\n    ",t={};window.location.search.replace(/^\?/,"").split("&").forEach(n=>{let e=n.split("=");t[decodeURIComponent(e[0])]=e.length>1?decodeURIComponent(e[1]):""});let o,r,i,a,s,c,l,d,m="undefined"!=typeof InstallTrigger,b=m?browser:chrome,f=CryptoJS,p=t.id,u=t.tabId,g={},h=0;function x(n){n.identifier&&(d=n.identifier)}function w(e,t,r){y("GET",n.networkUrl[l]+n.api.blockChainStatus).then(i=>{i&&i.res&&i.res.blockchain_state&&i.res.blockchain_state.block_count?y("POST",n.networkUrl[l]+n.api.addTx,{name:t,data:e}).then(d=>{d?function(e,t,r,i){b.storage.local.get(null,d=>{a=d.unconfirmedTx,c=d.wallets;let m=(new Date).getTime()+n.timeTxFailed;c=c.map(n=>{if(n.publicKey===s.from){let a={hash:e,endTime:m,amount:s.amount,token:s.token.toUpperCase(),network:l,nonce:o,blockId:i?+i-1:null,data:{data:t,name:r}};n.tx?n.tx.push(a):n.tx=[a]}return n}),a.forEach((n,e)=>{n.id==p&&a.splice(e,1)}),b.storage.local.set({wallets:c},()=>{b.storage.local.set({unconfirmedTx:a},()=>{b.runtime.sendMessage({sendTxResult:{hash:e,id:p,tabId:u}}),T()})})})}(r,e,t,i.res.blockchain_state.block_count):k()}).catch(n=>{let e=!1;n.res&&(n.res.code?42==n.res.code||43==n.res.code?g.errorMessage.textContent="Transaction pool overflow":n.res.code&&n.res.wallet_inconsistency?g.errorMessage.textContent="Not enough funds":n.res.code&&n.res.nonce_ahead?g.errorMessage.textContent="Transaction is out of range":n.res.code&&res.nonce_behind&&(o++,setTimeout(()=>{h>=10?k():(h++,C())},200),e=!0):g.errorMessage.textContent="Service is unavailable. Please retry later"),!e&&k()}):k()}).catch(()=>{k()})}function y(n,e,t=""){let o=new XMLHttpRequest,r="GET"===n.toUpperCase()?e+t:e;return o.open(n.toUpperCase(),r,!0),o.setRequestHeader("Content-Type","application/json"),"GET"===n.toUpperCase()?o.send():o.send(JSON.stringify(t)),new Promise((n,e)=>{o.onload=(()=>{if(o.status>=200&&o.status<300)try{n(JSON.parse(o.responseText))}catch(e){n(null)}else try{e(JSON.parse(o.responseText))}catch(e){n(null)}})})}function k(){document.body.classList.add("failed"),v(!1)}function C(){U();const n=function(n,e,t,o,r){const i=window.mint.Signer.FromPK(n);let a;try{o=+o,a=i.SignTransferAssetTx(r,e,t,o.toPrecision(18))}catch(n){return k()}return{txData:a.Data,txDigest:a.Digest,txName:a.Name}}(i,s.to,s.token.toUpperCase(),s.amount,o);w(n.txData,n.txName,n.txDigest)}function v(n=!0){b.storage.local.get(null,e=>{(a=e.unconfirmedTx).forEach((n,e)=>{n.id==p&&a.splice(e,1)}),b.storage.local.set({unconfirmedTx:a},()=>{b.runtime.sendMessage({sendTxResult:{hash:null,id:p,tabId:u}}),n&&T()})})}function T(){b.windows.getCurrent(n=>{b.windows.remove(n.id)})}function E(n){return n.slice(0,6)+"...."+n.slice(-4)}function S(n){const e=function(n){let e=String(n).split(/[eE]/);if(1==e.length)return e[0];let t="",o=n<0?"-":"",r=e[0].replace(".",""),i=Number(e[1])+1;if(i<0){for(t=o+"0.";i++;)t+="0";return t+r.replace(/^\-/,"")}i-=r.length;for(;i--;)t+="0";return r+t}(n),t=e.toString().indexOf(".");return t>=0?e.toString().substr(0,t+9).replace(/0+$/,""):e}function U(){g.btnConfirm.setAttribute("disabled","disabled"),g.btnClose.setAttribute("disabled","disabled")}!function(){(function(){let n=document.createElement("style");n.type="text/css",n.appendChild(document.createTextNode(e)),document.head.appendChild(n)})(),m?b.runtime.onMessage.addListener((n,e,t)=>{x(n)}):b.extension.onMessage.addListener((n,e,t)=>{x(n)});b.runtime.sendMessage({getIdentifier:!0}),t=["infoFrom","infoTo","infoAmount","infoFee","infoNonce","btnClose","btnConfirm","btnDone","errorMessage","accountName"],t.forEach(n=>{g[n]=document.getElementById(n)}),g.btnClose.addEventListener("click",v),g.btnConfirm.addEventListener("click",C),g.btnDone.addEventListener("click",T),U(),b.storage.local.get(null,e=>{c=e.wallets,(a=e.unconfirmedTx).forEach(e=>{e.id==p&&(e.tabId=u,l=e.network,b.storage.local.set({unconfirmedTx:a},()=>{}),y("GET",n.networkUrl[l]+n.api.getBalance,e.from).then(n=>{if(n){o=+n.res.approved_nonce+1;try{let n;for(let t=0;t<c.length;t++)if(c[t].publicKey===e.from){n=c[t].privateKey,r=c[t].name;break}s=e,i=f.AES.decrypt(n,d).toString(f.enc.Utf8),g.infoFrom.textContent=E(e.from),g.infoTo.textContent=E(e.to),g.infoAmount.textContent=e.amount+" "+e.token.toUpperCase(),g.infoFee.textContent=function(n,e){let t;if("MNT"===e.toUpperCase())return S(t=.02);if(n<10)t=1*n/100;else if(n>=10&&n<1e3)t=.3*n/100;else if(n>=1e3&&n<1e4)t=.03*n/100;else if(n>=1e4){const e=.03*n/100;t=e>=.002?.002:e<=2e-4?2e-4:e}return S(t)}(e.amount,e.token)+" "+e.token.toUpperCase(),g.infoNonce.textContent=o,g.accountName.textContent=r,g.btnConfirm.removeAttribute("disabled"),g.btnClose.removeAttribute("disabled")}catch(n){k()}}else k()}))})});var t}()}();
