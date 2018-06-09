var Party = require('../models/party');

exports.getPartys = function(req, res, next){

    Party.find(function(err, todos) {

        if (err){
        	res.send(err);
        }

        res.json(todos);

    });

}

exports.createParty = function(req, res, next){

    Party.create({
        title : req.body.title,
        description : req.body.description,
        rating: req.body.rating,
        done : false
    }, function(err, todo) {

        if (err){
        	res.send(err);
        }
       
        Party.find(function(err, todos) {

            if (err){
            	res.send(err);
            }
                
            res.json(todos);

        });

    });

}

exports.deleteParty = function(req, res, next){

    Party.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        res.json(todo);
    });

}
