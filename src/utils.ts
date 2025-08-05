import { isNativeError } from "node:util/types";

export function stringifyError(e: unknown): string {
	if (typeof e === "string") return e;
	if (!isNativeError(e)) return String(e);

	const msg = `${e.name}: ${e.message}`;
	if (e.cause) return `${msg}\nCaused by: ${stringifyError(e.cause)}`;
	return msg;
}
