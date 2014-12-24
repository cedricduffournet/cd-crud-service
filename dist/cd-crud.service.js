(function () {
  'use strict';


  angular.module('cd.crud')
    .factory('cdCrud', cdCrud);

  cdCrud.$inject = ['$resource', '$q', 'cdCrudProvider'];

  /* @ngInject */
  function cdCrud($resource, $q, cdCrudProvider) {

    var id = 0;

    var apiOptions = {
      'findAll': {
        method: 'GET',
        params: {},
        url: cdCrudProvider.urlFindAll
      },
      'find': {
        method: 'GET',
        params: {id: '@id'},
        url: cdCrudProvider.urlFind
      },
      'put': {
        method: 'PUT',
        params: {id: '@id'},
        url: cdCrudProvider.urlPut
      },
      'deleteItem': {
        method: 'DELETE',
        params: {id: '@id'},
        url: cdCrudProvider.urlDeleteItem
      }
    };


    var api = $resource(cdCrudProvider.urlPost,
      {id: '@id'},
      apiOptions);

    var emitOnDelete = 'delete';

    var service = {
      findAll: findAll,
      find: find,
      put: put,
      post: post,
      emitOnDelete: emitOnDelete,
      deleteItem: deleteItem
    };

    return service;


    function findAll() {

      var deferred = $q.defer();
      var data = api.findAll();
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
  }


}());