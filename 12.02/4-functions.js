const A = [1, 2, 3, 4, 5];


function sum(x) {
  for(let i = 0; i < x.length; i++) {
    x[i] += 2;
  }
  return x;
}

function sumPure(x) {
  let X = []
  for(let i = 0; i < x.length; i++) {
    X[i] = x[i];
  }
  for(let i = 0; i < X.length; i++) {
    X[i] += 2;
  }
  return X;
}

console.log(sumPure(A), sumPure(A), sumPure(A))
