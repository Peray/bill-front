var commonApp = angular.module('accounts', ['ngRoute', 'ngResource'])
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($location, $interval){
    	return {
	        request: function (config) {
	        //请求之前
	            return config;
	        },
	        response: function (config) {
	        //从返回头部获跳转

	            //设置超时自动退出
	            var intervalHandle = null;
	            var MAX_TIME = 10*60*1000;//设置超时时长为10分钟
	            var isLogin = angular.fromJson(sessionStorage.getItem('user'));//是否登录
	            if(isLogin){
	            	sessionStorage.setItem('lastVisitTime', new Date().getTime());//存储最后一次访问时间
	            	intervalHandle = $interval(function() {
	            		var lastVisitTime = sessionStorage.getItem('lastVisitTime');//获取最后一次访问时间
	            		if(!lastVisitTime){
	            			clearInterval(intervalHandle);
	            		}else{
	            			if((new Date()).getTime() - lastVisitTime > MAX_TIME){
	            				alert("由于您长时间未进行操作，系统已为您自动退出登录");
	            				$location.path('/login');
	            				sessionStorage.clear();
	            				clearInterval(intervalHandle);
	            			}
	            		}
	            	}, 10*1000);//10秒钟监听一次
	            };

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
        if(!angular.fromJson(sessionStorage.getItem('user'))){
	    	event.preventDefault();
	      	$location.path('/login');
       	}
    });
}])