let address_book_item = {
  _name: 'Mario',
  _surname: 'Spiderman',
  get fullName() {
    return `${this._name} ${this._surname}`
  },
  set fullName(value) {
    const [name, surname] = value.split(' ')
    this._name = name
    this._surname = surname
  }
}
Object.defineProperties(
  address_book_item,
  {
    _name: { writable: false },
    _surname: { writable: false }
  }
)
address_book_item.fullName = 'Mario Rossi'
address_book_item._name = 'Giovanni'
console.log(address_book_item.__proto__)