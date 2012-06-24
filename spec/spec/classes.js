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
        }, "Parse server took too long to respond", 10000);

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
              expect("There was the ajax request").toEqual(true);
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
          }, "Parse server took too long to respond", 10000);

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
          }, "Parse server took too long to respond", 10000);

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

  });

});
