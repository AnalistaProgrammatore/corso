process.stdin
  .on('readable', () => {
    let chunk
    while((chunk = process.stdin.read(1)) !== null) {
      console.log('chunk read', chunk.length, chunk.toString())
    }
  })
  .on('end', () => console.log('End of stream\n'))