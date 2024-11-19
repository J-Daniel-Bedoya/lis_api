const openvpnmanager = require("node-openvpn");
const path = require("path");

// Configuración del cliente OpenVPN
const vpnConfig = {
  host: process.env.VPN_HOST_PALOB,
  port: process.env.VPN_PORT,
  timeout: 1500, // Tiempo de espera
  config: path.resolve(__dirname, "path/to/your/vpn/config.ovpn"), // Ruta al archivo de configuración OpenVPN
  user: process.env.VPN_USER,
  pass: process.env.VPN_PASSWORD,
};

let vpn = null;

// Función para conectar la VPN
const connectVPN = () => {
  console.log("Iniciando conexión VPN...");
  vpn = openvpnmanager.connect(vpnConfig);

  // Manejo de eventos de la conexión
  vpn.on("connected", () => {
    console.log("VPN conectada exitosamente.");
  });

  vpn.on("disconnected", () => {
    console.error("VPN desconectada. Intentando reconectar...");
    reconnectVPN();
  });

  vpn.on("error", (error) => {
    console.error("Error en la conexión VPN:", error);
  });

  vpn.on("console-output", (output) => {
    console.log("Output VPN:", output);
  });
};

// Función para reconectar si se desconecta
const reconnectVPN = () => {
  console.log("Reintentando conexión VPN...");
  setTimeout(() => {
    connectVPN();
  }, 5000); // Espera 5 segundos antes de reconectar
};

// Función para desconectar manualmente la VPN
const disconnectVPN = () => {
  if (vpn) {
    vpn.disconnect();
    console.log("VPN desconectada manualmente.");
  } else {
    console.log("No hay conexión VPN activa.");
  }
};

// Inicia la VPN automáticamente al cargar el servidor
connectVPN();

module.exports = {
  connectVPN,
  disconnectVPN,
};
