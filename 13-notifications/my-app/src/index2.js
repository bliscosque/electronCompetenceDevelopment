/*const notificacao= new Notification('titulo',{
    body: 'sou a notificacao'
  })
  
  notificacao.onclick=()=> {
    alert('notificacao clicada')
  }
*/

let timer
function startWecker() {
    timer = setInterval(wecker,1000)
}

function wecker() {
    const weckerHora=(document.getElementById('hora'))
    const weckerMinuto=(document.getElementById('minuto'))
    const weckerNoticia=(document.getElementById('notificacao'))

    let hoje=new Date()
    let hora=hoje.getHours();
    let minute=hoje.getMinutes();
    let segundos=hoje.getSeconds();

    console.log(hora,minute,segundos)

    if(minute==weckerMinuto.value && hora==weckerHora.value) {
        const notificacao= new Notification('horario!!!',{
            body: weckerNoticia.value,
          })
          
          clearInterval(timer)
    }

}

function stopWecker() {
    clearInterval(timer)
}