var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({

        accounid: {
		type: String,
		unique: true,
                required: true
	},
	balance: {
		type: Number,
		default: 0,
                required: true
	},
	transactions: {
		type: Array,
	},
	Usename: {
		type: String,
                required: true
	},
	Phone: {
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


module.exports = mongoose.model('Account', AccountSchema);
