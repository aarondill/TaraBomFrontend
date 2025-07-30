type AppProps = { id?: string };
export function App(params: AppProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
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

function Index(params: AppProps) {
	if (!params.id) {
		return <Search />;
	}

	return (
		<div>
			<Search />
			<div>
				<h1>Get Started with this id: {params.id}</h1>
			</div>
		</div>
	);
}
