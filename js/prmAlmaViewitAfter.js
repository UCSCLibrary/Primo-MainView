/*
 *  Checks for journals, to show a manual ILL link in the template
 */

app.component('prmAlmaViewitAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmAlmaViewitAfter',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmAlmaViewitAfter.html',
});

app.controller('prmAlmaViewitAfter', ['$scope', '$rootScope', function($scope, $rootScope){
  this.$onInit = function () {
    var vm = this;
    vm.showJournalILL = false;
    if(vm.parentCtrl.item.pnx.display.type[0] == "journal") {
      vm.showJournalILL = true;
    }

    vm.isLoggedIn = function() {
      let indicator = document.getElementById('loggedInIndicator');
      if (indicator){
        if ((indicator.innerText == "nui.aria.signInSuccess") || (indicator.innerText == "Sign in successful")) {
          return true;
        }
      }
      return false;
    }
  }
}]);
