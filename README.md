<!-- This file is generated from README.tmpl.md -->
# TaraBomFrontend

This is a browser frontend for the [TaraBom](https://github.com/aarondill/TaraBOM) project.

## How to use

Compile the project (or download the compiled version from the [releases](https://github.com/aarondill/TaraBOMFrontend/releases) page):

```bash
npm run build # result is in ./dist/server.js
```

Ensure that the [TaraBom](https://github.com/aarondill/TaraBOM/tree/master/TaraBom) Server is running.
By default, the Server is runs on [http://localhost:8080](http://localhost:8080). This can be changed in the configuration file (`bom_retriever.ini`).

Run the project.
If you are running the Server on a different address, you will need to pass it as an argument:
You can also pass a different port as an argument (default is 3000):

```bash
node ./server.js [TaraBomServerAddress] [port]
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
