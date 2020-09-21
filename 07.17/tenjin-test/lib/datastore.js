const fs = require('fs')
const path = require('path')

const DATA_DIR = 'data'
const FILE_EXT = 'json'

// SIMPLE CRUD DATASTORE JSON
const store = table => 
{
  const lastId = -1
  const dataFilePath = path.resolve(__dirname, `../${DATA_DIR}/${table}.${FILE_EXT}`)
  if(!fs.existsSync(dataFilePath)) throw new Error('DATA_MODEL_NOT_FOUND')

  return {
    async create(data) {
      let fileData = await fs.promises.readFile(dataFilePath)
      fileData = JSON.parse(fileData.toString())
      const nextId = Object.keys(fileData).length
      fileData[nextId] = data
      await fs.promises.writeFile(dataFilePath, JSON.stringify(fileData))
      return data
    },
    async remove(query = {}) {
      return dataFilePath
    },
    async update() {
      return dataFilePath
    },
    async read(query = {}) {
      let data = await fs.promises.readFile(dataFilePath)
      data = JSON.parse(data.toString())
      if(query.id) {
        return data[query.id]
      }
      return data
    }
  }
}

module.exports = store