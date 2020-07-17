const datastore = require('../lib/datastore')
class BaseModel {

  static instance = null

  static getInstance(table) {
    if(this.instance === null) {
      this.instance = new this(table)
    }
    return this.instance
  }

  constructor(table) {
    this.datastore = datastore(table)
  }

  /** CREA UN NUOVO USER NEL DATASTORE */
  async create(data) {
    return await this.datastore.create(data)
  }

  /** RIMUOVE UN NUOVO USER NEL DATASTORE */
  async remove(data) {
    return await this.datastore.remove(data)
  }

  /** AGGIORNA UN UTENTE NEL DATASTORE 
  * query è un oggetto che contiene le informazioni per poter prelevare l'utente selezionato dal datastore
  */
  async update(query, data) {
    return await this.datastore.update(query, data)
  }

  /** RECUPERA UN UTENTE DAL DATASTORE DATO IL SUO ID*/
  async readById(id) {
    return await this.datastore.read({ id })
  }

  async read(query) {
    return await this.datastore.read(query)
  }
}

module.exports = BaseModel