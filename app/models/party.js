var mongoose = require('mongoose');
 
// https://stackoverflow.com/questions/23199482/create-unique-autoincrement-field-with-mongoose

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);


var PartySchema = new mongoose.Schema({
        countvalue: { type: String },
	partyid: {
		type: String,
		unique: true,
		required: true
	},
	userid: {
		type: String,
		required: true
	},
	userdetails: {
		type: mongoose.Schema.Types.Mixed,
		required: true
	},
	dealertype: {
		type: String,  // realestate, company, 
		required: true
	},
	partyaddress: {
		type: String,  // realestate, company, 
		required: true
	},
	profession: {
		type: String,  // dealer, consumer
		required: true
	},
	role: {
		type: String,
		enum: ['reader', 'creator', 'editor'],
		default: 'reader'
	}

}, {
	timestamps: true
});

PartySchema.pre('save', function(next){

	var doc = this;

		return next();
  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, 
      function(error, counter)   {
        if(error)
            return next(error);
        doc.countvalue = counter.seq;
        doc.partyid = counter.seq;
        next();
    });


});


module.exports = mongoose.model('Party', PartySchema);
