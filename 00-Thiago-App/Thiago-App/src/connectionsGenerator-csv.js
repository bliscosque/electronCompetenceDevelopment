const fs = require('fs');
const path = require('path');
const papa = require("papaparse");
const { PassThrough } = require('stream');
require ('dotenv').config({path: path.resolve(__dirname, '..','.env')})
let obsidian_path=process.env.OBSIDIAN_PATH||'/home/thiago/obsidian';
let folderDest=path.resolve(obsidian_path,'3-Ericsson', 'conScripts')
const fName=obsidian_path+"/3-Ericsson/connections.csv"
var content=fs.readFileSync(fName, "utf8");

let rows;

papa.parse(content, {
    header: true,
    complete: (results) => {
        //console.log(results);
        rows=results.data;
        console.log(rows)
    }
});

rows.forEach(row => {
    generateFile(row);
});

function generateFile(row) {
    if (row.Cliente==='' || row.Pais==='') return;
    let cliente=row.Cliente;
    let pais=row.Pais;
    let UID = row.UID;
    let RSG=row.RSG;
    let ssgName=row.SSGName;
    let ssgPass=row.SSGPass;
    let serverName=row.ServerName;
    let exp1=row.Exp1;
    let send1=row.Send1;
    let exp2=row.Exp2;
    let send2=row.Send2;
    let exp3=row.Exp3;
    let send3=row.Send3;
    let exp4=row.Exp4;
    let send4=row.Send4;
    let exp5=row.Exp5;
    let send5=row.Send5;
    let exp6=row.Exp6;
    let send6=row.Send6;
    let exp7=row.Exp7;
    let send7=row.Send7;
    
    //console.log(cliente, pais, UID, ssgPass, serverName, exp1, send1, exp2, send2, exp3, send3, exp4, send4, exp5, send5);

    const fileName=`${cliente}_${pais}_${serverName}.sh`;
    const fullFileName=path.resolve(folderDest, fileName);

    let content=`#!/usr/bin/expect -f
    set OTP [lindex $argv 0]
    set timeout -1
    spawn ssh ${UID}@${RSG}
    expect "OTP"
    send "$OTP\\r"
    expect "sao"
    send "ssh ${ssgName}\\r"
    expect "ass"
    send "${ssgPass}\\r"
    `;
    if (exp1!=='' && send1!=='') {
        content+=`expect "${exp1}"
    send "${send1}\\r"
    `;
    }
    if (exp2!=='' && send2!=='') {
        content+=`expect "${exp2}"
    send "${send2}\\r"
    `;
    }
    if (exp3!=='' && send3!=='') {
        content+=`expect "${exp3}"
    send "${send3}\\r"
    `;
    }
    if (exp4!=='' && send4!=='') {
        content+=`expect "${exp4}"
    send "${send4}\\r"
    `;
    }
    if (exp5!=='' && send5!=='') {
        content+=`expect "${exp5}"
    send "${send5}\\r"
    `;
    }
    if (exp6!=='' && send6!=='') {
        content+=`expect "${exp6}"
    send "${send6}\\r"
    `;
    }
    if (exp7!=='' && send7!=='') {
        content+=`expect "${exp7}"
    send "${send7}\\r"
    `;
    }
    content+=`interact`;

    fs.writeFileSync(fullFileName, content);

}