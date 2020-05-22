function *baz() {
  yield 'hello baz'
}

function *foo() {
  try {
    const x = yield 1
    const y = yield 2
    const z = yield 3
    console.log(x, y, z)
  } catch(err) {
    throw err
  }
  yield *baz()
  
}

function *bar() {
  const x = yield *foo()
  yield x
}

const barIterator = bar()

console.log(barIterator.next())
console.log(barIterator.next('foo'))
console.log(barIterator.next('bar'))
console.log(barIterator.next())
console.log(barIterator.next())
console.log(barIterator.next())

function *randomGenerator(limit = 10) {
  let count = 0
  while(true) {
    if(count === limit) return
    count++
    yield Math.random() * 100
  }
}

const random = randomGenerator(20)
for(const number of random) {
  console.log(number)
}

console.log(random.next())
