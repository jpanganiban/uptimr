var Uptimr = { views: {}, models: {}, collections: {} };
var Parse = { appId: 'PXsT5VE2Qaizs3yDnR8QtfQdSRp0vxQTI9eUOa15'
              , restKey: 'oKwodD8WETS50UHf16TLTNAcLHfJR6bh9fgiFjxh'
              , baseUrl: 'https://api.parse.com'
              , apiVersion: '1' };


(function($, undefined) {

Uptimr.sync = function(method, model, options) {

  var newOptions = _.extend({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-Parse-Application-Id', Parse.appId);
      xhr.setRequestHeader('X-Parse-REST-API-Key', Parse.restKey);
    }
  }, options);

  Backbone.sync(method, model, newOptions);

};

Uptimr.BaseView = Backbone.View.extend();

Uptimr.BaseModel = Backbone.Model.extend({

  className: ''

  , sync: Uptimr.sync

  , urlRoot: function() {
    return Parse.baseUrl + '/' + Parse.apiVersion + '/classes/' + this.className;
  }

});

Uptimr.BaseCollection = Backbone.Collection.extend();

})(jQuery);
