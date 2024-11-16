const MikroNode = require("mikronode");

const getMikroTikData = async (ip, username, password) => {
  return new Promise((resolve, reject) => {
    const device = new MikroNode(ip);
    device
      .connect()
      .then(([login]) => {
        login(username, password)
          .then((conn) => {
            const chan = conn.openChannel("action", false);
            chan.sync(true);

            const data = []; // Array para almacenar los datos

            chan
              .write("/interface/wireless/registration-table/print")
              .then((results) => {
                const formatted = MikroNode.resultsToObj(results.data);

                if (Array.isArray(formatted)) {
                  // Solo agregar a `data` si `formatted` es un array
                  data.push(...formatted);
                } else {
                  console.error(
                    "Error: 'formatted' is not an array",
                    formatted
                  );
                }
              })
              .catch((error) =>
                console.error("Error during action sequence:", error)
              );

            // Evento "done" para resolver la promesa con los datos recolectados
            chan.on("done", () => {
              conn.close();
              resolve(data);
            });

            // Evento "error" para manejar errores y rechazar la promesa
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
