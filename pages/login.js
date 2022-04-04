import React, { useState } from "react";
import Router from "next/router";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function login(e) {
		e.preventDefault();

		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (data.user) {
			localStorage.getItem("token", data.user);
			alert("Login successful!");
			Router.replace("/dashboard");
		} else {
			alert("Please check your username and password");
		}
		console.log(data);
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<h1>Login User</h1>
			<form onSubmit={login}>
				<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
				<br />
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}
