const fs = require('fs')
class User {
  constructor(name, surname) {
    this.name = name
    this.surname = surname
  }

  fullName() {
    return `${this.name} ${this.surname}`
  }

  [Symbol.toPrimitive] () {
    const obj = {
      name: this.name,
      surname: this.surname
    }
    return JSON.stringify(obj)
  }
}

const me = new User('Mario', 'Rossi')

console.log(fs.writeFileSync('me.bkp', Buffer.from(me)))