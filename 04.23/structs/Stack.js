class Stack {
  constructor(maxSize) {
     if (isNaN(maxSize)) {
        maxSize = 10
     }
     this.maxSize = maxSize;
     this.container = []
  }
  display() {
     console.log(this.container)
  }
  isEmpty() {
     return this.container.length === 0
  }
  isFull() {
     return this.container.length >= this.maxSize
  }
  push(element) {
     if (this.isFull()) {
        console.log("Stack Overflow!") 
        return
     }
     this.container.push(element)
  }
  pop() {
     if (this.isEmpty()) {
        console.log("Stack Underflow!") 
        return
     }
     this.container.pop()
  }
  peek() {
     if (isEmpty()) {
        console.log("Stack Underflow!")
        return
     }
     return this.container[this.container.length - 1]
  }
  clear() {
     this.container = []
  }
}

module.exports = Stack