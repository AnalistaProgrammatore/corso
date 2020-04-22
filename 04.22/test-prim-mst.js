const Graph = require('./Graphs')

/**  DATO QUESTO GRAFO IN INPUT
   *         A
   *       / | \
   *       C | B
   *       \ | |
   *         D G
   *         | /
   *         E
   *         |
   *         F
*/
const graph = new Graph()

graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')
graph.addVertex('G')

graph.addEdge('A', 'C', 100)
graph.addEdge('A', 'B', 3)
graph.addEdge('A', 'D', 4)
graph.addEdge('C', 'D', 3)
graph.addEdge('D', 'E', 8)
graph.addEdge('E', 'F', 10)
graph.addEdge('B', 'G', 9)


/** OTTENIAMO QUESTO MST
   *         A
   *         |\
   *     C   | B
   *      \  | |
   *       D   G
   *       |
   *       E
   *       |
   *       F
   *
*/
const mst = graph.primMst()
mst.display()