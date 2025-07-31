<!-- This file is generated from README.tmpl.md -->
# TaraBomFrontend

This is a browser frontend for the [TaraBom](https://github.com/aarondill/TaraBOM) project.

## How to use

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
<sup><sub>Generated at commit cbd3f20ef1576966a7c84caca66168829fd62525</sub></sup>
cloc|github.com/AlDanial/cloc v 1.98
--- | ---

Language|files|blank|comment|code
:-------|-------:|-------:|-------:|-------:
JSON|3|0|0|75
JavaScript|2|2|47|29
Markdown|2|9|0|23
INI|1|1|0|8
--------|--------|--------|--------|--------
SUM:|8|12|47|135
