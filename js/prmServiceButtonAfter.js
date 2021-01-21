/*
 *  Overrides Primo's default behavior of not showing the public note on GES
 *  when they appear as a 'service button' in the GetIt tab.
 */
app.component('prmServiceButtonAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'ServiceButtonAfterController',
    template: '<span class="italic-text weak-text public-note">{{$ctrl.publicNote}}</span>',
});

app.controller('ServiceButtonAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;
  console.log(vm.parentCtrl.service);
  if (vm.parentCtrl.service.type == "Request through Interlibrary Loan") {
  	vm.publicNote = "Free service, request single book chapters during closure of in-person services due to COVID-19";
  }
}]);
