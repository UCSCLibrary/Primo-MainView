/*
 *  Overrides Primo's default behavior of not showing the public note on GES
 *  when they appear as a 'service button' in the GetIt tab.

 * Commenting out completely: ILL will no longer use a GetIt GES, but instead appear
 * in the HowToGetIt section as the Alma default resource sharing request.
 
app.component('prmServiceButtonAfter', {
    bindings: { parentCtrl: '<' },
    //controller: 'ServiceButtonAfterController',
    template: '<span class="italic-text weak-text public-note">{{$ctrl.publicNote}}</span>',
});

app.controller('ServiceButtonAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;

  if (vm.parentCtrl.service.type == "Request through Interlibrary Loan") {
  	vm.publicNote = "Request single book chapters during closure of in-person services due to COVID-19";
  }
}]);
*/
