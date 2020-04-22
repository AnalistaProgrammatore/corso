class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

/** ABSTRACT DATA TYPE per le linked list
 * @property head -> Nodo di testa
 * @property length -> conta i nodi della lista
 * @method first -> ritorna il primo elemento della lista
 * @method last -> ritorna l'ultimo elemento della lista
 * @method find -> cerca un elemento nella lista
 * @method findNth -> recupera l'elemento all aposizione specificata
 * @method insert(data) -> inserisce un elemento nella lista
 * @method remove -> rimuove un elemento dalla lista
 * @method removeNth -> rimuove l'elemento dalla lista alla posizione specificata
 * @method insertFirst -> inserisce un elemento all'inizio della lista
 * @method insertLast -> inserisce un elemento alla fine della lista
 * @method insertAfter -> inserisce un elemento dopo un altro elemento della lista
 * @method insertBefore -> inserisce un elemento prima di un altro elemento della lista
 * @method insertNth -> inserisce un elemento alla posizione specificata nella lista
 * @method display -> stampa gli elementi della lista
 */
class LinkedList {
  constructor() {
    this.head = new Node(null)
    this.length = 0
  }

  insert(data, compare) {
    if(this.length === 0) return this.insertFirst(data)
    if(!compare) return this.insertLast(data)
    const newNode = new Node(data)
    const current = this.find(compare)
    newNode.next = current.next // imposto il vecchio next di current al nuovo next di newNode
    current.next = newNode // imposto il nuovo next di current al nuovo nodo
    this.length++
  }

  remove(compare) {
    if(this.length === 0) return
    const prev = this.findPrev(compare)
    if(prev !== null) {
      prev.next = prev.next.next
    }
  }

  insertFirst(data) {
    const newNode = new Node(data)
    this.head = newNode
    this.length++
  }

  insertLast(data) {
    const newNode = new Node(data)
    const last = this.last()
    last.next = newNode
    this.length++
  }

  find(compare) {
    let currentNode = this.head
    while(!compare(currentNode.data)) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  findPrev(compare) {
    let currentNode = this.head
    let prev = null
    while(currentNode.next !== null && !compare(currentNode.data)) {
      prev = currentNode
      currentNode = currentNode.next
    }
    return prev
  }

  first() {
    return this.head
  }

  last() {
    let last = this.head
    while(last.next !== null) {
      last = last.next
    }
    return last
  }

  display() {
    let currentNode = this.head
    while(currentNode !== null) {
      console.log(currentNode.data)
      currentNode = currentNode.next
    }
  }

}
/** ABSTRACT DATA TYPE 
 * @property store -> contiene la coda (array o linkedList)
 * @method enqueue -> inserisce un elemento alla fine della coda
 * @method dequeue -> restituisce ed elimina l'elemento all'inizio della coda
*/

class PriorityQueue {
  constructor() {
    this.store = {}
  }

  enqueue(data, priority) {
    if(this.store[priority]) return this.store[priority].insert(data)
    this.store[priority] = new LinkedList()
    this.store[priority].insert(data)
  }

  dequeue(priority) {
    if(!this.store[priority]) return null
    const result = this.store[priority].first()
    this.store[priority].head = this.store[priority].head.next
    return result
  }

  display() {
    Object.keys(this.store).forEach(priority => this.store[priority].display())
  }
}

const queue = new PriorityQueue()
queue.enqueue('Mario', 0)
queue.enqueue('Luca', 0)
queue.enqueue('Matteo 3', 3)
queue.enqueue('Giovanni 3', 3)

queue.enqueue('Matteo 2', 2)
queue.enqueue('Giovanni 2', 2)

queue.enqueue('Matteo 1', 1)
queue.enqueue('Giovanni 1', 1)


console.log('estraggo elemento', queue.dequeue(1).data)
//queue.display()
console.log('estraggo elemento', queue.dequeue(0).data)
console.log('estraggo elemento', queue.dequeue(3).data)
console.log('estraggo elemento', queue.dequeue(3).data)
//queue.display()
