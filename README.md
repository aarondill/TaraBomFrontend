<!-- This file is generated from README.tmpl.md -->
# TaraBomFrontend

This is a browser frontend for the [TaraBom](https://github.com/aarondill/TaraBOM) project.

## How to use

Install [Node.js](https://nodejs.org/en/download/) if you don't have it already.

- I would recommend using the pre-built binaries for your OS. (Use the msi installer for Windows)

Install dependencies:

```bash
npm install
```

Compile the project:

```bash
npm run build
```

Ensure that the [TaraBom](https://github.com/aarondill/TaraBOM/tree/master/TaraBom) Server is running.
By default, the Server is runs on [http://localhost:8080](http://localhost:8080). This can be changed in the environment file (`.env.local`).

Run the project.
If you are running the Server on a different address, you will need to set it in the environment:
You can also pass a different port as an argument (default is 3000):

```bash
npm run start [-p port]
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Lines of code
<sup><sub>Generated at commit f3d2e5ae9df739873d0317b24ffc4cc6f03c5bf1</sub></sup>
cloc|github.com/AlDanial/cloc v 1.98
--- | ---

Language|files|blank|comment|code
:-------|-------:|-------:|-------:|-------:
TypeScript|6|16|4|241
JSON|3|0|0|99
CSS|2|7|9|96
JavaScript|2|4|2|58
Markdown|3|25|1|58
INI|1|1|0|8
--------|--------|--------|--------|--------
SUM:|17|53|16|560
