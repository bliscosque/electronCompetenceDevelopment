const fs = require('fs')
const fName='./utils/links.md'

function myLinks() {
    const tabLinks=document.getElementById('tab-links')

    fs.readFile(fName,'utf-8', (err, data) => {
        if (err) throw err;
        const allLines = data.split(/\r\n|\n/);
        // Reading line by line
        allLines.forEach((line) => {
            console.log(line);
            //#TODO Validar se linha contem |
            const partes=line.split('|')
            
            const row=document.createElement('tr')
            const cell1=document.createElement('td')
            cell1.innerHTML=partes[0].trim()
            row.appendChild(cell1)
            const cell2=document.createElement('td')
            cell2.innerHTML=partes[1].trim()
            row.appendChild(cell2)

            tabLinks.appendChild(row)
        });
    })




}

myLinks()