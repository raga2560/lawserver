var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({

	transactionid: {
		type: String,
		lowercase: true,
		unique: true,
                required: true
	},
	fromaccount: {
		type: String,
		lowercase: true,
                required: true
	},
	toaccount: {
		type: String,
		lowercase: true,
                required: true
	},
	value: {
		type: Number,
		default: false
	},
	role: {
		type: String,
		enum: ['user', 'creator', 'dealer'],
		default: 'user'
	}

}, {
	timestamps: true
});


module.exports = mongoose.model('Transaction', TransactionSchema);
