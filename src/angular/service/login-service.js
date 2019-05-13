commonApp.service('loginService', function($cacheFactory, $q, $http, config) {
    var cache = $cacheFactory('loginService');
    var localhost = config.localhost;

    //登录
	this.login = function(name, password){
		var deferred = $q.defer();
        $http({
            method: 'POST',
            url: localhost + '/users/login',
            data: {
                'name': name,
                'password': password
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        });

        return deferred.promise;
	};
});