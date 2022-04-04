import User from "../../src/models/User";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
	const user = await User.find({
		email: req.body.email,
		password: req.body.password,
	});
	if (user) {
		const token = jwt.sign({ name: user.name, email: user.email }, "secret123");

		return res.json({ status: "ok", user: token });
	} else {
		return res.json({ status: "error", user: false });
	}
}
