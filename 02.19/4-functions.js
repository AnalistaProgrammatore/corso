const V = [1, 2, 3, 4]

const map = (arr, f) => {
  const R = []
  for(let i = 0; i < arr.length; i++) {
    R[i] = f(arr[i])
  }
  return R
}

const double = arr => map(arr, x => x * 2)
console.log(double(V))
const sumTwo = arr => arr.map(x => x + 2)

const even = V.filter(x => x % 2 === 0)
const [one, two, ...rest] = V
const sumArray = rest.reduce(
  (a, x) => a + x, 
  0
)

console.log(sumArray)
