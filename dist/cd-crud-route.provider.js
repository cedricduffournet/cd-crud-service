(function () {
  'use strict';


  angular.module('cd.crud')
    .provider('cdCrudProvider', cdCrudProvider);

  function cdCrudProvider() {
    /*jshint validthis:true */
    var vo = this;

    vo.routes = {
      urlFindAll: '',
      urlFind: '',
      urlPut: '',
      urlDeleteItem: '',
      urlPost: ''
    };

    vo.$get = getRoute;

    function getRoute() {
      var routes = vo.routes;
      return routes;
    }

  }


}());