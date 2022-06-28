const {ipcRenderer} = require('electron')

dbCount()

//creating DB
    /* db.createTable('noti', dir, (success,msg) => {
        if (success) console.log(msg)   
        else console.log("Error:" + msg)
    }) */



function notify(symbol) {
    ipcRenderer.send('window', symbol)
}
    

//inserindo dados
function inputNoti() {
    let obj=new Object()
    obj.symbol=document.getElementById("stocksymbol").value
    obj.minvalue=document.getElementById("minvalue").value
    obj.maxvalue=document.getElementById("maxvalue").value

    if (db.valid('notis', dir)) {
        db.insertTableContent('notis', dir, obj, (succ,msg) => {
            console.log(succ + " " + msg)
        })
        searchNoti()
    }
}

//lendo dados
function searchNoti() {
    let term=""
    document.getElementById("liste").innerHTML=null
    db.search('notis', dir, 'symbol', term, (succ,data) => {
        if (succ) {
            //construindo a tabela
            let table=document.createElement("table")
            let row=table.insertRow()
            for (let i = 0;i<data.length;i++) {
                let cell1=row.insertCell()
                cell1.innerHTML=data[i].symbol
                let cell2=row.insertCell()
                cell2.innerHTML=data[i].minvalue
                let cell3=row.insertCell()
                cell3.innerHTML=data[i].maxvalue
                let cell4=row.insertCell()
                cell4.innerHTML = ('<a class="button is-small is-danger" onclick="delNoti(\'' + data[i].id + '\')">X</a>')
                let next=i+1
                if(next!=data.length) {
                    row=table.insertRow()
                }
            }

            document.getElementById("liste").appendChild(table)
        }
    })
}

function delNoti(id) {
    var integer=parseInt(id,10)
    db.deleteRow('notis',dir,{'id': integer}, (succ,msg) => {
        console.log(msg)
    })
    searchNoti()
}

function dbCount() {
    db.count('notis', dir, (succ, data) => {
        document.getElementById('noticount').innerHTML=(data)
    })
}