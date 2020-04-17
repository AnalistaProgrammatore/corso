const PriorityQueue = require('./structs/PriorityQueue')
const Queue = require('./structs/Queue')
const Stack = require('./structs/Stack')

/** ABSTRACT DATA TYPE per le linked list
 * @property edges -> Lista di adiacenza dei singoli vertici
 * @property vertex -> Lista dei vertici presenti nel grafo
 * @method addVertex -> aggiunge un vertice alla lista dei vertici
 * @method addEdge -> aggiunge una connessione tra il vertice 1 e il vertice 2 e viceversa
 * @method addDirectEdge -> aggiunge una connessione solo tra il vertice 1 e il vertice 2
 * @method display -> stampa il grafo secondo la lista di adiacenze
 * @method bsf -> esegue l'attraversamento in ampiezza del grafo
 * @method dsf -> esegue l'attraversamento in profondità del grafo
 * @method dijkstra -> esegue l'algoritmo di Dijstra per trovare i cammini minimi
 */
class Graph {
  constructor() {
    this.edges = {}
    this.vertex = []
  }

  addVertex(vertex) {
    this.vertex.push(vertex)
    this.edges[vertex] = []
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.edges[vertex1].push({ vertex: vertex2, weight })
    this.edges[vertex2].push({ vertex: vertex1, weight })
  }

  addDirectEdge(vertex1, vertex2, weight = 1) {
    this.edges[vertex1].push({ vertex: vertex2, weight })
  }

  display() {
    let graph = '';
    for(const vertex of this.vertex) {
      const edges = this.edges[vertex].map(edge => edge.vertex)
      graph += `${vertex} -> ${edges.join(', ')} \n`
    }
    console.log(graph)
  }

  dfs(vertex){
    // creo la struttura dati di appoggio e il Set dei vertici esplorati
    const stack = new Stack(this.vertex.length)
    const explored = new Set()
    // aggiungo alla struttura dati di appoggio e al set dei vertici esplorati il vertice di partenza
    stack.push(vertex)
    explored.add(vertex)
    // MAIN LOOP finchè la struttura di appoggio non è vuota
    while(!stack.isEmpty()){
      // estraggo l'elemento corrente
      const current = stack.pop()
      // applico una funzione all'elemento corrente
      console.log(current)
      /**
       * 1. filtriamo la lista di adiacenze del vertice corrente eliminando i vertici già visistati
       * 2. per ogni connessione trovata inseriamo i suoi vertici nella struttura di appoggio
       * 3. e li marchiamo come visitati
       */
      const edges = this.edges[current].filter(edge => !explored.has(edge.vertex))
      for(const edge of edges) {
        stack.push(edge.vertex)
        explored.add(edge.vertex)
      }
    }
  }

  /** VEDI COMMENTI DSF */
  bfs(vertex){
    const queue = new Queue(this.vertex.length)
    const explored = new Set()
    queue.enqueue(vertex)
    explored.add(vertex)
    while(!queue.isEmpty()) {
      const current = queue.dequeue()
      console.log(current)
      const edges = this.edges[current].filter(edge => !explored.has(edge.vertex))
      for(const neighbor of edges) {
        queue.enqueue(neighbor.vertex)
        explored.add(neighbor.vertex)
      }
    }
  }

  dijkstra(startVertex) {
    /** INIZIALIZZAZIONE 
     * preparo le distanze e i percorsi per immagazzinare i risultati
     * e istanzio la coda a priorità usata dall'algoritmo
    */
    const distances = {}
    const paths = {}
    const pq = new PriorityQueue(this.vertex.length * this.vertex.length)
    
    /**
     * IMPOSTO IL RISULTATO DEL VERTICE DI PARTENZA
     * possiamo facilmente calcolare i risultati per il vertice di partenza essendo a distanza 0
     * da se stesso
     */
    distances[startVertex] = 0
    pq.enqueue(startVertex, 0)
    
    /** INIZIALIZZO I RISULTATI
     * imposto la distanza iniziale di tutti i vertici tranne startVertex da startVertex ad infinito
     * e imposto tutti i percorsi ad un nuovo Set
     * Utilizzo un set per avere sempre risultati univoci
     * e imposto il primo elemento di ogni vertice tranne startVertex a startVertex
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
     */
    for(const vertex of this.vertex) {
      if(vertex !== startVertex) {
        distances[vertex] = Infinity
      }
      paths[vertex] = new Set()
      if(vertex !== startVertex) paths[vertex].add(startVertex)
    }

    /** MAIN LOOP */
    while(!pq.isEmpty()) {
      const minCurrentNode = pq.dequeue() // estraggo il vertice con peso minimo dalla coda
      const currentVertex = minCurrentNode.data
      /** CICLO I VICINI DEL VERTICE PRECEDENTEMENTE ESTRATTO */
      for(const neighbor of this.edges[currentVertex]) {
        /** 
         * calcolo la distanza tra il vicino (nighbor) e la distanza immagazinata per il vertice
         * estratto precedentemente
         */
        const distance = distances[currentVertex] + neighbor.weight
        /**
         * Se la distanza calcolata è minore alla distanza precedentemente immagazzinata
         * per il vicino (nighbor) allora ho trovato un cammino più breve da inserire tra i risultati
         */
        if(distance < distances[neighbor.vertex]) {
          // inserisco la distanza minima trovata per il neighbor nei risultati
          distances[neighbor.vertex] = distance
          /*
          * inserisco il vertice analizzato precedentemente nel set dei percorsi di neighbor
          * escludendo startVertex dall'inserimento
          */
          paths[neighbor.vertex].add(currentVertex)
          // inserisco nella coda il neighbor trovato con priorità impostata alla nuova distanza
          pq.enqueue(neighbor.vertex, distance)
        }
      }
    }
    return { distances, paths }
  }
}

module.exports = Graph