class Queue {
  constructor(maxSize) {
     if (isNaN(maxSize)) {
        maxSize = 10
     }
     this.maxSize = maxSize
     this.container = []
  }

  display() {
     console.log(this.container);
  }
  
  isEmpty() {
     return this.container.length === 0
  }
  
  isFull() {
     return this.container.length >= this.maxSize
  }

  enqueue(element) {
     if (this.isFull()) {
        console.log("Queue Overflow!")
        return
     }
     this.container.push(element)
  }
  dequeue() {
     if (this.isEmpty()) {
        console.log("Queue Underflow!")
        return
     }
     return this.container.shift()
  }
  peek() {
     if (this.isEmpty()) {
        console.log("Queue Underflow!")
        return
     }
     return this.container[0]
  }
  clear() {
     this.container = []
  }
}

module.exports = Queue