import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const id = nextUrl.searchParams.get("id")?.trim();
	if (!id) throw new Error("No id");
	nextUrl.pathname = "/" + encodeURIComponent(id);
	nextUrl.searchParams.delete("id");
	return NextResponse.redirect(nextUrl);
}

export const config = {
	matcher: [
		{
			source: "/",
			has: [{ type: "query", key: "id" }],
		},
	],
};
