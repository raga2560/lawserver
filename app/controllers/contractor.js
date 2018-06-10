var Contract = require('../models/contract');
var Transactor = require('./transactor');
var Bitcoinop = require('../bitcoin/bitcoinop');

exports.getContracts = function(req, res, next){

    Contract.find(function(err, contracts) {

        if (err){
        	res.send(err);
        }

        res.json(contracts);

    });

}

exports.createContract = function(req, res, next){
    var owner = req.body.user;
    var length = 5;

    var contractid = 'contract_'+Math.random().toString(36).substr(2, length);
   
    var compositedata = {
	pin: '1234'
    };
  
    var contractaddr = Bitcoinop.getCompositeAddr(compositedata, Buffer.from(contractid));

    Contract.create({
        contractid : contractid,
        contractowner : owner,
        depositaddress: req.body.depositaddress,
        contractaddress: contractaddr,
        parties: req.body.parties,
        settlementid: '',
        aggrement: req.body.parties,
        details: req.body.details,

        done : false
    }, function(err, contract) {

        console.log(contract);
        console.log(err);
        if (err){
        	res.send(err);
        }
        else { 
        Contract.find({_id: contract._id}, function(err, contract) {

            if (err){
            	res.send(err);
            }
            else {    
            res.json(contract);
            }

        });
      }

    });

}

exports.deleteContract = function(req, res, next){

    Contract.remove({
        contractid : req.body.contractid
    }, function(err, contract) {
        res.json(contract);
    });

}

exports.executeContract = function(req, res){
    var contract = req.body.contract;
    var amount = Number(req.body.amount);
    console.log(contract); 

    Transactor.rawSettle(contract, amount, function (err, data) {

    Contract.update({
        contractid : contract.contractid
    },{$set: {settlementid:data.txid, amount: amount}},  function(err, newcontract) {
        res.json(newcontract);
    });
    });

}


exports.getContract = function(req, res, next){

    Contract.find({
        contractid : req.body.contractid
    }, function(err, contract) {
        if (err){
                res.send(err);
        }
        res.json(contract);
    });
}

