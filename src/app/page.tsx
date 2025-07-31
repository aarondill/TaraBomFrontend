import Link from "next/link";
import { fetchFromRetriever } from "./actions";
import { Output } from "./types";

function BillOfMaterials(props: {
	bill_of_materials: Output["bill_of_materials"];
}) {
	const { bill_of_materials } = props;
	return (
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
					{bill_of_materials.map((r, i) => (
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
									{r.attachments.map(a => {
										const searchParams = new URLSearchParams();
										searchParams.set("docUrl", a.url);
										const apiUrl = "./pdf/api?" + searchParams.toString();
										return (
											<li key={a.file_name}>
												<Link target="_blank" href={apiUrl.toString()}>
													{a.file_name}
												</Link>
											</li>
										);
									})}
								</ul>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

function ProductInfo(props: { data: Output; id: string }) {
	const { data, id } = props;
	return (
		<section>
			<h2>Part: {id}</h2>
			<ul style={{ fontSize: "1.1em" }}>
				<li>Description: {data.desc}</li>
				<li>Status: {data.status}</li>
				<li>Revision letter: {data.rev_letter}</li>
			</ul>
			{/* NOTE: underEco is covered by the warnings */}
			{data.warnings.length > 0 && (
				<div>
					<mark>Warning:</mark>
					<ul>
						{data.warnings.map((w, i) => (
							<li key={i}>
								<mark>{w}</mark>
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}

export default async function App(props: {
	searchParams: Promise<{ ID?: string | string[] }>;
}) {
	const searchParams = await props.searchParams;
	if (!searchParams.ID) return null; // only display the search bar
	if (typeof searchParams.ID !== "string")
		return <div>Error: Invalid ID type</div>;

	const id = decodeURIComponent(searchParams.ID);
	const data = await fetchFromRetriever(id);
	if (typeof data === "string") {
		return <div>Error: {data}</div>;
	}
	return (
		<div>
			<div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
				<ProductInfo data={data} id={id} />
				{data.bill_of_materials.length > 0 && (
					<BillOfMaterials bill_of_materials={data.bill_of_materials} />
				)}
			</div>
		</div>
	);
}
