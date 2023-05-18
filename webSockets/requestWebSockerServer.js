const WebSocketServer = require("websocket").server;
const http = require("http");
const Keys = require("../privateKeys/privateKeys");

// creating server
const SERVER = http.createServer();
// creating websocket server
const wsServer = new WebSocketServer({
  httpServer: SERVER,
});

const connections = []; // Array to store all active connections

wsServer.on("request", function (request) {
  console.log("WebSocket connection requested");

  const connection = request.accept(null, request.origin);
  console.log("WebSocket connection accepted");

  connections.push(connection); // Add the new connection to the array

  connection.on("message", (message) => {
    if (message.utf8Data) {
      connections.forEach(function (client) {
        client.sendUTF(message.utf8Data); // Broadcast the message to all connected clients
      });
    } else {
      console.log(false);
    }
  }); 

  connection.on("close", function (reasonCode, description) {
    console.log("WebSocket connection closed");
    const index = connections.indexOf(connection);
    if (index !== -1) {
      connections.splice(index, 1); // Remove the closed connection from the array
    }
  });
});

SERVER.listen(Keys.WEB_SOCKET_PORT);
