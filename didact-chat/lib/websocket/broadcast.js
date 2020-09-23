const { formatDate } = require('../utils')
module.exports = wss => msg => {
  wss.clients.forEach(client => {
    msgObject = {
      text: msg,
      date: formatDate(new Date()),
      avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png'
    }
    client.send(JSON.stringify(msgObject))
  })
}