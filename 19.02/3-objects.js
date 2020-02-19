let address_book_item = {
  key: 'chiave',
  name: 'Mario',
  surname: 'Spiderman',
  email: ['mario.spiderman@acme.it', 'mario@gmail.com'],
  enabled: true,
  id: 1
}

let addressBookMethods = {
  name: 'Giuseppe',
  getFullName: function() {}
}

const tuplaOne = ['mario', 'rossi']
const tuplaTwo = ['email', 'casa']

const [name, surname] = tuplaOne
const inverted = [surname, name, ...tuplaTwo]

console.log(inverted)
