const { execFile } = require("child_process");
const path = require("path");

const vpns = [
  {
    vpnName: "VPN SV PALO-BLANCO",
    serverAddress: process.env.VPN_HOST_PALOB,
    username: process.env.VPN_USER,
    password: process.env.VPN_PASSWORD,
    sharedSecret: process.env.VPN_SHARED_SECRET,
  },
];

const connectVPN = (vpnConfig) => {
  const scriptPath = path.resolve(__dirname, "connect-vpn.ps1");
  execFile(
    "powershell.exe",
    [
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      scriptPath,
      "-vpnName",
      vpnConfig.vpnName,
      "-serverAddress",
      vpnConfig.serverAddress,
      "-username",
      vpnConfig.username,
      "-password",
      vpnConfig.password,
      "-sharedSecret",
      vpnConfig.sharedSecret,
    ],
    (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Error connecting to VPN ${vpnConfig.vpnName}: ${error.message}`
        );
        return;
      }
      if (stderr) {
        console.error(`VPN ${vpnConfig.vpnName} stderr: ${stderr}`);
        return;
      }
      console.log(`VPN ${vpnConfig.vpnName} stdout: ${stdout}`);
    }
  );
};

const disconnectVPN = (vpnName) => {
  const scriptPath = path.resolve(__dirname, "disconnect-vpn.ps1");
  execFile(
    "powershell.exe",
    ["-ExecutionPolicy", "Bypass", "-File", scriptPath, "-vpnName", vpnName],
    (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Error disconnecting from VPN ${vpnName}: ${error.message}`
        );
        return;
      }
      if (stderr) {
        console.error(`VPN ${vpnName} stderr: ${stderr}`);
        return;
      }
      console.log(`VPN ${vpnName} stdout: ${stdout}`);
    }
  );
};

const connectAllVPNs = () => {
  vpns.forEach(connectVPN);
};

const disconnectAllVPNs = () => {
  vpns.forEach((vpn) => disconnectVPN(vpn.vpnName));
};

module.exports = {
  connectAllVPNs,
  disconnectAllVPNs,
};
