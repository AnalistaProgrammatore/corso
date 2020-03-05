const someBase = function(arr, callback) {
  for(let i = 0; i < arr.length; i++) {
    const result = callback(arr[i])
    if(result) return true
  }
  return false
}

const someReduce = function(arr, callback) {
  return arr.reduce((acc, cur) => {
    if(acc) return acc
    return callback(cur)
  }, false)
}

const myCallback = x => x > 15
const A = [1, 2, 3, 4, 5]
console.log(someReduce(A, myCallback))