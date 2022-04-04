import dbConnect from "../../lib/dbConnect";
import User from "../../src/models/User";

export default async function (req, res) {
	await dbConnect();
	console.log(req.body);
	try {
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		res.json({ status: "ok" });
	} catch (error) {
		res.json({ status: "error", error: "Duplicate email" });
	}
}
