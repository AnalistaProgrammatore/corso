/** ABSTRACT DATA TYPE STACK 
 * @property store -> array degli elementi dello stack
 * @property top -> posizione della testa dello stack
 * @method push -> inserisce un elemento nella lista
 * @method pop -> recupera e rimuove l'elemento dalla testa della lista
 * @method peek -> recupera l'elemento dalla testa dello stack
 * @method length -> grandezza dello stack
 * @method clear -> resetta il puntatore alla testa dello stack
*/
class Stack {
  constructor() {
    this.store = []
    this.top = 0
  }

  length() {
    return this.top
  }
 
  clear() {
    this.top = 0
  }

  push(data) {
    this.store[this.top++] = data
  }

  pop() {
    return this.store[--this.top]
  }

  peek() {
    return this.store[this.top === 0 ? this.top : this.top - 1]
  }
}

const factRecursive = n => {
  if(n === 0) return 1
  return n * factRecursive(n-1)
}

const factorialStack = n => {
  const stack = new Stack()
  while(n > 1) {
    stack.push(n--)
  }
  let result = 1
  while(stack.length() > 0) {
    result *= stack.pop()
  } 
  return result
}


console.log(factRecursive(5), factorialStack(5))