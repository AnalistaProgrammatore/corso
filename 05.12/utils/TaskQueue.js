class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.tasks = []
  }

  push(task) {
    this.tasks.push(task)
    this.next()
  }

  next() {
    function iterate() {
      this.running--
      this.next()
    }
    while(this.running < this.concurrency && this.tasks.length > 0) {
      const task = this.tasks.shift()
      task(iterate)
      this.running++
    }
  }
}

module.exports = TaskQueue