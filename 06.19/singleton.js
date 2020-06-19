class Db {

  static instance = null

  static getInstance(username, password, host) {
    if(Db.instance === null) {
      Db.instance = new Db(username, password, host)
    }
    return Db.instance
  }

  constructor(username, password, host) {
    this.socket = new DbSocket(username, password, host)
  }

  wirte() {}

  read() {}

  update() {}

  delete() {}
}