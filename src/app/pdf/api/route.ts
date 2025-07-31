import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const docUrl = request.nextUrl.searchParams.get("docUrl");
	if (!docUrl) return new Response("No document URL provided", { status: 400 });
	if (typeof docUrl !== "string")
		return new Response("Document URL must be a string", { status: 400 });

	const res = await fetch(docUrl, {
		headers: { "Content-Type": "application/pdf" },
	});
	if (!res.ok) return new Response(res.statusText, { status: res.status });

	return new Response(res.body, {
		headers: { "Content-Type": "application/pdf" },
	});
}
