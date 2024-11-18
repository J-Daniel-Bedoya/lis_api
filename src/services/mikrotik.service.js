const MikroNode = require("mikronode");

const connectToMikroTik = async (ip, username, password) => {
  const device = new MikroNode(ip);
  const [login] = await device.connect();
  return login(username, password);
};

const openChannel = async (conn) => {
  const chan = conn.openChannel("action", false);
  chan.sync(true);
  chan.write("/interface/wireless/registration-table/print");
  return chan;
};

const getMikroTikData = async (ip, username, password) => {
  try {
    const conn = await connectToMikroTik(ip, username, password);
    const chan = await openChannel(conn);

    return new Promise((resolve, reject) => {
      chan.on("data", (data) => {
        resolve(data);
      });

      chan.on("error", (err) => {
        conn.close();
        reject(err);
      });
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getMikroTikData,
};
