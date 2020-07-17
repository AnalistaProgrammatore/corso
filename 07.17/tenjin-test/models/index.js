const Course = require('./Course')

module.exports = {
  courses: Course.getInstance('courses')
}