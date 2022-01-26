// const btn = document.querySelector('.bntSendEmail')

function sendMsg() {
  // const button = event.currentTarget
  
  let msg = document.querySelector('#msg')

  if(msg.value == 0) {
    alert('Please, type or message')
  } else {
    alert('MESSAGE SENT!')
  }
  
  msg.value = ""
}