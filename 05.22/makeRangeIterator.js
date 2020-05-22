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

function *makeRangeGenerator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0
  for(let i = start; i < end; i += step) {
    iterationCount++
    yield i
  }
  return iterationCount
}

const range = makeRangeGenerator(1, 20, 2)
for(const number of range) {
  console.log(number)
}