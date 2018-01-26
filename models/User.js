const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
	googleId: String,
	coins : [{
		type: String
		}]
});

mongoose.model('users', userSchema);

