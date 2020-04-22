function User(name, surname) {
  this.name = name
  this.surname = surname
}

User.prototype.toString = function() {
  return `${this.name} ${this.surname}`
}

function Admin(name, surname) {
  User.call(this, name, surname)
  this.isAdmin = true
}

Admin.prototype = Object.create(User.prototype)

Admin.prototype.toString = function() {
  const user = User.prototype.toString.call(this)
  return `${user} è un admin`
}

const user = new User('Mario', 'Rossi')
const admin = new Admin('Mario', 'Neri')

console.log(user.toString(), admin.toString())
