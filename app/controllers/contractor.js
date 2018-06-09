var Contract = require('../models/contract');

exports.getContracts = function(req, res, next){

    Contract.find(function(err, coupons) {

        if (err){
        	res.send(err);
        }

        res.json(coupons);

    });

}

exports.createContract = function(req, res, next){
    var owner = req.user;
    var length = 5;
    Contract.create({
        contractid : 'contract_'+Math.random().toString(36).substr(2, length),
        contractowner : owner,
        depositaddress: req.body.depositaddress,
        parties: req.body.parties,
        aggrement: req.body.parties,
        details: req.body.details,

        done : false
    }, function(err, coupon) {

        if (err){
        	res.send(err);
        }
       
        Contract.find(function(err, coupons) {

            if (err){
            	res.send(err);
            }
                
            res.json(coupons);

        });

    });

}

exports.deleteContract = function(req, res, next){

    Contract.remove({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        res.json(coupon);
    });

}

exports.activateContract = function(req, res, next){

    Contract.update({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        res.json(coupon);
    });

}
exports.contractExecute = function(req, res, next){

    Contract.update({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        res.json(coupon);
    });

}


exports.getContract = function(req, res, next){

    Contract.find({
        _id : req.params.coupon_id
    }, function(err, coupon) {
        if (err){
                res.send(err);
        }
        res.json(coupon);
    });
}

