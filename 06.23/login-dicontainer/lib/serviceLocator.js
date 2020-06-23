function createServiceLocator() {
  const dependecies = {}
  const factories = {}

  const serviceLocator = {}

  serviceLocator.register = function(name, instance) {
    dependecies[name] = instance
  }

  serviceLocator.factory = function(name, factory) {
    factories[name] = factory
  }

  serviceLocator.get = function(name) {
    if(!dependecies[name]) {
      const factory = factories[name]
      dependecies[name] = factory && factory(serviceLocator)
      if(!dependecies[name]) {
        throw new Error(`CANNOT_FIND_MODULE: ${name}`)
      }
    }
    return dependecies[name]
  }

  return serviceLocator
}