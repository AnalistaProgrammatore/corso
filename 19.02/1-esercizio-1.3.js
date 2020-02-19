let x = 1;
const g = function(h) {
  let x = 2;
  return h(3) + x;
}
const f = function(y) {
  return x+y;
}
if(true) {
  const x = 4;
  x = 5;
  let z = g(f)
  console.log(z, x)
}