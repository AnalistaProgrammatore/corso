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

const base2Converter = number => {
  const stack = new Stack()
  let binaryString = ''
  let rem
  while(number > 0) {
    rem = Math.floor(number % 2)
    stack.push(rem)
    number = Math.floor(number / 2)
  }

  while(stack.length() > 0) {
    binaryString += stack.pop()
  }

  return binaryString
}

console.log(base2Converter(10))