import Cors from "cors";

const cors = Cors({ methods: ["GET", "POST", "OPTIONS"] });

function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

async function handler(req, res) {
	await runMiddleware(req, res, cors);
	res.json({ message: "Hello everyone!" });
}

export default handler;
