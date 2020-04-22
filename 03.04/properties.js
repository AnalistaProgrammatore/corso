let address_book_item = {
  key: 'chiave',
  name: 'Mario',
  surname: 'Spiderman',
  email: ['mario.spiderman@acme.it', 'mario@gmail.com'],
  enabled: true,
  id: 1
}

//Object.freeze(address_book_item)
//Object.isFrozen(address_book_item)
//Object.seal(address_book_item)
//Object.isSealed(address_book_item)

//Object.preventExtensions(address_book_item)
//Object.isExtensible(address_book_item)

console.log(Object.getOwnPropertyDescriptors(address_book_item))