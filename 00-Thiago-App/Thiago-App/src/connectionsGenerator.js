const fs = require('fs')
let obsidian_path=process.env.OBSIDIAN_PATH;
const fName=obsidian_path+"/3-Ericsson/connections.md"

fs.readFile(fName,'utf-8', (err, data) => {
    if (err) throw err;
    const allLines = data.split(/\r\n|\n/);
    // Reading line by line
    allLines.forEach((line) => {
        if (line.trim()==="") {}
        else if (line.startsWith("##")) {
            console.log('pais: ' + line);
        }
        else if (line.startsWith("#")) {
            console.log('cliente: ' + line);
        }
        else if (line.includes('|')) {
            console.log('conn_str: ' + line)
        }
    })
})