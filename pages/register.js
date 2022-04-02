import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Register() {
	const fetcher = (url, options) => fetch(url, options).then((res) => res.json());
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerUser(e) {
		e.preventDefault();

		const { info, error } = useSWR(
			("http://localhost:3000/api/register",
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			}),
			fetcher
		);

		if (error) return <div>DATA didn't load!</div>;

		if (info.status === "ok") {
			router.replace("/login");
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
