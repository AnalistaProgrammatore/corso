const tasks = []
function iterate(index) {
  if(index === tasks.length) {
    finish()
  }
  const task = tasks[index]
  task(() => {
    iterate(index + 1)
  })
}

function finish() {
  //itration completed
}

function eachSeries(tasksCollection, iteratorCallback, finalCallback) {}

iterate(0)