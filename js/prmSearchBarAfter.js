/* Online only message
 * Adds a clarifying message for the online search scope results page.
 */
app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchBarAfterController',
    template: '<div id="scopeLimitationMessage" class="hidden"><p>Only showing items available online. <a href="/discovery/search?query={{$ctrl.getQuery()}}&tab=Everything&search_scope=MyInst_and_CI&vid=01CDL_SCR_INST:USCS&offset=0">Click to include print and other physical items.</a></p></div>',
});

app.controller('SearchBarAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;
  vm.getQuery = getQuery;
  // Only present this information on the Available Online scope.
  // This changes asynchronously, so we need to check on an interval.
  // TODO: This could be more elegant with a watch for scope change.
  var checkScopeInterval = window.setInterval(function(){
    if (vm.parentCtrl.$stateParams.tab == 'AvailableOnline') {
      document.getElementById("scopeLimitationMessage").classList.remove('hidden');
    } else {
      document.getElementById("scopeLimitationMessage").classList.add('hidden');
    }
  }, 1000);

  function getQuery() {
    $rootScope.$emit("UcscGetQuery", {});
    return $rootScope.ucscQuery;
  }
}]);
