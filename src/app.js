const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const handleError = require("./middlewares/error");
const initModels = require("./models/initModels");
const { SectorRoutes, TowerRoutes } = require("./routes");
const { connectAllVPNs, disconnectAllVPNs } = require("./vpn");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

initModels();

db.authenticate()
  .then(() => console.log("Autenticación exitosa"))
  .catch((err) => console.log(err));

db.sync({ alter: true })
  .then(() => console.log("Conexión exitosa"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json("Respuesta exitosa");
});

app.use("/api", TowerRoutes);
app.use("/api", SectorRoutes);

app.use(handleError);

// Ruta para conectar todas las VPNs
app.post("/api/connect-vpns", (req, res) => {
  connectAllVPNs();
  res.status(200).json({ message: "Todas las VPNs han sido conectadas" });
});

// Ruta para desconectar todas las VPNs
app.post("/api/disconnect-vpns", (req, res) => {
  disconnectAllVPNs();
  res.status(200).json({ message: "Todas las VPNs han sido desconectadas" });
});

module.exports = app;
