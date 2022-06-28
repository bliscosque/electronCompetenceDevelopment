const db=require('electron-db')
const path=require('path')
const dir=path.join(__dirname,'')

//createDB()
//inputDB()
searchDB()

//creating DB
function createDB() {
    db.createTable('stocks', dir, (success,msg) => {
        if (success) console.log(msg)   
        else console.log("Error:" + msg)
    })
}

//inserindo dados
function inputDB() {
    let obj=new Object()
    obj.symbol="AAPL"
    obj.name="Apple"

    if (db.valid('stocks', dir)) {
        db.insertTableContent('stocks', dir, obj, (succ,msg) => {
            console.log(succ + " " + msg)
        })
    }
}

//lendo dados
function searchDB(term) {
    //let term="p"
    document.getElementById("container").innerHTML=null
    db.search('stocks', dir, 'name', term.value, (succ,data) => {
        if (succ) {
            //console.log(data)
            //console.log(data[0].name)
            document.getElementById("aktien").innerHTML = (data.length)

            //construindo a tabela
            let table=document.createElement("table")
            let row=table.insertRow()
            for (let i = 0;i<data.length;i++) {
                let cell1=row.insertCell()
                cell1.innerHTML=data[i].symbol
                let cell2=row.insertCell()
                cell2.innerHTML=data[i].name
                let cell3=row.insertCell()
                cell3.innerHTML = ('<a class="button is-small is-primary" onclick="showData(\'' + data[i].symbol + '\')">Chart</a>')
                let next=i+1
                if(next!=data.length) {
                    row=table.insertRow()
                }
            }

            document.getElementById("container").appendChild(table)
        }
    })
}