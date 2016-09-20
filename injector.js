(function() {

  "use strict"

  function Injector() {
    
  };

  Injector.prototype =  function() {
    
    var injectorTypes = require('./injectorTypes');
    var registeredServices = [];
    
    var findServiceByDescriptor = function(descriptor) {
        var matchedService = registeredServices.filter(function(service) {
          return service.serviceDescriptor === descriptor;
        });

        if (matchedService) {
          return matchedService[0];
        }
      },
      register = function(serviceDescriptor, service, injectorType) {

        var targetService = service;

        if (injectorType == injectorTypes.service) {
          targetService = createSingleton(service);
        }

        registeredServices.push({
          serviceDescriptor: serviceDescriptor,
          module: targetService,
          type: injectorType
        });
      },
      createSingleton = function(service) {
        if (typeof service === 'function') {
          return new service();
        }
        return service;
      },
      createService = function(service) {
        if (service.type == injectorTypes.factory) {
          return new service.module();
        }
        return service.module;
      };

    return {
      registerService: function(serviceDescriptor, service) {
        register(serviceDescriptor, service, injectorTypes.service);
      },
      registerFactory: function(serviceDescriptor, service) {
        register(serviceDescriptor, service, injectorTypes.factory)
      },
      requireAndRegister: function(identifier, location, injectorType) {
        var requiredModule = require(location);
        register(identifier, requiredModule, injectorType);
      },
      isRegistered: function(serviceDescriptor) {
        var serviceRegistered = registeredServices.filter(function(service) {
          return service.serviceDescriptor === serviceDescriptor;
        });

        return serviceRegistered !== undefined && serviceRegistered.length > 0;
      },
      get: function(serviceDescriptor) {
        var matchedService = findServiceByDescriptor(serviceDescriptor);
        if (matchedService !== undefined) {
          return createService(matchedService);
        } else {
          throw 'module ' + serviceDescriptor + " is not registered";
        }
      },
      clear: function() {
        registeredServices = [];
      }
    };

  }();

  module.exports = new Injector();

})();