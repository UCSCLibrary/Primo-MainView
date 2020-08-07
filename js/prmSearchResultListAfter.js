/*
 * Add Haven't Found box
 *
 */
app.controller('SearchResultListAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;
  vm.getQuery = getQuery;

  // Create a listener for other components trying to get the query.
  $rootScope.$on("UcscGetQuery", function(){
    $rootScope.ucscQuery = getQuery();
  });

  // Libchat script
  var libchat = document.createElement("script");
  libchat.src = "https://v2.libanswers.com/load_chat.php?hash=d01223b2d5b712cc1cf9015fef8fa534";
  document.head.appendChild(libchat);

  // TODO: Move to SearchBarAfter
  // TODO: Refactor to include boolean operators and advanced search where possible
  // TODO: Refactor to return strings formatted for Melvyl, Hathi, etc
  function getQuery() {
    var queryString = vm.parentCtrl.query;
    if (queryString.includes(",AND;")) {
      var queryString = queryString.split(",AND;");
      var queryString = queryString[0];
    } else if (queryString.includes(",OR;")) {
      var queryString = queryString.split(",OR;");
      var queryString = queryString[0];
    } else if (queryString.includes(",NOT;")) {
      var queryString = queryString.split(",NOT;");
      var queryString = queryString[0];
    } else if (queryString.includes(",AND")) {
      var queryString = queryString.split(",AND");
      var queryString = queryString[0];
    } else {
      var queryString = vm.parentCtrl.query;
    }
    return queryString;
  }
  var checkResultsInterval;
  checkResultsInterval = window.setInterval(function(){
    var resultCount = angular.element( document.querySelector( 'prm-no-search-result' ) );
    if (Object.keys(resultCount).length === 0) {
      document.getElementById("haventFoundBox").classList.remove('hidden');
    }
  }, 2000)
}]);

app.component('prmSearchResultListAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchResultListAfterController',
    template: `
  <md-card id="haventFoundBox" class="hidden">
  <md-card-title>
    <md-card-title-text>
      <span class="md-headline">Haven\'t found what you\'re looking for?</span>
    </md-card-title-text>
  </md-card-title>
  <md-card-content>
      <div>
        <span class="md-subheadline">Chat with us for help</span>
        <div id="libchat_d01223b2d5b712cc1cf9015fef8fa534"></div>
      </div>

      <div role="list" class="md-primoExplore-theme">
        <span class="md-subheadline">Try your search again in...</span>
        <md-list-item role="listitem" class="_md-no-proxy _md"><span><a href="https://ucsc.on.worldcat.org/external-search?queryString={{$ctrl.getQuery()}}" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/Melvyl_logo_0.png" width="30" height="30" />Melvyl</a></span></md-list-item>
        <md-list-item role="listitem" class="_md-no-proxy _md"><span><a href="https://babel.hathitrust.org/cgi/wayf?target=https%3A%2F%2Fbabel.hathitrust.org%2Fcgi%2Fls%3Ffield1%3Docr%3Bq1%3D{{$ctrl.getQuery()}}%3Ba%3Dsrchls%3Blmt%3Dft" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/HathiTrust_icon.png" width="30" height="30" />HathiTrust</a></span></md-list-item>
      </div>

  </md-card-content>
</md-card>`
});