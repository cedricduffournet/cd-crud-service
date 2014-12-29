(function () {
  'use strict';


  angular.module('cd.crud')
    .factory('cdCrud', cdCrud);

  cdCrud.$inject = ['$resource', '$q'];

  /* @ngInject */
  function cdCrud($resource, $q) {
    function cdCrudFactory(routes) {
      var id = 0;

      var apiOptions = {
        'findAll': {
          method: 'GET',
          url: routes.urlFindAll
        },
        'find': {
          method: 'GET',
          url: routes.urlFind
        },
        'put': {
          method: 'PUT',
          url: routes.urlPut
        },
        'deleteItem': {
          method: 'DELETE',
          url: routes.urlDeleteItem
        },
        'paramsForm': {
          method: 'GET',
          url: routes.urlParamsForm
        }
      };


      var api = $resource(routes.urlPost,
        {id: '@id'},
        apiOptions);

      var emitOnDelete = 'delete';

      var service = {
        findAll: findAll,
        find: find,
        put: put,
        post: post,
        emitOnDelete: emitOnDelete,
        deleteItem: deleteItem,
        paramsForm: paramsForm
      };

      function findAll(params) {

        var deferred = $q.defer();
        var data = api.findAll(params);
        data.$promise
          .then(function (response) {
            deferred.resolve(response);
          },
          function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }


      function find(pId) {
        id = pId;
        var deferred = $q.defer();
        var data = api.find({id: id});
        data.$promise
          .then(function (response) {
            deferred.resolve(response);
          },
          function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }


      function put(id, dataPut) {

        var deferred = $q.defer();

        var data = api.put({id: id}, dataPut);

        data.$promise
          .then(function (response) {
            deferred.resolve(response);
          },
          function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }


      function post(dataPost) {

        var deferred = $q.defer();

        var data = api.save(dataPost);

        data.$promise
          .then(function (response) {
            deferred.resolve(response);
          },
          function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }

      function deleteItem(id) {
        var deferred = $q.defer();

        var data = api.deleteItem({id: id});

        data.$promise
          .then(function (response) {
            deferred.resolve(response);
          },
          function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }

      function paramsForm() {

        var deferred = $q.defer();
        var data = api.paramsForm();
        data.$promise
          .then(function (response) {
            deferred.resolve(response);
          },
          function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }

      return service;

    }

    return cdCrudFactory;
  }


}());