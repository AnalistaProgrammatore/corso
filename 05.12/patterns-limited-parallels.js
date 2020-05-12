const tasks = []
let completed = 0, concurrency = 2, running = 0, index = 0



function next() {
  function iterate() {
    if(completed === tasks.length) return finish()
    completed++
    running--
    next()
  }
  while(running < concurrency && index < tasks.length) {
    task = tasks[index++]
    task(iterate)
    running++
  }
}

function finish() {
  //all tasks finished
}
