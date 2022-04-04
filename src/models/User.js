import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
	},
	{ collection: "userData" }
);

module.exports = mongoose.models.userData || mongoose.model("userData", User);
