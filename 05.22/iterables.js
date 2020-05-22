function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start
  let iterationCount = 0

  const iterator = {
    [Symbol.iterator]: function() {
      return this
    },
    next: function() {
      let result
      if(nextIndex < end) {
        result = { value: nextIndex, done: false }
        nextIndex += step
        iterationCount++
        return result
      }
      return { value: iterationCount, done: true }
    }
  }

  return iterator
}

const Fib = {
  [Symbol.iterator]() {
    let n1 =  1, n2 = 1
    return {
      next() {
        const current = n2
        n2 = n1
        n1 = n1 + current
        return { value: current, done: false }
      },
      return() {
        console.log('fibonacci series ended')
        return { value: undefined, done: true }
      }
    }
  }
}

const makeTasksQueue = (...args) => {
  return {
    actions: [],
    [Symbol.iterator]() {
      const queue = [...this.actions]
      return {
        next() {
          if(queue.length === 0) return { done: true }
          const task = queue.shift()
          return { value: task(...args), done: false }
        },
        return() {
          queue.length = 0
          return { done: true }
        }
      }
    }
  }
}

const tasksQueue = makeTasksQueue(10, 20, 30)
tasksQueue.actions.push(
  x => x * 2,
  (x, y) => x + y,
  (x, y, z) => x + y + z
)

const secondTaksQueue = makeTasksQueue(40, 50, 60)
secondTaksQueue.actions.push(
  x => x * 10,
  (x, y) => x * y,
  (x, y, z) => x * y * z
)

const mergedQueue = [...secondTaksQueue, ...tasksQueue]

for(const value of mergedQueue) {
  console.log(value)
}

