const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profile_url:{type: String, required: true}
	
	},
	{ collection: 'user-data' },{
        versionKey: false 
    }
)

const model = mongoose.model('UserData', User,'user-data')

module.exports = model