/*  
 *  Hides hold requests if there are none 
 */
app.component('prmLocationItemsAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'LocationItemsAfterController',
});

app.controller('LocationItemsAfterController', ['$scope', function($scope){
    var vm = this.parentCtrl;
    var statement = null;

    this.$onInit = function () {
      // Keep checking until the availability statement loads
      var availabilityInterval = window.setInterval(function(){
        if (statement == null) {
          statement = vm.loc.location.availabilityStatement;
        }
        else {
          // Stop the interval and check if statement needs updating
          clearInterval(availabilityInterval);
          if (statement.includes(", 0 holds")) {
            statement = statement.replace(", 0 holds", "");
            // Find the p element and replace the text.
            var paragraph = document.evaluate("//p[@ng-if='$ctrl.currLoc.location.availabilityStatement']", document, null, XPathResult.ANY_TYPE, null );
            paragraph = paragraph.iterateNext();
            paragraph.innerHTML = statement;
          }
        }
      }, 100);
    };
}]);
