const mongoose = require('mongoose')

const UserUnverifiedSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profile_url:{type: String, required: true},
        uniqueString : String,
        createdAt: Date,
        expiresAt:Date,
	
	}
);

const UserUnverified = mongoose.model('UserUnverified', UserUnverifiedSchema);

module.exports = UserUnverified;