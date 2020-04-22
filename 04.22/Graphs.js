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
    const prev = {}
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
      prev[vertex] = null
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
          prev[neighbor.vertex] = currentVertex
          // inserisco nella coda il neighbor trovato con priorità impostata alla nuova distanza
          pq.enqueue(neighbor.vertex, distance)
        }
      }
    }

    /** FUNZIONE PER LA RICERCA DEL PERCORSO MINIMO DATO UN NODO DESTINAZIONE */
    const getPath = dest => {
      const paths = new Stack() // inizializza lo stack dei passi
      while(prev[dest]) { // finchè l'algoritmo di dijkstra ha marcato un passaggio su un vertice
        paths.push(dest) // inserisci il nodo destinazione nello stack
        dest = prev[dest] // sostituisci il nuovo dest con il precedente nodo visionato da dijkstra
      }
      return paths.container
    }

    /** COSTRUISCI I PERCORSI PER TUTTI I VERTICI DEL GRAFO */
    const paths = {}
    for(const p in prev) {
      paths[p] = getPath(p)
    }

    return { distances, paths }
  }

  /**
   * Algoritmo di ordinamento topologico
   * @see https://en.wikipedia.org/wiki/Topological_sorting
   */
  topologicalSort() {
    /**
     * Imposto le strutture dati di appoggio:
     * 1. lo stack per accumulare i risultati
     * 2. un set contenete i nodi gia esplorati
     * 3. un set temporaneo per individuare eventuali cicli nel grafo
     */
    const stack = new Stack(this.vertex.length)
    const explored = new Set()
    const temp = new Set()

    /** 
     * Scorro tutti i vertici non visitati del grafo e applico la funzione tsort ad ogni 
     * singolo vertice non esplorato 
     */
    for(const vertex of this.vertex) {
      if(!explored.has(vertex) && !temp.has(vertex)) {
        tsort(vertex)
      }
    }

    const tsort = vertex => {
      // aggiungo il nodo da analizzare al set dei temporaneti
      temp.add(vertex)
      /** scorro tutti i vertici adiacenti */
      for(const neighbor of this.edges[vertex]) {
        /** 
         * se l'adiacente è nel set dei temporanei lancio un errore in quanto ho individuato un ciclo
         * e quindi il grafo che sto analizzando non è un DAG (Direct Acyclic Graph)
         */
        if(temp.has(neighbor.vertex)) {
          throw new Error('Cyclic graph detected')
        }
        /** 
         * Attraverso in profondità il grafo solo se il nodo adiacente che sto analizzando
         * non è stato già visitato
         */
        if(!explored.has(neighbor.vertex)) {
          tsort(neighbor.vertex)
        }
      }
      //rimuovo il nodo dai temporanei in quanto ho trovato un nodo da inserire nei risultati
      temp.delete(vertex)
      //lo aggiungo ai visitati
      explored.add(vertex)
      //lo aggiungo ai risultati
      stack.push(vertex)
    }

    return stack.container.reverse()
  }

  /**
   * Algoritmo di prim per la ricerca di un albero di copertura minimo
   * @see https://en.wikipedia.org/wiki/Prim%27s_algorithm
   * @see https://en.wikipedia.org/wiki/Minimum_spanning_tree
   */
  primMst() {
    // inizializo il grafo che conterrà il MST trovato
    const mst = new Graph()
    if(this.vertex.length === 0) return mst

    /**  
     * seleziono in modo arbitrario lo start al vertice di partenza
     * NB qualsiasi nodo scegliessimo l'MST risultante sarebbe sempre uguale
     */ 
    const start = this.vertex[0]

    /**
     * Inizializzo le strutture dati di appoggio per l'algoritmo
     * 1. una coda a priorità per poter scegliere il cammino minimo tra i vertici adiacenti
     * 2. un set per marcare i vertici esplorati
     */
    const edgeQueue = new PriorityQueue(this.vertex.length * this.vertex.length)
    const explored = new Set()
    explored.add(start)
    // aggiungo il vertice start al MST
    mst.addVertex(start)

    /**
     * Inizializzo la coda a priorità:
     * 1. prendo tutti i cammini che partono da start
     * 2. li inserisco nella coda a priorità usando il peso del singolo cammino come priorità per la coda
     */
    for(const neighbor of this.edges[start]) {
      edgeQueue.enqueue([start, neighbor.vertex], neighbor.weight)
    }

    /** Scorro tutti i cammini presenti nella coda finchè non si svuota */
    while(!edgeQueue.isEmpty()) {
      // seleziono dalla coda il camminimo minimo inserito
      let currentMinEdge = edgeQueue.dequeue()
      /**
       * continuo a rimuovere elementi dalla coda per cercare un nuovo cammino minimo se
       * questo è stato già visitato
       * NB controllo anche che la coda non sia vuota come condizione primaria di uscita dal ciclo
       */
      while(!edgeQueue.isEmpty() && explored.has(currentMinEdge.data[1])) {
        currentMinEdge = edgeQueue.dequeue()
      }

      //ho trovato il cammino minimo e quindi il prossimo vertice da analizzare
      const nextVertex = currentMinEdge.data[1]

      /**
       * Controllo di nuovo che la coda non sia vuota.
       * Potrebbe essere vuota (vedi condizione riga 268) e quindi non contenere risultati
       */
      if(!explored.has(nextVertex)) {
        //aggiungo il vertice trovato all'MST
        mst.addVertex(nextVertex)
        //creo il cammino dal vertice precedente al vertice trovando assegnando come peso la priorità
        mst.addEdge(currentMinEdge.data[0], nextVertex, currentMinEdge.priority)
        // aggiungo i cammini del vertice trovato alla coda come fatto alle righe 255-257
        for(const neighbor of this.edges[nextVertex]) {
          edgeQueue.enqueue([nextVertex, neighbor.vertex], neighbor.weight)
        }
        //marco il vertice trovato come esplorato
        explored.add(nextVertex)
      }
    }

    return mst
  }

  /**
   * Algoritmo per la ricerca del cammino minimo fra due vertici usando la strategia BFS
   */
  BFSShortestPath(origin, destination) {
    const queue = new Queue(this.vertex.length)
    const explored = new Set()
    const distances = { [origin]: 0 }
    queue.enqueue(origin)
    while(!queue.isEmpty()) {
      const current = queue.dequeue()
      const validEdges = this.edges[current].filter(e => !explored.has(e))
      for(const neighbor of validEdges) {
        explored.add(neighbor.vertex)
        if(distances[neighbor.vertex] === undefined) {
          distances[neighbor.vertex] = 1
        } else {
          distances[neighbor.vertex] += 1
        }
        queue.enqueue(neighbor.vertex)
      }
    }

    return distances[destination]
  }

  /**
   * Algoritmo di Floyd Warshall per la ricerca dei cammini minimi in un grafo pesato con pesi anche
   * negativi
   * L'alrogitmo ha complessità O(|V|^3) ed è facilmente deducibile dalla presenza di 3 cicli for annidiati
   * @see https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
   */
  floydWarshall() {
    const distances = {}
    for(let i = 0; i < this.vertex.length; i++) {
      distances[this.vertex[i]] = {}
      for(const neighbor of this.edges[this.vertex[i]]) {
        distances[this.vertex[i]][neighbor.vertex] = neighbor.weight
      }

      for(const neighbor of this.edges) {
        if(distances[this.vertex[i]][neighbor.vertex] === undefined) {
          distances[this.vertex[i]][neighbor.vertex] = Infinity
          if(this.vertex[i] === neighbor.vertex) {
            distances[this.vertex[i]][neighbor.vertex] = 0
          }
        }
      }
    }

    for(const iV of this.vertex) {
      for(const jV of this.vertex) {
        for(const zV of this.vertex) {
          if(distances[iV][zV] + distances[zV][jV] < dist[iV][jV]) {
            distances[iV][jV] = distances[iV][zV] + distances[zV][jV]
          }
        }
      }
    }

    return distances
  }

}

module.exports = Graph