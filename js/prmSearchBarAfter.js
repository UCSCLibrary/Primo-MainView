/* UC Library Search logo
 * Code adapted from CSU Central Package by David Walker
 * https://github.com/dswalker/csu-central-package/
 *
 * Online only message
 * Adds a clarifying message for the online search scope results page.
 */
app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchBarAfterController',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmSearchBarAfter.html',
});

app.controller('SearchBarAfterController', ['$scope', '$rootScope', '$location', '$window', function($scope, $rootScope, $location, $window){
  var vm = this;

  // Only present this information on the Available Online scope.
  // This changes asynchronously, so we need to check on an interval.
  // TODO: This could be more elegant with a watch for scope change.
  var checkScopeInterval = window.setInterval(function(){
    if (vm.parentCtrl.$stateParams.tab == 'AvailableOnline') {
      document.getElementById("scopeLimitationMessage").classList.remove('hidden');
    } else {
      document.getElementById("scopeLimitationMessage").classList.add('hidden');
    }
    // Update the search query if needed
    if (typeof vm.parentCtrl.$stateParams.query === 'object') {
      vm.queryString = vm.parentCtrl.$stateParams.query.join('&query=');
    } else {
      vm.queryString = vm.parentCtrl.$stateParams.query;
    }
  }, 1000);

  this.navigateToHomePage = function () {
    var params = $location.search();
    console.log(params);
    var vid = params.vid;
    var lang = params.lang || "en_US";
    var split = $location.absUrl().split('/discovery/');

    if (split.length === 1) {
      console.log(split[0] + ' : Could not detect the view name!');
      return false;
    }

    var baseUrl = split[0];
    $window.location.href = baseUrl + '/discovery/search?vid=' + vid + '&lang=' + lang;
    return true;
  };
}]);
