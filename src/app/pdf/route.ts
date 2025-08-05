import { stringifyError } from "@/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const docUrl = request.nextUrl.searchParams.get("docUrl");
	if (!docUrl) return new Response("No document URL provided", { status: 400 });
	if (typeof docUrl !== "string")
		return new Response("Document URL must be a string", { status: 400 });
	try {
		const docUrlObj = new URL(docUrl);
		if (docUrlObj.protocol !== "https:" && docUrlObj.protocol !== "http:")
			return new Response("Document URL must be HTTP(S)", { status: 400 });
	} catch {
		return new Response("Document URL is not a valid URL", { status: 400 });
	}

	console.log("Fetching document from", docUrl);
	return await fetch(docUrl)
		.then(res => {
			if (!res.ok) return new Response(res.statusText, { status: res.status });
			console.log(
				"Document fetched: Content-Type is",
				res.headers.get("Content-Type")
			);
			return new Response(res.body, {
				headers: { "Content-Type": "application/pdf" },
			});
		})
		.catch(e => {
			const status =
				e instanceof Error &&
				e.cause instanceof Error &&
				"code" in e.cause &&
				e.cause.code === "ENOTFOUND"
					? 404 // The address doesn't exist / isn't reachable
					: 500; // anything else is a server error
			return new Response(`Failed to fetch document: ${stringifyError(e)}`, {
				status,
			});
		});
}
