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

    // If its an S&E HT item, when the page loads change the availability statement.
    // This also happens for brief results in hathiTrustAvailability.js
    angular.element(document).ready(function() {
      if (vm.item) {
        if (vm.item.delivery.bestlocation) {
          if (vm.item.delivery.bestlocation.subLocationCode == 'setas') {
            // With the full result in modal, Primo returns multiple copies of this ID: change em all.
            var span = document.querySelectorAll("[id='" + vm.item.pnx.control.recordid[0] + "availabilityLine0']");
            if (span) {
              for(var i = 0; i < span.length; i++) {
                span[i].textContent = "No physical access";
              }
            }
            // Find and hide the "available" message in the holding info, do it on an interval because this bit
            // loads after document.ready.
            var holdingStatement = null;
            var holdingInterval = window.setInterval(function(){
              if (holdingStatement == null) {
                holdingStatement = document.evaluate("//p[@ng-if='$ctrl.currLoc.location.availabilityStatus']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
              } else {
                clearInterval(holdingInterval);
                holdingStatement.innerHTML = "No Physical Access " + vm.loc.location.callNumber;
              }
            }, 500);
          }
        }
      }
    });

}]);
