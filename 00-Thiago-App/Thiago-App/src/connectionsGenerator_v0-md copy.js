const fs = require('fs')
let obsidian_path=process.env.OBSIDIAN_PATH||'/home/thiago/obsidian';
const fName=obsidian_path+"/3-Ericsson/connections.md"


fs.readFile(fName,'utf-8', (err, data) => {
    if (err) throw err;
    const allLines = data.split(/\r\n|\n/);
    // Reading line by line
    let cliente, pais, ssg_pass;
    allLines.forEach((line) => {
        if (line.trim()==="") {}
        else if (line.startsWith("##")) {
            console.log('pais: ' + line);
            let linhaTrat=line.slice(2, )
        }
        else if (line.startsWith("#")) {
            console.log('cliente: ' + line);
            cliente = line.slice(1).trim();
            console.log(cliente);
        }
        else if (line.includes('|')) {
            console.log('conn_str: ' + line)
        }
    })
})