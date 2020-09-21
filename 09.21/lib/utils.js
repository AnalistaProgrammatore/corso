const moment = require('moment')

const formatDate = date => moment(date).format('HH:mm | MMMM DD')

module.exports = {
  formatDate
}