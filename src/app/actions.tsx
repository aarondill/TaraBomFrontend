"use server";
const RETRIEVER_SERVER_ADDRESS = process.env.RETRIEVER_SERVER_ADDRESS;
import { isNativeError } from "node:util/types";
import { Output } from "./types";

/** Returns the output of the retriever server for the given id. If an error occurs, returns an error message. */
export async function fetchFromRetriever(id: string): Promise<string | Output> {
	const url = new URL(id, RETRIEVER_SERVER_ADDRESS);
	let response;

	try {
		// Cache the response for 1 hour
		response = await fetch(url, {
			next: { revalidate: 60 * 60 },
			cache: "force-cache",
		});
	} catch (e) {
		console.error(e);
		if (
			isNativeError(e) &&
			isNativeError(e.cause) &&
			"code" in e.cause &&
			e.cause.code === "ECONNREFUSED"
		) {
			return `Could not connect to retriever server`;
		}
		return isNativeError(e) ? e.message : String(e);
	}
	const status = response.status;
	if (status !== 200) {
		return await response.text();
	}
	return (await response.json()) as Output;
}
