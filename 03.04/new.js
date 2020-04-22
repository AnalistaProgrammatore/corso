const AddressBookItem = function(name, surname) {
  this._name = name
  this._surname = surname
  this.getFullName = function() {
    return `${this._name} ${this._surname}`
  }
  this.setFullName = function(value) {
    const [name, surname] = value.split(' ')
    this._name = name
    this._surname = surname
  }
}

const AddressBook = function(addressBook = []) {
  this._addressBook = addressBook
  this.addItem = function(name, surname) {
    this._addressBook = [ ...this._addressBook, ...[new AddressBookItem(name, surname)]]
  }
  this.getAddressBook = function() {
    return this._addressBook.map(item => item.getFullName())
  }
}

const myAddressBook = new AddressBook()
myAddressBook.addItem('Mario', 'Rossi')
myAddressBook.addItem('Antonio', 'Verdi')
console.log(myAddressBook.getAddressBook())