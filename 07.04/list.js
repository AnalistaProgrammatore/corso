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
 */
class LinkedList {
  constructor() {
    this.head = new Node(null)
    this.length = 0
  }

  insert(data, compare) {
    if(this.length === 0) return this.insertFirst(data)
    if(!compare)
    const newNode = new Node(data)
    const current = this.find(compare)
    newNode.next = current.next // imposto il vecchio next di current al nuovo next di newNode
    current.next = newNode // imposto il nuovo next di current al nuovo nodo
    this.length++
  }

  insertFirst(data) {
    const newNode = new Node(data)
    this.head.next = newNode
    this.length++
  }

  insertLast(data) {
    const newNode = new Node(data)
    const last = this.last()
    this.last.next = newNode
    this.length++
  }

  find(compare) {
    let currentNode = this.head
    while(!compare(currentNode.data)) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  first() {
    return this.head.next
  }

  last() {
    let last = this.head
    while(!last.next !== null) {
      last = last.next
    }
    return last
  }
}


/** USO LA CLASSE -> devo avere meno responsabilità possibile */
const llist = new LinkedList()
llist.insert({ hello: 'world' })
llist.insert(1, current => current.hello && current.hello === 'world')
llist.insert(3)