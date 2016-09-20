(function(){
  
  var injector = require('./injector');
  
  var userService = require('./services/userService');
  
  injector.registerService('userService', userService);
  
  var foundUser= injector.get('userService').get(1);  

  console.log(injector.get('userService').getAll())
  
}())