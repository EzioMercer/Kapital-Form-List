'use client';

const f = async () => {
	const r = await fetch("http://localhost:3000");

	console.log(await r.text());
}

export default function Home() {
	return (
		<div>
			Hello
			<button onClick={f}>CLick me</button>
		</div>
	);
}
