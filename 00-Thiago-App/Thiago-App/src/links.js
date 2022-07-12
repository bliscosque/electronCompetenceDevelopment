const fs = require('fs')
const {shell}=require('electron')
const fName='./utils/links.md'

function myLinks() {
    const tabLinks=document.getElementById('tab-links')

    fs.readFile(fName,'utf-8', (err, data) => {
        if (err) throw err;
        const allLines = data.split(/\r\n|\n/);
        // Reading line by line
        allLines.forEach((line) => {
            console.log(line);
            if (line.includes('|')) {
                const partes=line.split('|')
                
                const row=document.createElement('tr')
                const cell1=document.createElement('td')

                const link=document.createElement('a')
                link.setAttribute("href", "#")
                link.setAttribute("onclick","openE(\""+partes[1].trim()+"\")")
                link.innerText=partes[0].trim()
                link.className="linkExt"
                cell1.appendChild(link)
                row.appendChild(cell1)

                const cell2=document.createElement('td')
                cell2.innerHTML=partes[1].trim()
                row.appendChild(cell2)

                tabLinks.appendChild(row)
            }
        });
    })

}

myLinks()

function openE(url) {
    console.log(url)
    shell.openExternal(url)
}