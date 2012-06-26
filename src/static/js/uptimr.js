var Uptimr = { views: {}, models: {}, collections: {} };
var Parse = { appId: 'PXsT5VE2Qaizs3yDnR8QtfQdSRp0vxQTI9eUOa15'
              , restKey: 'oKwodD8WETS50UHf16TLTNAcLHfJR6bh9fgiFjxh'
              , baseUrl: 'https://api.parse.com'
              , apiVersion: '1' };


(function($, undefined) {

Uptimr.sync = function(method, model, options) {

  // Add Parse headers for authentication
  var newOptions = _.extend({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Parse-Application-Id', Parse.appId);
      xhr.setRequestHeader('X-Parse-REST-API-Key', Parse.restKey);
    }
  }, options);

  if (method == 'update' || method == 'create') {
    // Remove Parse reserved attributes
    delete model.attributes.createdAt;
    delete model.attributes.updatedAt;
  }

  // Call original Backbone.sync method
  Backbone.sync(method, model, newOptions);

};

Uptimr.BaseView = Backbone.View.extend();

Uptimr.BaseModel = Backbone.Model.extend({

  // Parse classname
  className: ''

  // We tell backbone that Parse saves the
  // object id to objectId attribute
  , idAttribute: 'objectId'

  // We use our custom sync that works with Parse
  , sync: Uptimr.sync

  , urlRoot: function() {
    return Parse.baseUrl + '/' + Parse.apiVersion + '/classes/' + this.className;
  }

});

Uptimr.BaseCollection = Backbone.Collection.extend({

  sync: Uptimr.sync

  , url: function() {
    return new this.model().urlRoot();
  }

});

})(jQuery);
