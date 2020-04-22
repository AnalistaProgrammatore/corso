let json = '{ "age": 20 }'

const getJsonUser = function() {
  let user = {}
  try {
    user = JSON.parse(json)
    if(!user.name) {
      throw new SyntaxError('Incomplete data: no name found')
    }
    return user
  } catch(err) {
    //console.log(err.name)
    if(err.name === 'SyntaxError') {
      console.log('Malformed json')
    } else {
      throw err
    }
    
  } finally {
    console.log('pre return')
  }
}

const getUserName = function() {
  const { name } = getJsonUser()
  return name
}

try {
  const name = getUserName()
  console.log(name)
} catch(err) {
  console.log('errore nel programma')
  console.log(err.stack)
} finally {
  console.log('fine programma')
}



