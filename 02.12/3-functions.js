let a = 0;
let b = 2;

let sumFive = x => x + 5

function sumPlusFiveFd(x, y) {
  return x + y + 5;
}

let sumPlusFiveFe = function(x, y) {
  return x + y;
}

let sumPlusFiveArrow = (x, y) => {
  return x + y
}

if(true) {
  let a = 5;
  if(true) {
    let sumPlusFiveFe = function(x, y) {
      return x + y + 5;
    }
    let c = 13;
    console.log(sumPlusFiveFd(a, b), sumPlusFiveFe(a, c));
  }
}