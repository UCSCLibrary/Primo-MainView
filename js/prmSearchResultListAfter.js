/*
 * Add Haven't Found box
 *
 */
app.controller('SearchResultListAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;
  //vm.queryStringMelvyl = getQuery('melvyl');
  //vm.queryStringHathi = getQuery('hathi');

  if (typeof vm.parentCtrl.$stateParams.query === 'object') {
      vm.queryString = vm.parentCtrl.$stateParams.query.join('&query=');
    } else {
      vm.queryString = vm.parentCtrl.$stateParams.query;
    }

  // Create a listener for other components trying to get the query.
  $rootScope.$on("UcscGetQuery", function(event, format){
    $rootScope.ucscQuery = getQuery(format[0]);
    event.stopPropagation();
  });

  // Libchat script
  var libchat = document.createElement("script");
  libchat.src = "https://v2.libanswers.com/load_chat.php?hash=d01223b2d5b712cc1cf9015fef8fa534";
  document.head.appendChild(libchat);

  // To tell the template whether or not it's on Worldcat scope.
  this.notWorldCat = function() {
    return (vm.parentCtrl.$stateParams.search_scope == "Worldcat") ? false : true;
  }

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
  var noResultCounter = 0;
  checkResultsInterval = window.setInterval(function(){
    // No endless loops
    if (noResultCounter > 100) {
      clearInterval(checkResultsInterval);
    }
    var resultCount = angular.element( document.querySelector( 'prm-no-search-result' ) );
    if (Object.keys(resultCount).length === 0) {
      let box = document.getElementById("findItBox");
      if (box) {
        box.classList.remove('hidden');
        clearInterval(checkResultsInterval);
      }
    noResultCounter++;
    }
  }, 2000)
}]);

app.component('prmSearchResultListAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchResultListAfterController',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmSearchResultListAfter.html',
});