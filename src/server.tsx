import express, { RequestHandler } from "express";
import { renderToPipeableStream } from "react-dom/server";
import { App } from ".";

const handler: RequestHandler = (req, res) => {
	const { id } = req.params;
	const stream = renderToPipeableStream(<App id={id} />, {
		// Use onShellReady instead to load faster, and show loading indicators (This requires JS on the client)
		onAllReady() {
			clearTimeout(timeout);
			stream.pipe(res.status(200).setHeader("Content-Type", "text/html"));
		},
		onError(error) {
			const message = String(
				error && typeof error === "object" && "message" in error
					? error.message
					: error
			);
			res
				.status(500)
				.send(`<!doctype html><p>An error occurred:</p><pre>${message}</pre>`);
		},
	});
	const timeout = setTimeout(stream.abort, 20_000); // give up if it takes too long (20 seconds)
};

const port = 3000;
express()
	// .use("/public", express.static("public"))
	.use("/favicon.ico", (_req, res) => res.sendStatus(404)) // don't render for favicon.ico (auto-requested by browser)
	.get("/search", function (req, res) {
		const { id = "" } = req.query;
		if (id && typeof id !== "string") {
			res.statusCode = 400;
			res.send("id must be a string");
			return;
		}
		res.redirect(`/${id}`);
	})
	.get("/", handler)
	.get("/:id", handler)
	.listen(port, () => {
		console.log(`listening on port http://localhost:${port}`);
	});
