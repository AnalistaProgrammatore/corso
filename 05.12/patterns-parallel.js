const tasks = []
let completed = 0, hasErrors = false

function done(err) {
  if(err) {
    hasErrors = true
    return finish(err)
  }
  completed += 1
  if(completed === links.length && !hasErrors) {
    finish()
  }
}

tasks.forEach(task => {
  task(done)
})

function finish() {
  //all the tasks completed
}

function eachParallels(taks, iteratorCallback, finishCallback) {}