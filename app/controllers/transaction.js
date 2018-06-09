var Transaction = require('../models/transaction');
var Transactor = require('./transactor');
var contract = require('../../config/contract.json')

exports.getTransactions = function(req, res, next){

    Transaction.find(function(err, pairs) {

        if (err){
        	res.send(err);
        }

        res.json(pairs);

    });

}


exports.deleteTransaction = function(req, res, next){

    Manager.remove({
        _id : req.params.pair_id
    }, function(err, pair) {
        res.json(pair);
    });

}

exports.getTransaction = function(req, res, next){

    Manager.find({
        _id : req.params.pair_id
    }, function(err, pair) {
        if (err){
                res.send(err);
        }
        res.json(pair);
    });
}



