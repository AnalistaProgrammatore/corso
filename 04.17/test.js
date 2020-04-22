const Graph = require('./Graphs')

/** SCRIPT DI TESTING */

const graph = new Graph()

/** COSTRUZIONE GRAFO:  
 * @see https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#/media/File:Dijkstra_Animation.gif
*/
graph.addVertex('1')
graph.addVertex('2')
graph.addVertex('3')
graph.addVertex('4')
graph.addVertex('5')
graph.addVertex('6')

graph.addEdge('1', '2', 7)
graph.addEdge('1', '6', 14)
graph.addEdge('1', '3', 9)

graph.addEdge('2', '4', 15)
graph.addEdge('2', '3', 10)

graph.addEdge('3', '6', 2)

graph.addEdge('6', '5', 9)
graph.addEdge('5', '4', 6)

console.log(graph.dijkstra('1'))