

var injector = require('../injector'),
    jasmine = require('jasmine');
    sinon = require('sinon');
    
beforeEach(function() {
   injector.clear();
});

describe('When registering a Factory', function() {
        
    it('should store the factory module', function() {       
        injector.registerFactory('factory1',DefaultModule);
        injector.get('factory1');
        expect(injector.isRegistered("factory1")).toBe(true);
    });

     it('and recovering the module, it should call constructor', function() {
         var spyModule = sinon.spy(DefaultModule);
         injector.registerFactory('factory1', spyModule);
         injector.get('factory1');
         expect(spyModule.called).toBe(true);
     });        
});

describe("When registering a Service", function() {
    
    it('should store the service module', function() {
        injector.registerService('service1', DefaultModule);
        expect(injector.isRegistered('service1')).toBe(true);
    });

     it('should return same singleton', function() {
        var spyService =  sinon.spy();
        injector.registerService('service1', spyService);      

        var service1= injector.get('service1');        
        var service2 = injector.get('service1');
        expect(service1).toBe(service2);
        
    });

    it('should create object instance when function type is passed', function() {

        var spyService =  sinon.spy();
        injector.registerService('service1', spyService);      

        var service1= injector.get('service1');

        expect(spyService.calledWithNew()).toBe(true);
        
    });

    it('should not create instance if its already one',function() {

         var spyService =  sinon.spy();
         var spyObject =  new spyService();
         spyService.reset();
         
        injector.registerService('service1',spyObject);    
        var service1= injector.get('service1');        
        var service2 = injector.get('service1');     
        
        expect(spyService.calledWithNew()).toBe(false);

    });

    it('should return proper registered object', function() {

        var object = { invoke: function () {} };
        var spy = sinon.spy(object, "invoke");         
        injector.registerService('service1', object);
        var serviceRegistered = injector.get('service1'); 

        serviceRegistered.invoke();

        expect(spy.called).toBe(true);

    });
});

describe("When clearing the registered dependencies", function() {
    it('Must empty the registered modules', function() {
        
        injector.registerService('service1', sinon.spy());
        injector.registerFactory('factory1', sinon.spy());        
        
        injector.clear();

        expect(injector.isRegistered("service1")).toBe(false);
        expect(injector.isRegistered("factory1")).toBe(false);

    });
});



function DefaultModule(){   
}
