var mongoose = require('mongoose');

var PartySchema = new mongoose.Schema({

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

	var user = this;

		return next();


});


module.exports = mongoose.model('Party', PartySchema);
