const aedes = require('aedes')();
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const port = 8000;

ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(port, () => {
    console.log(`Websocket server listening on port ${port}`);
});