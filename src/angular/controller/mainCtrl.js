commonApp.controller("mainCtrl", ['$rootScope', '$scope', '$location', '$timeout', 'mainService', function($rootScope, $scope, $location, $timeout, mainService) {

	var editAccountsDialog = angular.element('#editAccounts');
	$scope.currentProduct = null;
	$scope.currentDay = moment().date();

	$scope.init = function () {
        $scope.months = ['本月', '下月'];
        $scope.listProducts();
	};

	//list
	$scope.listProducts = function () {
		mainService.getProductList().then(function(data){
			if(data.header.code === 0){
				$scope.products = data.body;

				$scope.totals = [];
				var curMonTotals = $scope.products.reduce(function(prev, cur) {
				    return Number(cur.curMon) + Number(prev);
				}, 0);

				var nextMonTotals = $scope.products.reduce(function(prev, cur) {
				    return Number(cur.nextMon) + Number(prev);
				}, 0);

				$scope.totals.push(curMonTotals, nextMonTotals);
			}
		});
	};

	//add
	$scope.addProduct = function(product){
		mainService.addProduct(product).then(function(data){
			if(data.header.code == 0){
				editAccountsDialog.modal('hide');
				$scope.listProducts();
				$timeout(function(){
					alert('添加成功！');
				},1000);
			}
		});
	};

	// update
	$scope.updateProduct = function (product) {
		mainService.updateProduct(product).then(function(data){
			if(data.header.code == 0){
				editAccountsDialog.modal('hide');
				$scope.listProducts();
				$timeout(function(){
					alert('编辑成功！');
				},1000);
			}
		});
	};

	//delete
	$scope.deleteProduct = function (id) {
		var result = confirm('是否删除！');  
	    if(result){ 
	    	mainService.deleteProduct(id).then(function(data){
	    		if(data.header.code == 0){
					editAccountsDialog.modal('hide');
					$scope.listProducts();
					$timeout(function(){
						alert('删除成功！');
					},1000);
				}
	    	});
	    }
	};

	//queryById
	$scope.queryById = function (id) {
	    mainService.queryById(id).then(function(data){
    		if(data.header.code == 0){
				console.log(data)
			}
    	});
	};

	$scope.editOrCreateProduct = function (product) {
		$scope.currentProduct = product ? angular.copy(product) : {};
		$scope.isEdit = angular.equals({}, $scope.currentProduct) ? false : true;
		editAccountsDialog.modal('show');
	};

	$scope.saveEdit = function(product) {
		editAccountsDialog.modal('hide');
		if(angular.isDefined(product.id)) {
			$scope.updateProduct(product);
		} else {
			$scope.addProduct(product);
		}
	};
	
}]);