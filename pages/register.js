import React from "react";
import { useState } from "react";
import Router from "next/router";
export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerUser(e) {
		e.preventDefault();

		const response = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});

		const data = await response.json();

		if (data.status === "ok") {
			console.log(data.status);
			Router.push("/login");
		}
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<h1>Registration Form</h1>
			<form onSubmit={registerUser}>
				<input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
				<br />
				<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
				<br />
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Register" />
			</form>
		</div>
	);
}
