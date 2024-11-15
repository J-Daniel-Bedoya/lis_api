const app = require("./app");
require("dotenv").config();
// const http = require("http");
// const socketIo = require("socket.io");

const PORT = process.env.PORT || 3000;
// const server = http.createServer(app);
// const io = socketIo(server);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el PORT: http://localhost:${PORT}`);
});
