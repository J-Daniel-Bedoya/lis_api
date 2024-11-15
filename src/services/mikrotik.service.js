const MikroNode = require("mikronode");

const getMikroTikData = async (ip, username, password) => {
  return new Promise((resolve, reject) => {
    const device = new MikroNode(ip);
    device
      .connect()
      .then(([login]) => {
        login(username, password)
          .then((conn) => {
            // conn.closeOnDone(true);

            const chan = conn.openChannel("action", false);
            chan.sync(true);
            chan
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
              .catch((error) =>
                console.error("Error during action sequence:", error)
              );

            chan.on("done", (parsedData) => {
              data.push(...parsedData);
              conn.close();
              resolve(data);
            });

            chan.on("error", (err) => {
              conn.close();
              reject(err);
            });
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

module.exports = {
  getMikroTikData,
};
