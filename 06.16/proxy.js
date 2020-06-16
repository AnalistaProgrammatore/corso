class Greet {
  hello() {
    return 'hello'
  }

  goodbye() {
    return 'goodbye'
  }

  sayHello() {}
}

function createProxy(subject) {
  const proto = Object.getPrototypeOf(subject)

  function Proxy(subject) {
    this.subject = subject
  }

  Proxy.prototype = Object.create(proto)

  Proxy.prototype.hello = function() {
    return this.subject.hello() + ' world!'
  }

  Proxy.prototype.goodbye = function(name) {
    return this.subject.goodbye() + ' ' + name
  }

  Proxy.prototype.seyHello = function() {
    return 'say hello'
  }


  return new Proxy(subject)
}

const greeter = new Greet()
const greetProxy = createProxy(greeter)

console.log(greetProxy.hello())
console.log(greetProxy.goodbye('Marco'))