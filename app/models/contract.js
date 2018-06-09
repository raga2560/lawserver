var mongoose = require('mongoose');

var ContractSchema = new mongoose.Schema({

        contractadmin: {
		type: String,
		unique: true,
                required: true
	},
	parties: {
		type: Array
	},
	amount: {
		type: Number,
		default: 0,
                required: true
	},
	aggrement: {
		type: Array,  // {accountid, name, percentage, fixed}
	},
	settlementid: {
		type: String,
	},
	role: {
		type: String,
		enum: ['user', 'creator', 'dealer'],
		default: 'dealer'
	}

}, {
	timestamps: true
});


module.exports = mongoose.model('Contract', ContractSchema);
