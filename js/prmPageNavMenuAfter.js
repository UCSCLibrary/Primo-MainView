/*
 *  Adds a Melyvl "didn't find it?" box on search results
 */
 /*
app.component('prmPageNavMenuAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'PageNavMenuAfterController',
    template: `
<md-card id="melvylRequestBox">
  <md-card-title>
    <md-card-title-text>
      <span class="md-headline">Didn't Find It?</span>
    </md-card-title-text>
    <button class="zero-margin md-primoExplore-theme md-ink-ripple button-with-icon" type="button" aria-label="Dismiss" ng-click="onClose()">
      <prm-icon icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px" class="ng-scope ng-isolate-scope">
        <md-icon md-svg-icon="navigation:ic_close_24px" alt="" class="ng-scope md-primoExplore-theme" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 24 24" id="ic_close_24px" y="240" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </md-icon>
        <prm-icon-after parent-ctrl="$ctrl"></prm-icon-after>
      </prm-icon>
    </button>
  </md-card-title>
  <md-card-content>
    <p><a href="https://ucsc.on.worldcat.org/external-search?queryString={{$ctrl.queryString}}" target="_blank">Request through Melvyl</a> to borrow books chapters and articles electronically</p>
  </md-card-content>
</md-card>`,
});

app.controller('PageNavMenuAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;

  this.$onInit = function() {
    $scope.card = angular.element(document.getElementById("melvylRequestBox"));
    $rootScope.$emit("UcscGetQuery", ['melvyl']);
    vm.queryString = $rootScope.ucscQuery;
  }

  $scope.onClose = function() {
    $scope.card.addClass('hidden');
  }
}]);
*/