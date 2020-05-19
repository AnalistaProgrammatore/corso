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

    while(this.running < this.concurrency && this.tasks.length > 0) {
      const task = this.tasks.shift()
      task().then(() => {
        this.running--;
        this.next()
      })
      this.running++
    }
  }
}

module.exports = TaskQueue