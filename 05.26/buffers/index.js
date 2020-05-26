const fs = require('fs')

/** ALGORITMO DI LETTURA DI UN FILE 
 * 1. Apro il file -> in modalità lettura
 * 2. Leggo quanto è grande (in bytes) questo file
 * 3. leggo dal byte 0 del file fino al byte finale
 * 4. ogni volta che leggo uno o più bytes dal file inserisco i dati in una struttura che sarà il risultato
 * 5. chiudo il file
*/

fs.open('hello', 'r', (err, fd) => {
  const stats = fs.fstatSync(fd)
  let totalBytes = stats.size
  let buffer = Buffer.alloc(totalBytes)
  let bytesRead = 0
  function read(chunkSize = 1) {
    fs.read(fd, buffer, bytesRead, chunkSize, bytesRead, (err, numBytes, bufRef) => {
      bytesRead += numBytes
      console.log(bufRef)
      if(bytesRead < totalBytes) {
        return read(Math.min(8, totalBytes - bytesRead))
      }
      fs.close(fd, () => {})
      console.log(bufRef)
    }) 
  }
  read(Math.min(8, totalBytes))
})


/** ALGORITMO DI SCRITTURA DI UN FILE 
 * 1. Apro il file -> in modalità scrittura
 * 2. Leggo dal buffer i dati da scrivere byte per byte
 * 3. Scrivo i byte letti dal buffer nel filesystem
 * 4. chiudo il file
*/