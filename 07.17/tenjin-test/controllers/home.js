const MAX_VIEW_COURSES = 3

module.exports = {
  get: (req, res, next) => {
    try {
      const courses = require('../models').courses
      courses.read()
        .then(foundedCourses => {
          console.log(foundedCourses)
          const coursesArray = Object.keys(foundedCourses).reduce((acc, courseId) => {
            return [ ...acc, { id: courseId, ...foundedCourses[courseId]} ]
          }, [])
          const viewCourses = []
          let j = -1;
          for(i = 0; i < coursesArray.length; i++) {
            if(i % MAX_VIEW_COURSES === 0) {
              viewCourses[i] = []
              j += 1
            }
            viewCourses[j].push(coursesArray[i])
          }
          console.log(viewCourses)
          res.render('home', { courses: viewCourses })
        })
        .catch(err => next(err))
    } catch(err) {
      return next(err)
    }
  }
}