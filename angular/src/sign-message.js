"use strict";!function(){let n="\n        body, html {\n            margin: 0;\n            padding: 0;\n            max-width: 300px;\n            width: 100%;\n            height: 520px;\n            overflow: hidden;\n            font-size: 16px;\n            font-family: Avenir,Helvetica,Arial,sans-serif;\n            line-height: 1.5;\n        }\n        header {\n            background: #212121;\n            color: #ccc;\n            height: 57px;\n            padding: 0 1rem;\n            display: flex;\n            align-items: center;\n        }\n        .confirm-container {\n            padding: 1rem;\n        }\n        .confirm-block {\n            margin-top: 0.5rem;\n        }\n        .h4, h4 {\n            font-size: 1.5rem;\n            margin-top: 0;\n            margin-bottom: 1rem;\n            font-weight: 500;\n            line-height: 1.2;\n        }\n        .confirm-info-block {\n            border-bottom: 2px solid #e9cb6b;\n            border-top: 2px solid #e9cb6b;\n            padding: 0.5rem 0;\n        }\n        #sourceIconBlock {\n            display: none;\n            text-align: center;\n        }\n        .source-host {\n            text-align: center;\n            font-weight: 600;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n        .confirm-text {\n            text-align: center;\n        }\n        .message-length {\n            text-align: center;\n            font-size: .875em;\n            color: #ababab;\n            margin: 10px;\n        }\n        .attention-text {\n            text-align: center;\n        }\n        .attention-text b {\n            color: #fa3c00;\n        }\n        .icon-gold {\n            color: #e9cb6b;\n            fill: #e9cb6b;\n        }\n        .button-block {\n            display: flex;\n            margin-top: 1.5rem;\n        }\n        .btn:not(:disabled):not(.disabled) {\n            cursor: pointer;\n        }\n        .btn {\n            font-size: 1.125rem;\n            letter-spacing: .1em;\n            text-transform: uppercase;\n            padding: .875rem 1.25rem;\n            min-height: 57px;\n            min-width: 150px;\n            cursor: pointer;\n            display: inline-block;\n            font-weight: 700;\n            text-align: center;\n            white-space: nowrap;\n            vertical-align: middle;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            border: 1px solid transparent;\n            line-height: 1.5;\n            border-radius: 0;\n            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n        }\n        .btn-sm {\n            font-size: .875rem;\n            line-height: 1rem;\n            letter-spacing: 0;\n            text-transform: none;\n            padding: .625rem .875rem;\n            min-height: 38px;\n            min-width: 75px;\n        }\n        .btn-primary {\n            background-color: #e9cb6b;\n            border-color: #e9cb6b;\n            color: #1c1c1c;\n        }\n        .btn-cancel {\n            margin-right: 0.25rem;\n            width: 50%;\n        }\n        .btn-confirm {\n            margin-left: 0.25rem;\n            width: 50%;\n        }\n        [type=reset], [type=submit], button, html [type=button] {\n            -webkit-appearance: button;\n        }\n        .btn-primary:hover {\n            color: #212529;\n            background-color: #fadc7d;\n            border-color: #fadc7d;\n        }\n        .btn:focus, .btn:hover {\n            text-decoration: none;\n            outline: none;\n        }\n        .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {\n            background-color: #fadc7d;\n            border-color: #fadc7d;\n        }\n        .btn-primary:not([disabled]):not(.disabled).active, .btn-primary:not([disabled]):not(.disabled):active {\n            color: #fff;\n        }\n        .btn-primary.focus, .btn-primary:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {\n            box-shadow: 0 0 0 0.2rem rgba(233,203,107,.5);\n        }\n\n        .btn-primary.disabled, .btn-primary:disabled {\n            color: #212529;\n            background-color: #e9cb6b;\n            border-color: #e9cb6b;\n            cursor: not-allowed;\n        }\n        .btn.disabled, .btn:disabled {\n            opacity: .65;\n        }\n    ",e={};window.location.search.replace(/^\?/,"").split("&").forEach(n=>{let t=n.split("=");e[decodeURIComponent(t[0])]=t.length>1?decodeURIComponent(t[1]):""});let t,o,r,i,s,a="undefined"!=typeof InstallTrigger,c=a?browser:chrome,l=window.SumusLib,d=CryptoJS,b=e.id,g=e.tabId,m={};function p(n){n.identifier&&(o=n.identifier,c.storage.local.get(null,n=>{r=n.messagesForSign,s=n.wallets,r.forEach(n=>{if(n.id==b){i=n;let e,r=[];for(let n in i.bytes)r.push(i.bytes[n]);i.bytes=r;for(let t=0;t<s.length;t++)if(s[t].publicKey===n.publicKey){e=s[t].privateKey;break}t=d.AES.decrypt(e,o).toString(d.enc.Utf8),m.sourceHost.textContent=n.host,m.messageLength.textContent=i.bytes?i.bytes.length:0,n.iconUrl&&(m.sourceIconBlock.style.display="block",m.sourceIcon.setAttribute("src",n.iconUrl))}})}))}function u(){let n;try{n=l.Signer.Sign(i.bytes,t)}catch(n){f()}c.storage.local.get(null,e=>{(r=e.messagesForSign).forEach((n,e)=>{n.id==b&&r.splice(e,1)}),c.storage.local.set({messagesForSign:r},()=>{c.runtime.sendMessage({sendSignResult:{result:n,id:b,tabId:g}}),h()})})}function f(){c.storage.local.get(null,n=>{(r=n.messagesForSign).forEach((n,e)=>{n.id==b&&r.splice(e,1)}),c.storage.local.set({messagesForSign:r},()=>{c.runtime.sendMessage({sendSignResult:{result:null,id:b,tabId:g}}),h()})})}function h(){c.windows.getCurrent(n=>{c.windows.remove(n.id)})}!function(){(function(){let e=document.createElement("style");e.appendChild(document.createTextNode(n)),document.head.appendChild(e)})(),a?c.runtime.onMessage.addListener((n,e,t)=>{p(n)}):c.extension.onMessage.addListener((n,e,t)=>{p(n)});c.runtime.sendMessage({getIdentifier:!0}),e=["sourceHost","sourceIconBlock","sourceIcon","messageLength","btnClose","btnConfirm"],e.forEach(n=>{m[n]=document.getElementById(n)}),m.btnClose.addEventListener("click",f),m.btnConfirm.addEventListener("click",u);var e}()}();