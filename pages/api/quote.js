import User from "../../src/models/User";
import jwt from "jsonwebtoken";

export default async function (res, req) {
	if (req.method === "GET") {
		const token = req.headers["x-access-token"];
		try {
			const decoded = jwt.verify(token, "secret123");
			const email = decoded.email;
			const user = await User.findOne({ email: email });

			return res.json({ status: "ok", quote: user.quote });
		} catch (error) {
			console.log(error);
			res.json({ status: "error", error: "invalid token" });
		}
	}
	if (req.method === "POST") {
		const token = req.headers["x-access-token"];
		try {
			const decoded = jwt.verify(token, "secret123");
			const email = decoded.email;
			await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
			return res.json({ status: "ok" });
		} catch (error) {
			console.log(error);
			res.json({ status: "error", error: "invalid token" });
		}
	}
}
