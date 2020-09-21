const BaseModel = require('./Base')
const userDataStore = require('../lib/datastore')('users')

class Course extends BaseModel {
  /** ESEGUE LA VALIDAZIONE DEI DATI IN INPUT */
  static validation(course) {
    return true
  }

  /** CREA UN NUOVO USER NEL DATASTORE */
  async create(course) {
    if(!Course.validation()) return new Error('VALIDATION')
    return await super.create(course)
  }

  /** AGGIORNA UN UTENTE NEL DATASTORE 
  * query è un oggetto che contiene le informazioni per poter prelevare l'utente selezionato dal datastore
  */
  async update(query, course) {
    if(!User.validation()) return new Error('VALIDATION')
    return await super.update(query, course)
  }

  async read(query) {
    let courses = await this.datastore.read(query)
    const coursesKeys = Object.keys(courses)
    for(let i = 0; i < coursesKeys.length; i++) {
      const id = coursesKeys[i]
      courses[id].teacher = await userDataStore.read({ id: courses[id].teacher })
      console.log(courses[id])
    }
    return courses
  }
}

module.exports = Course