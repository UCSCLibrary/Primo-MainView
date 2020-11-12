/*
 *  Trial databases
 */

app.component('prmSearchResultJournalIndicationLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultJournalIndicationLineAfter',
    template: `<div class="trial-indicator"></div>`,
});

app.controller('prmSearchResultJournalIndicationLineAfter', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;
  if(typeof vm.parentCtrl.item.pnx.display.lds13 !== "undefined") {
    if (vm.parentCtrl.item.pnx.display.lds13.indexOf('*TRIALS*') >= 0) {
      var recordID = "SEARCH_RESULT_RECORDID_alma" + vm.parentCtrl.item.pnx.display.mms;
      var trialNode = document.getElementById(recordID).getElementsByClassName("trial-indicator")[0];
      trialNode.innerHTML = '<img src="/discovery/custom/01CDL_SCR_INST-USCS/img/stopwatch.png" width="20" height="20" /><span>Trial Database</span>';
    }
  }
}]);
