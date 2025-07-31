import { fetchFromRetriever } from "./actions";

export default async function App(props: { params: Promise<{ id: string }> }) {
	const id = await props.params.then(({ id }) => decodeURIComponent(id));
	const data = await fetchFromRetriever(id);
	if (typeof data === "string") {
		return <div>Error: {data}</div>;
	}
	return (
		<div>
			<div>
				<h2>Part: {id}</h2>
				<ul style={{ fontSize: "1.1em" }}>
					<li>Description: {data.desc}</li>
					<li>Warnings: {data.warnings.join(", ") || "n/a"}</li>
					<li>Status: {data.status}</li>
					<li>Under eco: {String(data.under_eco)}</li>
					<li>Rev letter: {data.rev_letter}</li>
				</ul>

				<table>
					<thead>
						<tr>
							<th>ItemPN</th>
							<th>ItemNum</th>
							<th>ItemRevID</th>
							<th>ItemRevStr</th>
							<th>ItemDesc</th>
							<th>ItemStatus</th>
							<th>QtyStr</th>
							<th>attachments</th>
						</tr>
					</thead>
					<tbody>
						{data.bill_of_materials.map((r, i) => (
							<tr key={i}>
								<th>{r.ItemPN}</th>
								<td>{r.ItemNum}</td>
								<td>{r.ItemRevID}</td>
								<td>{r.ItemRevStr}</td>
								<td>{r.ItemDesc}</td>
								<td>{r.ItemStatus}</td>
								<td>{r.QtyStr}</td>
								<td>
									<ul>
										{r.attachments.map(a => (
											<li key={a.file_name}>
												<a href={a.url}>{a.file_name}</a>
											</li>
										))}
									</ul>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
