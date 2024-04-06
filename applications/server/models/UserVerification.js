const mongoose = require('mongoose')

const UserVerificationSchema = new mongoose.Schema(
	{
		userID : String,
        uniqueString : String,
        createdAt: Date,
        expiresAt:Date,
	
	}
);

const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);

module.exports = UserVerification;