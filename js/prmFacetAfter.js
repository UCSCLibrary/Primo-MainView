app.component('prmFacetAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'facetAfterController',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmFacetAfter.html'
});

app.controller('facetAfterController', ['$scope', '$location', function($scope, $location){
  var query = $location.search().query;
  var scope = $location.search().search_scope;
  var filter = $location.search().pfilter;
  $scope.queries = Array.isArray(query) ? query : query ? [query] : false;
  $scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false;

  this.notWorldcat = (scope == 'Worldcat') ? false : true;

  this.mapping = function (queries, filters) {
    const query_mappings = {
      'any': 'kw',
      'title': 'ti',
      'creator': 'au',
      'subject': 'su',
      'isbn': 'bn',
      'issn': 'n2'
    }
    try {
      return 'queryString=' + queries.map(part => {
        let terms = part.split(',')
        let type = query_mappings[terms[0]] || 'kw'
        let string = terms[2] || ''
        let join = terms[3] || ''
        return type + ':' + string + ' ' + join + ' '
      }).join('')
    }
    catch (e) {
      return ''
    }
  };

}]);
