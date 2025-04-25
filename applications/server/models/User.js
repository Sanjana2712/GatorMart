const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profile_url:{type: String, required: true},
		verified:{type:Boolean, default: false }
	
	},
	{ collection: 'user-data' },{
        versionKey: false 
    }
)

module.exports = mongoose.model('User', User)
