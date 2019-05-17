commonApp.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', 'loginService', function($rootScope, $scope, $http, $location, loginService){

	$scope.authenticate = function (name, password) {
		loginService.login(name, password).then(function(data){
			if(data.header.code == 0){
				sessionStorage.setItem('user',angular.toJson(data.body));
				$location.path('/main');
			}else{
				$location.path('/login');
				$scope.authenticationError = true;
			}
		});
	};
	
}]);