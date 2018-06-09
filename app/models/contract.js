var mongoose = require('mongoose');

var ContractSchema = new mongoose.Schema({

        contractid: {
		type: String,
		unique: true,
                required: true
	},
        contractowner: {
		type: String, // will have userid or new partyid
		unique: true,
                required: true
	},
        depositaddress: {
		type: String,
		unique: true,
                required: true
	},
	details: {
		type: mongoose.Schema.Types.Mixed,

	},
	parties: {
		type: Array  // name and accounts
	},
	amount: {
		type: Number,
		default: 0,
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
