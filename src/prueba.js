const MikroNode = require("mikronode");

// Conectar al dispositivo
const device = new MikroNode("10.40.8.110");

const USER = "Administrador2024";
const PASSWORD = "%JuTrJr.E!bo@To~=Kn2A2yMNbdY1e";

device
  .connect()
  .then(([login]) => login(USER, PASSWORD))
  .then((conn) => {
    console.log("Logged in.");

    // Configura `closeOnDone` para cerrar cuando todos los canales terminen
    conn.closeOnDone(true);

    // Canal para ejecutar acciones de configuración
    const actionChannel = conn.openChannel("action", false);
    actionChannel.sync(true);

    // Obtener todas las interfaces
    actionChannel
      .write("/interface/wireless/registration-table/print")
      .then((results) => {
        const formatted = MikroNode.resultsToObj(results.data);
        console.log("Wireless Users Connected:");
        formatted.forEach((user) => {
          const name = `User ${user["radio-name"]}:`;
          const mac = `  MAC Address: ${user["mac-address"]}`;
          const ip = `  IP: ${user["last-ip"]}`;
          const signal = `  Signal Strength: ${user["signal-strength"]}`;
          const time = `  Time Connected: ${user["uptime"]}`;

          console.log(name, mac, ip, signal, time);
        });
      })
      .catch((error) => console.error("Error during action sequence:", error))
      .finally(() => {
        // Cerrar el canal después de las operaciones
        actionChannel.close();
      });

    actionChannel
      .write("/interface/monitor-traffic", { interface: "wlan1", once: true })
      .then((res) => {
        const format = MikroNode.resultsToObj(res.data);
        console.log("Leyendo tráfico en wlan1:");
        format.forEach((int) => {
          const rxMbps = (int["rx-bits-per-second"] / 1_000_000).toFixed(2); // Conversión a Mbps
          const txMbps = (int["tx-bits-per-second"] / 1_000_000).toFixed(2); // Conversión a Mbps
          console.log(`Tráfico en wlan1: TX=${txMbps} Mbps, RX=${rxMbps} Mbps`);
        });
      })
      .catch((error) => console.error("Error al leer el tráfico:", error))

      .finally(() => {
        // Cerrar el canal después de las operaciones
        actionChannel.close();
      });
  })
  .catch((error) => console.error("Error connecting or logging in:", error));
