commonApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.hashPrefix(''); // 1.6.x版本使用路由功能需加上这句 
	
	$routeProvider
	.when('/login', {
		templateUrl: './angular/views/login.html',
		controller:'loginCtrl'
	}).when('/main', {
		templateUrl: './angular/views/main.html',
		controller:'mainCtrl'
	}).otherwise({
		redirectTo: '/login'
	})
}])