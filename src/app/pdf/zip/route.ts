import { fetchFromRetriever } from "@/app/actions";
import { getErrorResponse, stringifyError } from "@/utils";
import { ZipWriter } from "@zip.js/zip.js";
import { NextRequest } from "next/server";

type FileDownload = { blob: Blob; name: string };
function zip(files: FileDownload[], signal?: AbortSignal) {
	const zipFileStream = new TransformStream();

	const zipWriter = new ZipWriter(zipFileStream.writable, {
		compressionMethod: 0,
		level: 0,
		signal,
	});
	console.log("Adding files to zip");
	void Promise.all(
		files.map(file => zipWriter.add(file.name, file.blob.stream()))
	)
		.then(() => console.log("Finished adding files to zip"))
		.then(() => zipWriter.close());
	return zipFileStream.readable;
}

export async function GET(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("ID");
	if (!id) return new Response("No part ID provided", { status: 400 });
	if (typeof id !== "string")
		return new Response("Part ID must be a string", { status: 400 });

	console.log("Zipping documents for", id);
	const data = await fetchFromRetriever(id);
	if (typeof data === "string")
		return new Response("Error: " + data, { status: 500 });

	const attachments = data.bill_of_materials.map(r => r.attachments).flat();
	return Promise.all(
		attachments.map(async a => {
			const url = new URL(a.url);
			const res = await fetch(url, { signal: request.signal });
			if (!res.ok) throw new Error(`Failed to fetch ${a.url}`);
			return {
				blob: await res.blob(),
				name: a.file_name,
			} satisfies FileDownload;
		})
	)
		.then(
			blobs => {
				return new Response(zip(blobs, request.signal), {
					headers: {
						"Content-Type": "application/zip",
						"Content-Disposition": `attachment; filename=${id}.zip`,
					},
				});
			},
			e => getErrorResponse(e, "Failed to fetch document")
		)
		.catch(
			e =>
				new Response(`Failed to zip documents: ${stringifyError(e)}`, {
					status: 500,
				})
		);
}
