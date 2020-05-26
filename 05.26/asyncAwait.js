const fs = require('fs')
const path = require('path')

async function readFile(filename, options) {
  return await fs.promises.readFile(filename, options)
}

async function writeFile(filename, options) {
  return await fs.promises.writeFile(filename, options)
}

async function main() {
  const fileName = path.basename(__filename)
  const data = await readFile(fileName, 'utf8')
  await writeFile(`clone_of_${fileName}`, data)
  console.log('Clone done')
}

main()
  
console.log('Cloning...')