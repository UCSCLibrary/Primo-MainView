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
  var vm = this;
  var illNoteText = null;
  var illServiceSpan = null;
  var purchaseButton = null;

  if ((vm.parentCtrl.item.pnx.addata.format[0] == 'article') || (vm.parentCtrl.item.pnx.addata.format[0] == 'journal')) {
    illNoteText = "Articles are generally delivered electronically within 1-2 days";
  }

  let illIntervalCount = 0;
  var illServiceInterval = window.setInterval(function(){
    illIntervalCount++;
    // Exit if there's no note to add, or its spent 10 seconds trying
    if ((illNoteText == null) || (illIntervalCount > 100)) {
      clearInterval(illServiceInterval);
    }
    // Otherwise keep checking for the ILL service
    if (illServiceSpan == null) {
      illServiceSpan = document.evaluate("//span[text()='Request through Interlibrary Loan']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    }
    // If we find the service add the note.
    if (illServiceSpan != null) {
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
    if (purchaseButton == null) {
      purchaseButton = document.evaluate("//span[text()='Request Library Purchase']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
      if (purchaseButton !== null) {
        purchaseButton = purchaseButton.parentNode.parentNode.parentNode.parentNode.parentNode;
      }
    }
    // Once the button is found...
    if (purchaseButton != null) {
      // Check if its already processed by prmServiceDetails controller, and if not hide it
      if (!purchaseButton.classList.contains("processed")) {
        purchaseButton.setAttribute("class", "hidden");
      }
      // and exit
      clearInterval(ddaServiceInterval);
    }
  }, 100);

}]);
