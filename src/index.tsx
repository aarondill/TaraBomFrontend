import { h } from "preact";
void h; // Prevent unused import warning - This import is required for the preact JSX pragma to work

type AppProps = { id?: string };
export function App(params: AppProps) {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="color-scheme" content="light dark" />
				<title>BOM Retreiver</title>
			</head>
			<body>
				<Index {...params} />
			</body>
		</html>
	);
}

function Search() {
	return (
		<form method="GET" action="/search">
			<input type="text" name="id" placeholder="BOM ID" />
			<button type="submit">Search</button>
		</form>
	);
}

async function sleep(ms: number): Promise<number> {
	return new Promise(resolve => setTimeout(() => resolve(5), ms));
}

async function Index(params: AppProps) {
	if (!params.id) {
		return <Search />;
	}
	const n = sleep(1000);

	return (
		<div>
			<Search />
			<div>
				<h1>Get Started with this id: {params.id}</h1>
				<p> num: {n}</p>
			</div>
		</div>
	);
}
