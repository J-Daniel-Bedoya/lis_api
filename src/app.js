const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const handleError = require("./middlewares/error");
const towerRoutes = require("./routes/towerRoutes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

db.authenticate()
  .then(() => console.log("Autenticación exitosa"))
  .catch((err) => console.log(err));

db.sync({ alter: true })
  .then(() => console.log("Conexión exitosa"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json("Respuesta exitosa");
});

app.use("/api", towerRoutes);

app.use(handleError);
module.exports = app;
