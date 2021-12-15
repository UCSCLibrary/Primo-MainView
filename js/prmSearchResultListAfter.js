/*
 * Add Didn't Find It box
 * Links to the Worldcat Scope
 * Embeds Libchat form widget
 *
 */
app.controller('SearchResultListAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;

  // Make search parameters available to the template
  vm.tab = vm.parentCtrl.$stateParams.tab;
  vm.vid = vm.parentCtrl.$stateParams.vid;
  vm.search_scope = vm.parentCtrl.$stateParams.search_scope;

  // Advanced search queries are objects. Get the query in a string
  if (typeof vm.parentCtrl.$stateParams.query === 'object') {
    vm.queryString = vm.parentCtrl.$stateParams.query.join('&query=');
    // Advanced searches now need to be called out in the URL
    vm.queryString = vm.queryString + '&mode=advanced';
  } else {
    vm.queryString = vm.parentCtrl.$stateParams.query;
  }

  // Add Libchat script to the document header.
  var libchat = document.createElement("script");
  libchat.src = "https://v2.libanswers.com/load_chat.php?hash=d01223b2d5b712cc1cf9015fef8fa534";
  document.head.appendChild(libchat);

  // To tell the template whether or not it's on Worldcat scope.
  this.notWorldCat = function() {
    return (vm.search_scope == "Worldcat") ? false : true;
  }
}]);

app.component('prmSearchResultListAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchResultListAfterController',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmSearchResultListAfter.html',
});