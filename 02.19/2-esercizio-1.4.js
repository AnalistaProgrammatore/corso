const V = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let i = 0;
const foo = function(x) {
  return x+1
}
V[1] = 12
V[1] = foo(V[i+1])
V = []