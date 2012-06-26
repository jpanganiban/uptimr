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
        , testModel
        , successCallbackSpy
        , errorCallbackSpy;

      beforeEach(function() {
        // Inherit from BaseModel so we can set
        // the necessary attributes.
        TestModel = Uptimr.BaseModel.extend({
          className: 'test'
        });
        // Create testModel instance for testing.
        testModel = new TestModel();

        // Create spies
        successCallbackSpy = jasmine.createSpy('success callback');
        errorCallbackSpy = jasmine.createSpy('error callback');
      });

      afterEach(function() {
        // We delete the data after testing
        testModel.destroy({ wait: true });
        testModel = undefined;
      });

      it("should correctly construct its urlRoot", function() {
        expect(testModel.urlRoot()).toEqual(Parse.baseUrl + '/' +
           Parse.apiVersion + '/classes/' + testModel.className);
      });

      it("should be able to create to Parse", function() {

        runs(function() {
          var data = {
            team: 'manchesters united'
          }
          , options = {
            wait: true
            , success: successCallbackSpy
            , error: errorCallbackSpy
          };

          testModel.save(data, options);
        });

        waitsFor(function() {
          return successCallbackSpy.wasCalled || errorCallbackSpy.wasCalled;
        }, ajaxConfig.errorMessage, ajaxConfig.timeout);

        runs(function() {
          expect(successCallbackSpy).toHaveBeenCalled();
          expect(errorCallbackSpy).not.toHaveBeenCalled();
        });

      });

      describe("when this model exists", function() {

        beforeEach(function() {
          // We make sure that we have a model that 
          // exists in the Server
          runs(function() {
            var data = {
              team: 'manchesters united'
            }
            , options = {
              wait: true
              , success: successCallbackSpy
              , error: errorCallbackSpy
            };

            testModel.save(data, options);
          });

          waitsFor(function() {
            return successCallbackSpy.wasCalled || errorCallbackSpy.wasCalled;
          }, "Parse server took too long to respond", 10000);

          // FIXME: Raise a jasmine error so it shows in the web interface
          // than be thrown in the console. Unsure if unnecessary.
          runs(function() {
            if (errorCallbackSpy.wasCalled) {
              expect("There was an error with the ajax request").toEqual(true);
            }
          });

        });

        it("should be able to construct its url properly", function() {
          expect(testModel.url()).toEqual(testModel.urlRoot() + '/' + testModel.id);
        });

        it("should be able to update object", function() {
          var score = 1;

          runs(function() {
            var data = {
              score: score
            }
            , options = {
              wait: true
              , success: successCallbackSpy
              , error: errorCallbackSpy
            };

            testModel.save(data, options);
          });

          waitsFor(function() {
            return successCallbackSpy.wasCalled || errorCallbackSpy.wasCalled;
          }, ajaxConfig.errorMessage, ajaxConfig.timeout);

          runs(function() {
            expect(successCallbackSpy).toHaveBeenCalled();
            expect(errorCallbackSpy).not.toHaveBeenCalled();
            expect(testModel.get('score')).toEqual(score);
          });

        });

        it("should be able to delete object", function() {

          runs(function() {
            var options = {
              wait: true
              , success: successCallbackSpy
              , error: errorCallbackSpy
            };

            testModel.destroy(options);
          });

          waitsFor(function() {
            return successCallbackSpy.wasCalled || errorCallbackSpy.wasCalled;
          }, ajaxConfig.errorMessage, ajaxConfig.timeout);

          runs(function() {
            expect(successCallbackSpy).toHaveBeenCalled();
            expect(errorCallbackSpy).not.toHaveBeenCalled();
          });

        });

      });

    });

  });

  describe("BaseCollection", function() {

    it("should exist", function() {
      expect(Uptimr.BaseCollection).toBeDefined();
    });

    describe("Parse methods", function() {

      var TestCollection
        , testCollection
        , TestModel
        , testModel
        , successCallbackSpy
        , errorCallbackSpy
        , fixtureSpy
        , fixtureClassName;

      beforeEach(function() {
        // Create spies
        fixtureSpy = jasmine.createSpy('fixture spy');
        successCallbackSpy = jasmine.createSpy('success callback');
        errorCallbackSpy = jasmine.createSpy('error callback');

        // Create fixture
        fixtureClassName = 'test';
        TestModel = Uptimr.BaseModel.extend({
          className: fixtureClassName
        });
        
        runs(function() {
          var data = {
            score: 0
            , team: 'collection'
          }
          , options = {
            wait: true
            , success: fixtureSpy
            , error: fixtureSpy
          };

          testModel = new TestModel();

          testModel.save(data, options);
        });

        waitsFor(function() {
          return fixtureSpy.wasCalled;
        }, "", ajaxConfig.errorMessage, ajaxConfig.timeout);

        TestCollection = Uptimr.BaseCollection.extend({
          model: TestModel
        });

        testCollection = new TestCollection();
      });

      afterEach(function() {
        testModel.destroy({ wait: true });
        testModel = undefined;
        testCollection = undefined;
        // FIXME: Do we still have to remove it
        // everytime?
        fixtureClassName = null;
      });

      it("should be able to construct its url properly", function() {
        // Normally, it's just the same as its model's urlRoot
        expect(testCollection.url()).toEqual(testModel.urlRoot());
        // but better to be sure about it so we're checking it manually.
        expect(testCollection.url()).toEqual(Parse.baseUrl + '/' +
          Parse.apiVersion + '/classes/' + fixtureClassName);
      });

      it("should be able to fetch", function() {

        runs(function() {
          var options = {
            wait: true
            , success: successCallbackSpy
            , error: errorCallbackSpy
          };

          testCollection.fetch(options);
        });

        waitsFor(function() {
          return successCallbackSpy.wasCalled || errorCallbackSpy.wasCalled;
        }, ajaxConfig.errorMessage, ajaxConfig.timeout);

        runs(function() {
          expect(successCallbackSpy).toHaveBeenCalled();
          expect(errorCallbackSpy).not.toHaveBeenCalled();
          expect(testCollection.length).toEqual(1);
        });

      });

    });

  });

});
