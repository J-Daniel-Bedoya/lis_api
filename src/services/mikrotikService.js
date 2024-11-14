const MikroNode = require("mikronode");

async function getMikroTikData(ip, username, password) {
  return new Promise((resolve, reject) => {
    const device = new MikroNode(ip);
    device
      .connect()
      .then(([login]) => {
        login(username, password)
          .then(async (conn) => {
            const chan = conn.openChannel();
            chan.write("/interface/print"); // Puedes modificar esto para obtener la info específica
            const data = [];

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
}

module.exports = {
  getMikroTikData,
};
