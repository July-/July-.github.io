(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.service('MenuSearchService', MenuSearchService)
.controller('NarrowItDownController', NarrowItDownController)
.directive('foundItemsDirective', foundItemsDirective)
.directive('loader', loaderDirective);

function loaderDirective () {
	var ddo = {
		templateUrl: 'loader/itemsloaderindicator.template.html',
		scope: {
			loaded: '<'
		}
	};
	return ddo;
}

function foundItemsDirective () {
	var ddo = {
		templateUrl: 'result.html',
		scope: {
			foundItems: '<',
			onRemove: '&',
			showErrorMsg: '<',
			searchError: '<'
		},
		controller: FoundItemsController,
		controllerAs: 'ctrl2',
		bindToController: true
	};
	return ddo;
}

function FoundItemsController() {
  var ctrl2 = this;

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {
	var service = this;
	
	service.getMatchedMenuItems = function(searchTerm) {
		return $http({
			url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
			method: 'GET'
		}).then(function (result) {
    // process result and only keep items that match
			var allItems = result.data.menu_items;
			var findItems = [];
			searchTerm = searchTerm.toLowerCase();
			for (var j=0; j<allItems.length; j++) {
        if (allItems[j].description.toLowerCase().match(searchTerm)) {
					findItems.push(allItems[j])
				}
			}
			// return processed items
			return findItems;
		}, function (error) {
			console.log("Could not load menu");
			return "Could not load menu";
		});
	}

}


NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
	var ctrl = this;
	ctrl.searchResult=[];
	ctrl.searchLoaded = true;
	ctrl.searchThis = '';
	ctrl.showErrorMsg = false;
	
	ctrl.foundItems = function(searchText) {
		ctrl.searchLoaded = false;
		ctrl.showErrorMsg = false;
		ctrl.searchResult = [];
		if (!searchText.length) {
			ctrl.showErrorMsg = true;
			ctrl.searchLoaded = true;
			return false;
		}
		ctrl.searchResultPromise = MenuSearchService.getMatchedMenuItems(searchText);
		ctrl.searchResultPromise.then(function (response) {
			ctrl.searchResult = response;
			ctrl.searchLoaded = true;
			if (!ctrl.searchResult.length) {
				ctrl.showErrorMsg = true;
			}
			if (ctrl.searchResult == "Could not load menu") {
				ctrl.searchError = true;
				ctrl.searchResult = [];
			}
		})
		.catch(function (error) {
			console.log("Something went terribly wrong.");
			ctrl.searchLoaded = true;
		});
	}
	
	ctrl.removeResult = function(itemIndex) {
		ctrl.searchResult.splice(itemIndex, 1);
	}
	
}



})();
