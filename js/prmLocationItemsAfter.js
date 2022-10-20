/*  
 *  Hides hold requests if there are none 
 *  Customizes availability statement for H&T and Aerials
 *  Identifies the floor location for McHenry general collection
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
              statement = statement.replace(", 0 holds", "").replace("(0 holds)", "");
              this.parentCtrl.loc.location.availabilityStatement = statement;
            }
          });
        }
      });
      // When location loads, update availability based on sublocation code
      // This also happens for search results in hathiTrustAvailability.js
      $scope.$watch(s => this.parentCtrl.item, ()=> {
        var vm = this.parentCtrl;
        if (vm.item.delivery.bestlocation) {
          let locationCode = vm.item.delivery.bestlocation.subLocationCode;
          if (locationCode) {
            // With the full result in modal, Primo returns multiple copies of this ID: change em all.
            switch(locationCode) {
              // S&E ETAS, and Aerial photos are currently unavailable
              case 'setas':
              case 'meddg':
                var span = document.querySelectorAll("[id='" + vm.item.pnx.control.recordid[0] + "availabilityLine0']");
                if (span) {
                  for(var i = 0; i < span.length; i++) {
                    span[i].textContent = span[i].textContent.replace("Available", "No physical access");
                  }
                }
                updateHoldingStatement('setas');
                break;
              // Identify the floor based on call number
              case 'mstax':
                let call = vm.item.delivery.bestlocation.callNumber;
                var spans = document.querySelectorAll("[id='" + vm.item.pnx.control.recordid[0] + "availabilityLine0']");
                if (spans && call) {
                  for(var i = 0; i < spans.length; i++) {
                    var span = spans[i].getElementsByClassName("best-location-sub-location");
                    if (span.length) {
                      var floor = (call.substring(0,2) < "HK") ? "3rd" : "4th";
                      span[0].textContent = span[0].textContent.replace("3rd or 4th", floor);
                    }
                  }
                }
                updateHoldingStatement(floor);
                break;
            }
          }
        }
      });
    };

    // Update availability statement in the GetIt tab on an interval because this bit
    // loads after locations are initialized.
    function updateHoldingStatement(loc) {
      var holdingStatement = null;
      var count = 0;
      var holdingInterval = window.setInterval(function(){
        if (count > 50) {
          clearInterval(holdingInterval);
        }
        if (holdingStatement) {
          clearInterval(holdingInterval);
          switch(loc) {
            case 'setas':
              holdingStatement.innerHTML = holdingStatement.innerHTML.replace("Available", "No physical access");
              break;
            case '3rd':
              holdingStatement.innerHTML = holdingStatement.innerHTML.replace("3rd or 4th", "3rd");
              break;
            case '4th':
              holdingStatement.innerHTML = holdingStatement.innerHTML.replace("3rd or 4th", "4th");
              break;
          }
        } else {
          holdingStatement = document.evaluate("//p[@ng-if='$ctrl.currLoc.location.availabilityStatus']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
        }
      }, 250);
    }
}]);
