import { isNativeError } from "node:util/types";

export function stringifyError(e: unknown): string {
	if (typeof e === "string") return e;
	if (!isNativeError(e)) return String(e);

	const msg = `${e.name}: ${e.message}`;
	if (e.cause) return `${msg}\nCaused by: ${stringifyError(e.cause)}`;
	return msg;
}

export function getErrorResponse(e: unknown, message: string) {
	const status =
		e instanceof Error &&
		e.cause instanceof Error &&
		"code" in e.cause &&
		e.cause.code === "ENOTFOUND"
			? 404 // The address doesn't exist / isn't reachable
			: 500; // anything else is a server error
	return new Response(`${message}: ${stringifyError(e)}`, {
		status,
	});
}
