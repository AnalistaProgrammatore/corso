const Graph = require('./Graphs')

/** DATO QUESTO GRAFO IN INPUT
   *         A
   *       / | \
   *       C | B
   *       \ | |
   *         D G
   *         |
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

graph.addDirectEdge('A', 'C')
graph.addDirectEdge('A', 'B')
graph.addDirectEdge('A', 'D')
graph.addDirectEdge('C', 'D')
graph.addDirectEdge('D', 'E')
graph.addDirectEdge('E', 'F')
graph.addDirectEdge('B', 'G')

const tsort = graph.topologicalSort()

console.log(tsort)