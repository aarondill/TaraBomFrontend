import { fetchFromRetriever } from "./actions";

export default async function App(props: { params: Promise<{ id: string }> }) {
	const id = await props.params.then(({ id }) => decodeURIComponent(id));
	const data = await fetchFromRetriever(id);
	if (typeof data === "string") {
		return <div>Error: {data}</div>;
	}
	return (
		<div>
			<div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
				<section>
					<h2>Part: {id}</h2>
					<ul style={{ fontSize: "1.1em" }}>
						<li>Description: {data.desc}</li>
						<li>Status: {data.status}</li>
						<li>Revision letter: {data.rev_letter}</li>
					</ul>
					{/* NOTE: underEco is covered by the warnings */}
					{data.warnings.length > 0 && (
						<div style={{ color: "yellow" }}>
							Warning:
							<ul>
								{data.warnings.map((w, i) => (
									<li key={i}>{w}</li>
								))}
							</ul>
						</div>
					)}
				</section>
				<section>
					<h2>Bill of Materials</h2>
					<table>
						<thead>
							<tr>
								<th>PN</th>
								<th>Num</th>
								<th>RevID</th>
								<th>RevStr</th>
								<th>Desc</th>
								<th>Status</th>
								<th>Quantity</th>
								<th>Attachments</th>
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
				</section>
			</div>
		</div>
	);
}
