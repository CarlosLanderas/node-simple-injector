(function(){
  
  var fakeUserCollection = require("./fakeUserCollection")
  
  function UserService(){}
  
  UserService.prototype.get = function(id) {
    var foundUser =  fakeUserCollection.filter(function(user) {
      return user.id === id
    });
    
    return foundUser[0];
  };
  
  UserService.prototype.getAll = function() {
    return fakeUserCollection;
  };
  
  module.exports = new UserService();
  
}()) 