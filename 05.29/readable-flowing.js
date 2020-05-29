process.stdin
  .on('data', chunk => {
    console.log('chunk read', chunk.length, chunk.toString())
  })