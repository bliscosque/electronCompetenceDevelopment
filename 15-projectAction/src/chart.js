const alpha = require('alphavantage')({key:'IKB5O5JM9AT7KR9P'})


function showData(symbol) {
    document.getElementById('chart').innerHTML='<button class="button is-loading">loading</button>'
    alpha.data.daily(symbol).then(data=> {
        let tempDataStore = []
        let tSeries=data['Time Series (Daily)']
        for (let tempData in tSeries) {
            tempDataStore.push(tSeries[tempData]['4. close'])
        }
        document.getElementById('chart').innerHTML=tempDataStore[0]
    })
}