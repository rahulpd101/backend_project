import React from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const nav = useNavigate();

	async function populateQuote() {
		const req = await fetch("http://localhost:3000/api/quote", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});

		const data = req.json();
		console.log(data);
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt.decode("token");
			if (!user) {
				localStorage.removeItem("token");
				nav("/login", { replace: true });
			} else {
				populateQuote();
			}
		}
	}, []);

	return <h1>Welcome to Dashboard board!</h1>;
};

export default Dashboard;
