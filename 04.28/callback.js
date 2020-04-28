function addSync(a, b) {
  return a + b 
}

function addAsync(a, b, callback) {
  setTimeout(() => callback(a + b), 5000)
  return 'add ritorna subito...'
}


console.log(addSync(2, 10))
console.log(addAsync(2, 2, result => console.log(result)))
console.log('waiting results...')

