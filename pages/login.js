import React, { useState } from "react";
import useSWR from "swr";
import Router from "next/router";

export default function Login() {
	const fetcher = (url, options) => fetch(url, options).then((res) => res.json());
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function login(e) {
		e.preventDefault();

		const { data, error } = useSWR(
			("http://localhost:3000/api/login",
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ email, password }),
			}),
			fetcher
		);

		if (error) return <div>failed to load INFO</div>;

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
