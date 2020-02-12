
const opGenerator = function(symbol) {
  switch(symbol) {
    case '+':
      return (x, y) => x + y; 
    case '-':
      return (x, y) => x - y;
    case '*':
      return (x, y) => x * y;
    case '/':
      return (x, y) => x / y;
  }
}

const calculator = function(symbol, x, y) {
  const operation = opGenerator(symbol)
  return operation(x, y)
}

let result = calculator('+', 12, 13)
console.log(result)