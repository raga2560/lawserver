var Contract = require('../models/contract');
var Transactor = require('./transactor');

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
    Contract.create({
        contractid : 'contract_'+Math.random().toString(36).substr(2, length),
        contractowner : owner,
        depositaddress: req.body.depositaddress,
        contractaddress: 'placeforbitcoinaddress', 
        parties: req.body.parties,
        settlementid: '',
        aggrement: req.body.parties,
        details: req.body.details,

        done : false
    }, function(err, contract) {

        console.log(contract);
        if (err){
        	res.send(err);
        }
       
        Contract.find({_id: contract._id}, function(err, contract) {

            if (err){
            	res.send(err);
            }
            else {    
            res.json(contract);
            }

        });

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

