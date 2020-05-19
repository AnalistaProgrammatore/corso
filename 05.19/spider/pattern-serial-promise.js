const tasks = []
let promise = Promise.resolve()
tasks.forEach(task => {
  promise = promise.then(() => task())
})

promise.then(() => {
  //All tasks completed
})

let promise = tasks.reduce((prev, task) => prev.then(() => task()), Promise.resolve())

promise.then(() => {
  //All tasks completed
})