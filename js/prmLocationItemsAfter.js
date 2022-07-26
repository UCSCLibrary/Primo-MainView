/*  
 *  Hides hold requests if there are none 
 */
app.component('prmLocationItemsAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'LocationItemsAfterController',
});

app.controller('LocationItemsAfterController', ['$scope', function($scope){

    this.$onInit = ()=> {
      // Watch for the availability statement to update
      $scope.$watch(s => this.parentCtrl.loc, ()=> {
        if (this.parentCtrl.loc) {
          // Availability loads with a delay from its parent objects, so watch for that now
          $scope.$watch(t => this.parentCtrl.loc.location.availabilityStatement, ()=> {
            let statement = this.parentCtrl.loc.location.availabilityStatement;
            if (statement) {
              // If '0 holds' is in the statement remove it
              this.parentCtrl.loc.location.availabilityStatement = statement.replace(", 0 holds", "");
              this.parentCtrl.loc.location.availabilityStatement = statement.replace("(0 holds)", "");
            }
          });
        }
      });
      // If its an S&E HT or Aerial Photos item, when the page loads change the availability statement.
      // This also happens for brief results in hathiTrustAvailability.js
      $scope.$watch(s => this.parentCtrl.item, ()=> {
        var vm = this.parentCtrl;
        if (vm.item.delivery.bestlocation) {
          // Location codes for S&E ETAS, and two Aerial photos locations
          const locations = ['setas', 'meddg'];
          let locationCode = vm.item.delivery.bestlocation.subLocationCode;
          if (locationCode && locations.includes(locationCode)) {
            // With the full result in modal, Primo returns multiple copies of this ID: change em all.
            var span = document.querySelectorAll("[id='" + vm.item.pnx.control.recordid[0] + "availabilityLine0']");
            if (span) {
              for(var i = 0; i < span.length; i++) {
                //span[i].textContent = "No physical access";
                span[i].textContent = span[i].textContent.replace("Available", "No physical access");
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
                //holdingStatement.innerHTML = "No Physical Access " + vm.loc.location.callNumber;
                holdingStatement.innerHTML = holdingStatement.innerHTML.replace("Available", "No physical access");
              }
            }, 500);
          }
        }
      });
    };
}]);
