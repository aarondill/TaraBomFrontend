// import cssText from "bundle-text:./styles.css";
/* <style>{cssText}</style> */
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

export default function App({ params }: { params: { id?: string } }) {
	if (!params.id) return null;
	return (
		<div>
			<div>
				<h1>Get Started with this id: {params.id}</h1>
				<Table />
			</div>
		</div>
	);
}
