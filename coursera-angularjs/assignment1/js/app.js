(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.lunchMenu = "";
  
  $scope.check = function () {
    if( $scope.lunchMenu.length ) {
			$scope.msgClass="text-success";
			var menuArray = $scope.lunchMenu.split(",");
			if (menuArray.length > 3) {
				$scope.message = "Too much!"
			} else {
				$scope.message = "Enjoy!"
			}
		} else {
			$scope.msgClass="text-danger";
			$scope.message = "Please enter data first"
		}
  };
  
}

})();
