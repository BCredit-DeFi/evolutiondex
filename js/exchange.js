const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const defaultPrivateKey = "5JvA9M2LEZJEfvtv2LtsBRoAmeMiYVBnrormDRfAg2ScQG3S5tT"; // ali
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

(async () => {
    const result = await api.transact({
        actions: [{
        account: 'evolutiondex',
        name: 'exchange',
        authorization: [{
            actor: 'ali',
            permission: 'active',
        }],
        data: {
            user: 'ali',
            through: '4,EVO',
            ext_asset1: {"contract":"eosio.token", "quantity":"0.0001 EOS"},
            ext_asset2: {"contract":"voice4", "quantity":"-0.0001 VOICE"}, 
        },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
    console.dir(result);
})();
