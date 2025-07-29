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
