commonApp.service('mainService', ['$cacheFactory', '$q', '$http', 'config', function($cacheFactory, $q, $http, config) {
    var cache = $cacheFactory('mainService');
    var localhost = config.localhost;

    // list
    this.getProductList = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: localhost + '/product/queryAll',
        }).then(function (response) {
            deferred.resolve(response.data);
        });

        return deferred.promise;
    };

    //add
    this.addProduct = function(product){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: localhost + '/product/addProduct',
            data: product
        }).then(function (response) {
            deferred.resolve(response.data);
        });

        return deferred.promise;
    };

    //update
    this.updateProduct = function(product){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: localhost + '/product/updateProduct',
            data: product
        }).then(function (response) {
            deferred.resolve(response.data);
        });

        return deferred.promise;
    };

    //delete
    this.deleteProduct = function(id){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: localhost + '/product/deleteProduct?id=' + id,
        }).then(function (response) {
            deferred.resolve(response.data);
        });

        return deferred.promise;
    };

    //queryById
    this.queryById = function(id){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: localhost + '/product/queryById?id=' + id,
        }).then(function (response) {
            deferred.resolve(response.data);
        });

        return deferred.promise;
    };
}]);