const regex = new RegExp(/^<a\shref="(http[s]?:\/\/[a-zA-Z0-9\-_\.]+)"><\/a>$/)
const r = /^<a\shref="(http[s]?:\/\/[a-zA-Z0-9\-_\.]+)"><\/a>$/

const match = '<a href="https://www.google.it"></a>'.search(regex)

class MyError extends Error {}

console.log('ciao')

try {
  console.log(match.ciao.ciao)
} catch(err) {
  console.log(err.stack)
}

console.log('arrivederci')
