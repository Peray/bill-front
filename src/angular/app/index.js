var commonApp = angular.module('accounts', ['ngRoute', 'ngResource'])
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function (){
    	return {
	        request: function (config) {
	            //请求之前
	            //判断是否登陆.登陆后将token放到请求头部
	            // if (sessionStorage.getItem('user')) {
	            //     config.headers["TOKEN"] = JSON.parse(sessionStorage.getItem('user'));
	            // }
	            return config;
	        },
	        response: function (config, header, header1, header2) {
	            //从返回头部获跳转
	            if (config.headers("TOKEN")) {
	            	sessionStorage.setItem('user', JSON.stringify(config.headers("TOKEN")));
	            }
	            return config;
	        },
	        requestError: function (config) {
	        //请求之前错误
	            return config;
	        },
	        responseError: function (config) {
	            //请求之后错误
	            return config;
	        }
	    };
    });
}])
.run(['$rootScope', '$location', function($rootScope, $location){
     $rootScope.$on('$routeChangeStart', function(evt, next, current){
       	if(next.$$route.originalPath == '/login') return;
        if(!JSON.parse(sessionStorage.getItem('user'))){
	    	event.preventDefault();
	      	$location.path('/login');
       	}
    });
}])