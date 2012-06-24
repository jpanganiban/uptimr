describe("Base Classes", function() {

  describe("BaseView", function() {

    it("should exist", function() {
      expect(Uptimr.BaseView).toBeDefined();
    });

  });

  describe("BaseModel", function() {

    it("should exist", function() {
      expect(Uptimr.BaseModel).toBeDefined();
    });

    describe("Parse operations", function() {

      var TestModel
        , testModel;

      beforeEach(function() {

        TestModel = Uptimr.BaseModel.extend({
          className: 'test'
        });

        testModel = new TestModel();

      });

      afterEach(function() {
        testModel = undefined;
      });

      it("should correctly construct its urlRoot", function() {
        expect(testModel.urlRoot()).toEqual(Parse.baseUrl + '/' +
           Parse.apiVersion + '/classes/' + testModel.className);
      });

      it("should be able to create a new object to Parse", function() {

        var successCallbackSpy = jasmine.createSpy('success callback');
        var errorCallbackSpy = jasmine.createSpy('error callback');

        runs(function() {
          var data = {
            team: 'manchesters united'
          };

          var options = {
            wait: true
            , success: successCallbackSpy
            , error: errorCallbackSpy
          };

          testModel.save(data, options);

        });

        waitsFor(function() {
          return successCallbackSpy.wasCalled || errorCallbackSpy.wasCalled;
        }, "Parse server took too long to respond", 10000);

        runs(function() {
          expect(successCallbackSpy).toHaveBeenCalled();
          expect(errorCallbackSpy).not.toHaveBeenCalled();
        });

      });

      it("should be able to save an existing object to Parse", function() {
      });

      it("should be able to delete an object from Parse", function() {
      });

    });

  });

  describe("BaseCollection", function() {

    it("should exist", function() {
      expect(Uptimr.BaseCollection).toBeDefined();
    });

  });

});
