import cp from "node:child_process";
import fs from "node:fs/promises";
import { styleText } from "node:util";
const THROTTLE_MS = 1000;
const [, , cmd, dir] = process.argv;
if (!cmd || !dir) {
	console.error("Usage: node watch.mjs cmd dir");
	process.exit(1);
}

let proc;
function spawn() {
	proc?.kill();
	proc = cp.spawn(cmd, { shell: true, stdio: "inherit", windowsHide: true });
}

let last = new Date();

console.log("Watching for changes in", dir);
const watcher = fs.watch(dir, { recursive: true });
spawn(); // spawn on startup
for await (const event of watcher) {
	const { eventType, filename } = event;
	if (eventType !== "change") continue;
	const throttled = new Date() - last < THROTTLE_MS;
	console.log(
		styleText(
			["green", "bold", "italic"],
			`${new Date().toLocaleTimeString()}: ${eventType}: ${filename ?? "(unknown)"}` +
				(throttled ? " (throttled)" : "")
		)
	);
	if (throttled) continue;
	last = new Date();
	spawn();
}
