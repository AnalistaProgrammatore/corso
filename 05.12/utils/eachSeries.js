function eachSeries(tasks, iterator, done) {
  function iterate(index) {
    if(index === tasks.length) return done()
    const task = tasks[index]
    iterator(task, err => {
      if(err) return callback(err)
      iterate(index + 1)
    })
  }
  iterate(0)
}

module.exports = eachSeries