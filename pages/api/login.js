import jwt from "jsonwebtoken";

import User from "../../src/models/User";

export default async function handler(req, res) {
	const user = await User.findOne({
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
