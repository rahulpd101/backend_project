import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Router from "next/router";

const Dashboard = () => {
	const [quote, setQuote] = useState("");
	const [tempQuote, setTempQuote] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt.decode("token");
			if (!user) {
				localStorage.removeItem("token");
				Router.push("/login");
			} else {
				populateQuote();
			}
		}
	}, []);

	async function populateQuote() {
		const req = await fetch("/api/quote", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});

		const data = await req.json();
		if (data.status === "ok") {
			setQuote(data.quote);
		} else {
			alert(data.error);
		}
	}

	async function updateQuote(e) {
		e.preventDefault();
		const req = await fetch("/api/quote", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		});

		const data = await req.json();
		if (data.status === "ok") {
			setQuote(tempQuote);
			setTempQuote("");
		} else {
			alert(data.error);
		}
	}

	return (
		<div>
			<h1>Your quote:{quote || "No quote found"}</h1>
			<form onSubmit={updateQuote}>
				<input
					type="text"
					placeholder="Quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<input type="submit" value="Update quote" />
			</form>
		</div>
	);
};

export default Dashboard;
