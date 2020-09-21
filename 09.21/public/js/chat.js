(function(){
  const incomingMessageTemplate = (message) => `
    <div class="incoming_msg">
      <div class="incoming_msg_img"> <img src="${message.avatar}" alt="sunil"> </div>
      <div class="received_msg">
        <div class="received_withd_msg">
          <p>${message.text}</p>
          <span class="time_date"> ${message.date}</span></div>
      </div>
    </div>
  `
  const outgoingMessageTemplate = (message) => (
    `
    <div class="outgoing_msg">
      <div class="sent_msg">
        <p>${message}</p>
        <span class="time_date"> 11:01 AM    |    June 9</span> </div>
    </div>
    `
  )

  const ws = new WebSocket(`ws://${window.document.location.host}`)
  document.addEventListener('DOMContentLoaded', () => {
    const sendButtonEl = document.getElementById('msgSend')
    const messageEl = document.getElementById('msgBox')
    sendButtonEl.addEventListener('click', sendMessage)
    messageEl.addEventListener('keyup', event => {
      if(event.key !== 'Enter') return
      sendMessage()
    })
  })

  ws.onmessage = createIncomingMessage //SUBSCRIBER

  function createIncomingMessage(message) {
    const messageContainerEl = document.getElementById('messages')
    const newMessageEl = document.createElement('div')
    const messageObj = JSON.parse(message.data)
    newMessageEl.innerHTML = incomingMessageTemplate(messageObj)
    messageContainerEl.appendChild(newMessageEl)
  }

  function createOutgoingMessage (message) {
    const messageContainerEl = document.getElementById('messages')
    const newMessageEl = document.createElement('div')
    newMessageEl.innerHTML = outgoingMessageTemplate(message)
    messageContainerEl.appendChild(newMessageEl)
  }

  function sendMessage() {
    const messageEl = document.getElementById('msgBox')
    const message = messageEl.value
    if(!message) return
    ws.send(message) // PUBLISHER
  }

  
}())