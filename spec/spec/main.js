describe("Main Application", function() {

  describe("Uptimr namespace", function() {

    it("should exist", function() {
      expect(Uptimr).toBeDefined();
    });

    it("should have 'views' object", function() {
      expect(Uptimr.views).toBeDefined();
    });

    it("should have 'models' object", function() {
      expect(Uptimr.models).toBeDefined();
    });

    it("should have 'collections' object", function() {
      expect(Uptimr.collections).toBeDefined();
    });

  });

});
