let a = 0;
let b = 2;
if(true) {
  let a = 5;
  console.log(a + b);
  if(true) {
    let c = 13;
    console.log(a+b+c)
  }
}

console.log(a + b);