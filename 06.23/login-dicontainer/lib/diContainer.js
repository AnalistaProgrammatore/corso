function createDiContainer() {
  const dependecies = {}
  const factories = {}

  const diContainer = {}

  diContainer.register = function(name, instance) {
    dependecies[name] = instance
  }

  diContainer.factory = function(name, factory) {
    factories[name] = factory
  }

  diContainer.get = function(name) {
    if(!dependecies[name]) {
      const factory = factories[name]
      dependecies[name] = factory && diContainer.inject(factory)
      if(!dependecies[name]) {
        throw new Error(`CANNOT_FIND_MODULE: ${name}`)
      }
    }
    return dependecies[name]
  }

  diContainer.inject = function(factory) {
    const formals = factory.toString().match(/^function\\s*[^\\(]*\\(\\s*([^\\)]*)\\)/m)[1].replace(/ /g, '')
    const actuals = formals.map(formal => diContainer.get(formal))
    return factory.apply(null, actuals)
  }

  return diContainer
}

module.exports = createDiContainer()