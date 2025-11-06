const ascii = require('ascii-table');
const fs = require('fs');
const path = require('path');

function loadEvents(client) {
    const table = new ascii().setHeading("Events", "Status");

    // Obtener carpetas en el directorio "./Events"
    const foldersPath = path.join(__dirname, '../Events');
    const folders = fs.readdirSync(foldersPath); // Cambiado a readdirSync

    for (const folder of folders) {
        // Obtener archivos dentro de cada carpeta
        const filesPath = path.join(foldersPath, folder);
        const files = fs.readdirSync(filesPath).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const event = require(path.join(filesPath, file));
            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, (...args) => event.execute(...args, client)); // Cambiado ClientRequest a client
                } else {
                    client.rest.on(event.name, (...args) => event.execute(...args, client)); // Cambiado ClientRequest a client
                }
            } else {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            }
            table.addRow(file, "Loaded");
        }
    }

    console.log(table.toString(), "\nLoaded Events");
}

module.exports = { loadEvents };
