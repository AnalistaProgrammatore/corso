const A = [1, 2, 3, 4, 5, 6, 8]
const myForEach = function(arr, callback) {
  for(let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr)
  }
}

const myForMap = function(arr, callback) {
  let toReturn = []
  for(let i = 0; i < arr.length; i++) {
    toReturn = [
      ...toReturn,
      ...[callback(arr[i], i, arr)]
    ]
  }
  return toReturn
}

const B = A.map(x => x)
console.log(B)
//myForEach(A, (x, i) => console.log(x, i))
//myForEach(A, (x, i, a) => console.log(x, i, a))
const sum = B.reduce((accumulator, x) => {
  return {
    array: [...[x], ...accumulator.array],
    sum: accumulator.sum + x
  }
}, { array: [], sum: 0 })

const even = B.filter(x => x%2 !== 0)
console.log(even)

const isBiggerThen = B.every(x => x > 6)
console.log(isBiggerThen)

const range = (start, stop, step) => {
  return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
}

// Generate numbers range 0..4
console.log(range(0, 4, 1));