const fs = require('fs');
const path = require('path');

function load(app, dir, anx = true) {
    const directory = path.join(_path, dir);
    const label = path.basename(dir);
    const list = fs.readdirSync(directory);
    for (let i = 0; i < list.length; i++) {
        const file = list[i];
console.log(`------------------ ${directory}/${file}`);
        if (fs.statSync(`${directory}/${file}`).isDirectory()) {
            load(app, label, path.join(dir, file));
        } else {
            if (file.endsWith('.js')) {
                if (anx) {
                    if (!app[label]) {
                        app[label] = {};
                    }
                    const label2 = path.basename(file, '.js');
                    app[label][label2] = require(`${directory}/${file}`)(app);
                } else {
                    if (file.endsWith('.js') && !file.endsWith('-val.js')) {
                        require(`${directory}/${file}`)(app);
                    }
                }
            }
        }
    }
}

module.exports = load;
