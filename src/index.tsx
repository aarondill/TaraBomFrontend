import cssText from "bundle-text:./styles.css";
type AppProps = { id?: string };
export function App(params: AppProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="color-scheme" content="light dark" />
				<title>BOM Retriever</title>
				<style>{cssText}</style>
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

function Table() {
	// TODO: Implement table
	return (
		<table>
			<thead>
				<th>Name</th>
				<th>Some</th>
				<th>Columns</th>
				<th>With</th>
				<th>Data</th>
			</thead>
			<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
			</tr>
		</table>
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
				<Table />
			</div>
		</div>
	);
}
