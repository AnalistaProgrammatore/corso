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
    return this.store.length
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

const stack = new Stack()

stack.push('Marco')
stack.push('Davide')
stack.push('Simone')
stack.push('Francesco')
stack.push('Luca')

console.log('lunghezza stack', stack.length())
console.log('pop elemento', stack.pop())

stack.push('Matteo')

console.log('testa dello stack', stack.peek())
stack.clear()
console.log('testa dello stack', stack.peek())

