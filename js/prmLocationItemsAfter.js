/*  
 *  Hides hold requests if there are none 
 *  Customizes availability statement for H&T and Aerials
 *  Identifies the floor location for McHenry general collection
 *
 *  Functionality is repeated for search results in hathiTrustAvailability.js
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
      // When holdings location info loads, update availability in the brief result of the full record
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
                  for(let i = 0; i < span.length; i++) {
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
                  for(let i = 0; i < spans.length; i++) {
                    var span = spans[i].getElementsByClassName("best-location-sub-location");
                    if (span.length) {
                      span[0].textContent = span[0].textContent.replace("3rd or 4th", getFloor(call));
                    }
                  }
                }
                updateHoldingStatement(getFloor(call));
                break;
            }
          }
        }
        // Update availability in prm-locations when item has multiple holdings
        if (vm.item.delivery.holding && (vm.item.delivery.holding.length > 1)) {
          let holdings = document.getElementsByTagName("prm-location");
          for (let i = 0; i < vm.item.delivery.holding.length; i++) {
            let location = vm.item.delivery.holding[i].subLocationCode;
            if (location == 'mstax') {
              let call = vm.item.delivery.holding[i].callNumber;
              let span = null;
              let count = 0;
              let locationsInterval = window.setInterval(function() {
                if (count > 150) {
                  clearInterval(locationsInterval);
                }
                if (span && call) {
                  span.textContent = span.textContent.replace("3rd or 4th", getFloor(call));
                  clearInterval(locationsInterval);
                } else {
                  // Search within the context of this prm-location
                  span = document.evaluate(".//span[text()='General Collection, 3rd or 4th Floor']", holdings[i], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
                  count++;
                }
              }, 100);
            }
          }

        }
      });
    };

    // Update availability statement in the GetIt tab on an interval because this bit
    // loads after locations are initialized.
    function updateHoldingStatement(loc) {
      let holdingStatement = null;
      let count = 0;
      let holdingInterval = window.setInterval(function(){
        if (count > 150) {
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
          count++;
          holdingStatement = document.evaluate("//p[@ng-if='$ctrl.currLoc.location.availabilityStatus']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
        }
      }, 100);
    }

    // Take a call number for mstax and returns the correct floor number
    function getFloor(call) {
      return (call.substring(0,2) < "HK") ? "3rd" : "4th";
    }
}]);
