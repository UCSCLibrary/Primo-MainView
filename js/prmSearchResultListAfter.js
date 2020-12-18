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
  function getQuery(format = 'melvyl') {
    // For advanced search query is an object, iterate through the array and format its elements.
    if (typeof vm.parentCtrl.$stateParams.query === 'object') {
      var query = vm.parentCtrl.$stateParams.query.slice();
      for (var i = 0; i < query.length; i++) {
        query[i] = formatQuery(query[i], format, i);
        // Check the last element for the extraneous " AND"
        if (i == (query.length - 1)) {
          query[i] = (query[i].endsWith(' AND')) ? query[i].replace(' AND','') : query[i];
        }
      }
      // Combine the query into a single string, no spaces in combined hathi queries
      query = (format == 'hathi') ? query.join('') : query.join(' ');
    } else {
      // For basic search query is a string, so just format the one piece.
      var query = vm.parentCtrl.$stateParams.query;
      query = formatQuery(query, format, 0);
      query = (query.endsWith(' AND')) ? query.trimRight(' AND') : query;
    }
    return query;
  }

  function formatQuery(query, format, i) {
    i++; // For hathi, the index of the query part matters
    var parts = query.split(',');

    switch(format) {

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
      document.getElementById("findItBox").classList.remove('hidden');
    }
  }, 2000)
}]);

app.component('prmSearchResultListAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchResultListAfterController',
    template: `
  <md-button id='findItButton' class='md-raised' onclick="document.getElementById('findItBox').scrollIntoView({behavior: 'smooth'});">Didn't Find It ?</md-button>
  <a name="findItBox"></a>
  <md-card id="findItBox" class="hidden">
  <md-card-title>
    <md-card-title-text>
      <span class="md-headline">Didn\'t find it?</span>
    </md-card-title-text>
  </md-card-title>
  <md-card-content>
      <div>
        <span class="md-subheadline">Chat with us for help</span>
        <p>We can help you find resources, start your research, cite your sources, and more!</p>
        <div id="libchat_d01223b2d5b712cc1cf9015fef8fa534"></div>
      </div>

      <div role="list" class="md-primoExplore-theme">
        <span class="md-subheadline">Try your search again</span>
        <md-list-item role="listitem" class="_md-no-proxy _md">
          <div>
            <a href="https://ucsc.on.worldcat.org/external-search?queryString={{$ctrl.queryStringMelvyl}}" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/Melvyl_logo_0.png" width="35" height="35" alt="Melvyl Logo" /></a>
          </div>
          <div>
            <p><a href="https://ucsc.on.worldcat.org/external-search?queryString={{$ctrl.queryStringMelvyl}}" target="_blank">Melvyl</a></p>
            <p>Request book chapters and articles from other libraries</p>
          </div>
        </md-list-item>
        <md-list-item role="listitem" class="_md-no-proxy _md">
          <div>
            <a href="https://babel.hathitrust.org/cgi/ls?{{$ctrl.queryStringHathi}}a=srchls;lmt=ft&signon=swle:urn:mace:incommon:ucsc.edu" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/HathiTrust_icon.png" width="35" height="35" alt="HathiTrust Logo" /></a>
          </div>
          <div>
            <p><a href="https://babel.hathitrust.org/cgi/ls?{{$ctrl.queryStringHathi}}a=srchls;lmt=ft&signon=swle:urn:mace:incommon:ucsc.edu" target="_blank">HathiTrust</a></p>
            <p>Digitized books and journals from the UC's physical collections</p>
          </div>
        </md-list-item>

        <span class="md-subheadline" style="margin-top:15px;">Tell us what you need</span>
        <md-list-item role="listitem" class="_md-no-proxy _md">
          <div>
            <a href="https://guides.library.ucsc.edu/item-request"><img src="https://library.ucsc.edu/sites/default/files/request-icon.png" width="35" height="35" /></a>
          </div>
          <div>
            <p><a href="https://guides.library.ucsc.edu/item-request">Request an Item</a></p>
          </div>
        </md-list-item>
      </div>

  </md-card-content>
</md-card>`
});