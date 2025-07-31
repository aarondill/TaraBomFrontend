import { fetchFromRetriever } from "./actions";

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

export default async function App(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const data = fetchFromRetriever(id);
	if (typeof data === "string") {
		return <div>Error: {data}</div>;
	}
	return (
		<div>
			<div>
				<h1>Get Started with this id: {id}</h1>
				results: {JSON.stringify(data)}
				<Table />
			</div>
		</div>
	);
}
