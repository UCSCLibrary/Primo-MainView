/*
 *  Add a public note to the Alma Resource Sharing Request
 *  Note changes based on resource type
 *  Also, hide Purchase Request by default
 */

app.component('almaHowovpAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'almaHowovpAfterController',
});

app.controller('almaHowovpAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  this.$onInit = function () {
    var pnxData = this.parentCtrl.item.pnx.display;
    var illNoteText = null;
    var illServiceSpan = null;
    var purchaseButton = null;

    if ((pnxData.type && pnxData.type[0] == 'article') || (pnxData.format && pnxData.format[0] == 'journal')) {
      illNoteText = "Arrives via email in about 2 days.";
    }
    if (pnxData.type && pnxData.type[0] == 'book') {
      illNoteText = "Arrives at your library in about 1 week.";
    }

    let illIntervalCount = 0;
    var illServiceInterval = window.setInterval(function(){
      illIntervalCount++;
      // Exit if there's no note to add, or its spent 10 seconds trying
      if ((!illNoteText) || (illIntervalCount > 100)) {
        clearInterval(illServiceInterval);
      }
      // Otherwise keep checking for the ILL service
      if (!illServiceSpan) {
        illServiceSpan = document.evaluate("//span[@translate='AlmaResourceSharing']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
      }
      // If we find the service add the note.
      if (illServiceSpan) {
        // Add the service note in a new span.
        let illNoteSpan = document.createElement('span');
        illNoteSpan.innerHTML = illNoteText;
        illServiceSpan.parentNode.insertBefore(illNoteSpan, illServiceSpan.nextSibling);
        clearInterval(illServiceInterval);
      }
    }, 100);

    let ddaIntervalCount = 0;
    var ddaServiceInterval = window.setInterval(function(){
      ddaIntervalCount++;
      // Exit if 30 seconds has passed
      if (ddaIntervalCount>300) {
        clearInterval(ddaServiceInterval);
      }
      // Otherwise keep looking for the purchase request button
      if (!purchaseButton) {
        purchaseButton = document.evaluate("//span[text()='Request Library Purchase']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (purchaseButton) {
          purchaseButton = purchaseButton.parentNode.parentNode.parentNode.parentNode.parentNode;
        }
      }
      // Once the button is found...
      if (purchaseButton) {
        // Check if its already processed by prmServiceDetails controller, and if not hide it
        if (!purchaseButton.classList.contains("processed")) {
          purchaseButton.setAttribute("class", "hidden");
        }
        // and exit
        clearInterval(ddaServiceInterval);
      }
    }, 100);
  }

}]);
