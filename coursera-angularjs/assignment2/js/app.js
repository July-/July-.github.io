(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController);

function ShoppingListCheckOffService () {
	var service = this,
		listToBuy = [
			{name: "apples", quantity: 10},
			{name: "cake", quantity: 1},
			{name: "milk", quantity: 3},
			{name: "eggs", quantity: 10},
			{name: "fish", quantity: 2}
		],
		alreadyBoughtList = [];
		
	service.uncheckItem = function(itemIndex) {
		alreadyBoughtList.push(listToBuy[itemIndex]);
		listToBuy.splice(itemIndex, 1);
	}
	
	service.getItems1 = function () {
    return listToBuy;
  };
	
	service.getItems2 = function () {
    return alreadyBoughtList;
  };
		
}


ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
	var ctrl1 = this;
	
  ctrl1.uncheckItem = function(itemIndex) {
		ShoppingListCheckOffService.uncheckItem(itemIndex);
	}
	
	ctrl1.listToBuy = ShoppingListCheckOffService.getItems1();
}

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
	var ctrl2 = this;
	
	ctrl2.alreadyBoughtList = ShoppingListCheckOffService.getItems2();
}

})();
