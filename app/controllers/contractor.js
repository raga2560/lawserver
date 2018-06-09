var Contract = require('../models/contract');

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
        _id : req.params.contract_id
    }, function(err, contract) {
        res.json(contract);
    });

}

exports.activateContract = function(req, res, next){

    Contract.update({
        _id : req.params.contract_id
    }, function(err, contract) {
        res.json(contract);
    });

}
exports.contractExecute = function(req, res, next){

    Contract.update({
        _id : req.params.contract_id
    }, function(err, contract) {
        res.json(contract);
    });

}


exports.getContract = function(req, res, next){

    Contract.find({
        _id : req.params.contract_id
    }, function(err, contract) {
        if (err){
                res.send(err);
        }
        res.json(contract);
    });
}

