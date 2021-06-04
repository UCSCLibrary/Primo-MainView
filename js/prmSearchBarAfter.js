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

app.controller('SearchBarAfterController', ['$location', '$window', function($location, $window){
  var vm = this;

  this.navigateToHomePage = function () {
    var params = $location.search();
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
