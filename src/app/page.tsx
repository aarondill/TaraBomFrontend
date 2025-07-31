// import cssText from "bundle-text:./styles.css";
/* <style>{cssText}</style> */
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
				<tr>
					<th>Name</th>
					<th>Some</th>
					<th>Columns</th>
					<th>With</th>
					<th>Data</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
				</tr>
			</tbody>
		</table>
	);
}

export default function App(params: { id?: string }) {
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
