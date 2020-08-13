/*
 * Add Haven't Found box
 *
 */
app.controller('SearchResultListAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;
  vm.queryStringMelvyl = getQuery('melvyl');
  vm.queryStringHathi = getQuery('hathi');

  // Create a listener for other components trying to get the query.
  $rootScope.$on("UcscGetQuery", function(event, format){
    $rootScope.ucscQuery = getQuery(format[0]);
    event.stopPropagation();
  });

  // Libchat script
  var libchat = document.createElement("script");
  libchat.src = "https://v2.libanswers.com/load_chat.php?hash=d01223b2d5b712cc1cf9015fef8fa534";
  document.head.appendChild(libchat);

  // Returns the query as a string in a format ready to export
  function getQuery(format = 'primo') {
    //console.log(format);
    var query = vm.parentCtrl.$stateParams.query;
    // For advanced search, iterate through query array and format its elements.
    if (typeof query === 'object') {
      for (var i = 0; i < query.length; i++) {
        console.log(query);
        query[i] = formatQuery(query[i], format, i);
        // Check the last element for the extraneous " AND"
        if (i == (query.length - 1)) {
          query[i] = (query[i].endsWith(' AND')) ? query[i].trimRight(' AND') : query[i];
        }
      }
      // Combine the query into a single string
      query = (format == 'primo') ? query.join('&query=') : query.join(' ');
    } else {
      // For basic search query is a string, so just format the one piece.
      query = formatQuery(query, format, 0);
      query = (query.endsWith(' AND')) ? query.trimRight(' AND') : query;
    }
    return query;
  }

  function formatQuery(query, format, i) {
    i++; // For hathi, the index of the query part matters
    var parts = query.split(',');

    switch(format) {

      case 'primo':
        break;

      case 'melvyl':
        var field = 'foo';
        switch(parts[0]) {
          case 'title':
            field = 'ti:(foo)';
            break;
          case 'sub':
            field = 'su:(foo)';
            break;
          case 'creator':
            field = 'au:(foo)'
            break;
        }
        query = field.replace('foo', parts[2]);
        // If there's a boolean at the end, add it back on
        if(typeof parts[3] !== 'undefined') {
          query += ' ' + parts[3];
        }
        break;

      case 'hathi':
        var field = 'ocr';
        var match = 'all';
        if (parts[0] == 'title') field = 'title';
        if (parts[0] == 'sub') field = 'subject';
        if (parts[0] == 'creator') field = 'author';
        if (parts[1] == 'exact') match = 'phrase';
        query = 'q' + i + '=' + parts[2] + ';field' + i + '=' + field + ';anyall' + i + '=' + match + ';';
    }

    return query;
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
        <md-list-item role="listitem" class="_md-no-proxy _md"><span><a href="https://ucsc.on.worldcat.org/external-search?queryString={{$ctrl.queryStringMelvyl}}" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/Melvyl_logo_0.png" width="30" height="30" />Melvyl</a></span></md-list-item>
        <md-list-item role="listitem" class="_md-no-proxy _md"><span><a href="https://babel.hathitrust.org/cgi/ls?{{$ctrl.queryStringHathi}}a=srchls;lmt=ft&signon=swle:urn:mace:incommon:ucsc.edu" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/HathiTrust_icon.png" width="30" height="30" />HathiTrust</a></span></md-list-item>
      </div>

  </md-card-content>
</md-card>`
});