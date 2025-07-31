import { isNativeError } from "node:util/types";
import { Output } from "./types";

const RETRIEVER_SERVER_ADDRESS = process.env.RETRIEVER_SERVER_ADDRESS;

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

	const url = new URL(id, RETRIEVER_SERVER_ADDRESS);
	let response;

	try {
		response = await fetch(url);
	} catch (e) {
		console.error(e);
		if (
			isNativeError(e) &&
			isNativeError(e.cause) &&
			"code" in e.cause &&
			e.cause.code === "ECONNREFUSED"
		) {
			return <div>Error: Could not connect to retriever server</div>;
		}
		return <div>Error: {isNativeError(e) ? e.message : String(e)}</div>;
	}

	const status = response.status;
	if (status !== 200) {
		return <div>Error: {await response.text()}</div>;
	}

	const data = (await response.json()) as Output;
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
