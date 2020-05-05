function warning(message) {
  console.log('warning', message)
}

module.exports = message => {
  if(message.includes('warning')) return warning(message)
  console.log('info: ', message)
}

module.exports.warning = warning