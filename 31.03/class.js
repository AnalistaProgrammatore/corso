const rolesMixin = {
  canManageWebSite() {
    return this.isAdmin !== undefined || (this.name === 'Mario' && this.surname === 'Neri')
  },
  canManageUsers() {
    return this.isAdmin !== undefined
  }
}

/** CONSTRUTTO CLASSE PER LA CREAZIONE DI OGGETTI -> SINTASSI ES6
 * La classe user definisce due proprietà name e surname che vengono inizializate
 * dalla funzione construct() la quale prende come parametri i valori iniziali di name e surname
 */
class User {
  static compare(user1, user2) {
    return user1.name === user2.name && user1.surname === user2.surname
  }

  constructor(name, surname) {
    this.name = name
    this.surname = surname
  }

  toString() {
    return `${this.name} ${this.surname}`
  }
}

class Person {
  constructor(name, surname) {
    this.name = name
    this.surname = surname
  }
}

Object.assign(Person.prototype, rolesMixin)

Object.assign(User.prototype, rolesMixin)

/** CONSTRUTTO CLASSE EXTENDS -> SINTASSI ES6 
 * Il costrutto extends permette di estendere una nuova classe a partire da una class di base
 * In questo caso Admin estende la classe User il che significa che ne "eredita" tutte le
 * proprietà e i metodi.
 * Admin definisce anche una sua spcifica proprietà che è isAdmin.
 * NB isAdmin non esiste negli oggetti il cui prototype è User, ma solo in quelli in cui
 * il prototype è Admin
*/
class Admin extends User {
  constructor(name, surname) {
    super(name, surname)
    this.isAdmin = true
  }
  toString() {
    const name = super.toString()
    return `${name} è un admin`
  }
}

const user = new User('Mario', 'Neri')
const person = new Person('Mario', 'Neri')
const userCannotManageWebsite = new User('Marco', 'Rossi')
const admin = new Admin('Mario', 'Rossi')

console.log(person.canManageWebSite())
