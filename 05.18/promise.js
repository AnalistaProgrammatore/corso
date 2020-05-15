/** PATTERN UTILIZZO CALLBACK */
asyncOperation(arg, (err, result) => {
  if (err) {
    //gestisci l'errore... 
  }
  // fai qualcosa con il risultato
})

/**
 * STATI DI UNA PROMISE
 * 1. pending
 * 2. fulfilled -> gestito da then
 * 3. rjected -> gestito da then
 * 4. settled 
 */

// PSEUDO CODICE
class MyPromise {
  static resolve(arg) {
    return new MyPromise(arg)
  }

  constructor() {
  }

  then(callback) {
    //...gestione asincrona...
    const result = callback()
    if(result instanceof MyPromise) return result
    return new MyPromise(result)
  }
} 

const asyncOperation = arg => new Promise()
const asyncOperation2 = arg => new Promise()

asyncOperation(arg)
  .then(result => {
      // fai qualcosa con il risultato
    }
  )
  .catch(err => {
      //gestisci l'errore
    }
  )

const promiseOp = asyncOperation()
  .then(result => {
    return 1
  })
  .then(result => asyncOperation2(result))
  .catch(err => {
    //gestisco l'errore della prima e della seconda
  })
  .then(result => result)
  .catch(err => {
    // gestisco tutti i possibili errori generati da tutte le chiamate then
  })