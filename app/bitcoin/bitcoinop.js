var request = require('request')
var Account = require('../models/accounts')
var contract = require('../../config/contract.json')
compositekeylib = require('./compositekeylib');
request = require('request');
promise = require('promise');


bitcoin = require('bitcoinjs-lib');
//types = require('./node_modules/bitcoinjs-lib/src/types');
typeforce = require('typeforce');
var bufferReverse = require('buffer-reverse')


// get address info
var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
//var url = 'https://live.blockcypher.com/btc-testnet/address/';
var url = contract.contractorurl;

function getApi(api_endpoint, param, callback) {
    console.log('Get from:'+api_endpoint+'/'+param)
    console.log(url);    
    var vendordata = {
        vendorid: contract.vendorid
    };
    request.post(url + '/api/relation/createRelation', JSON.stringify(vendordata), function (error, response, body) {
        if (error) {
            return callback(error)
        }
        if (typeof body === 'string') {
            //body = JSON.parse(body)
        }
        console.log('Status:', response.statusCode)
        console.log('Body:', body)
        return callback(null, body)
    })
}

exports.getCompositeAddr = function(jsonstub, uidkey )
{
// type 1, hashofdoc is used in raw string
// type 2, hash of hashofdoc is used in  string
  var Pin = JSON.stringify(jsonstub);
  var Pinkey = Buffer.from(Pin);

   var docaddr = compositekeylib.getBufControlCodeAddress(Pinkey,
                uidkey,
                bitcoin.networks.testnet);
   console.log("docaddr = "+docaddr);

   return docaddr;
}



exports.sendtx = function (tx)
{
   var pushtx = {
    tx: tx.toHex()
   };

var config = {
 params: pushtx
};

   var lurl = 'https://api.blockcypher.com/v1/btc/test3/txs/push';
   var promise = new Promise(function (resolve, reject) {
   console.log("before push=", JSON.stringify(pushtx));

   request.post(lurl, JSON.stringify(pushtx) , function (error, response, body) {
        if (error) {
           reject(error);
        }
        resolve(body);
     });

    });

   return promise;
}


exports.bitCoinSettle = function (contract,amount,  callback) {
  // do bitcoin transaction and update  mongodb, also give tx number for each update

        getApi("addr", "agag", function(err, body) {

        if (err) {

		console.log('error: ', err)
                callback(err, null);
         }
         else {


               callback(null, body)
         }
        });
}

exports.rawSettle = function (contract,amount,  callback) {
  // update accounts in mongodb, also give tx number for each update
  var data = {
      txid: 'ahahah',
      status: 'success' 
  };
 
  //update multiple accounts 

  // have flag in transit
  // update all when done


               callback(null, data)
   
}
