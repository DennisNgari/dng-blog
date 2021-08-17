const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');

const AuthorSchema = new mongoose.Schema(
	{
		authorID: {
			type: String,
			default: uuidv1,
			required: true,
			unique: true,
		},
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, unique: true },
		password: { type: String, required: true },
		avator: { type: String },
		role: { type: String, default: 'standard' },
		active: { type: Boolean, default: true },
		dateCreated: { type: Date, default: Date.now },
		dateModified: { type: Date },
	},
	{ strict: true }
);

module.exports = mongoose.model('Author', AuthorSchema);


