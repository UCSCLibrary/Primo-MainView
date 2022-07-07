/*  
 *  Customize the sign-in button on DDA full record display 
 *  Watches the details section for the DDA identifier, then changes the sign in text and classes
 *  Removes hidden class from Purchase Request button for DDA items
 */
app.component('prmServiceDetailsAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'ServiceDetailsAfterController',
});

app.controller('ServiceDetailsAfterController', ['$scope', function($scope){
  this.$onInit = function () {
    var vm = this.parentCtrl;
    var isDdaItem = null;
    var signInLabel = null;
    var purchaseButton = null;

    // Watch for the details to load, 'Discovery print' value in the local field lds07 indicates DDA
    isDdaItem = false;
    if (vm.item.pnx.display.lds07) {
      if (vm.item.pnx.display.lds07.includes("Discovery Print") || vm.item.pnx.display.lds07.includes("Discovery print")) {
        isDdaItem = true;
      }
    }

    // Keep checking until we have signInLabel & isDdaItem values
    var checkAlertInterval = window.setInterval(function(){
      if (!signInLabel) {
        signInLabel = document.evaluate("//span[text()='Please sign in to check if there are additional request options.']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
      }
      if (!signInLabel) {
        signInLabel = document.evaluate("//span[text()='Please sign in to check if there are any request options.']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
      }
      if (!signInLabel) {
        signInLabel = document.evaluate("//span[text()='Sign In to request this item']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
      }
      if (!purchaseButton) {
        purchaseButton = document.evaluate("//span[text()='Request Library Purchase']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (purchaseButton) {
          purchaseButton = purchaseButton.parentNode.parentNode.parentNode.parentNode.parentNode;
        }
      }
      // If we have both a label and an answer to isDda, update the alert and exit the interval.
      if (signInLabel && isDdaItem !== null) {
        var alertNode = signInLabel.parentNode.parentNode;
        clearInterval(checkAlertInterval);
        updateLoginAlert(isDdaItem, alertNode);
      }
      // If we find a purchase button
      if (purchaseButton) {
        // If it's a DDA item, ensure hidden is not in the class list and flag it as processed 
        // to prevent AlmaHowovp controller from re-hiding the service.
        if (isDdaItem) {
          purchaseButton.setAttribute("class", "processed");
          purchaseButton.classList.remove("hidden");
        }
        // This also means the user is already logged in and we can exit the interval
        clearInterval(checkAlertInterval);
      }
    }, 100);
  };

    function updateLoginAlert(isDdaItem, alertNode) {
      if (isDdaItem) {
        signInLabel.innerHTML = "Sign in to Request Library Purchase.";
      } else {
        // If there is a how to get it, leave the banner as-is (prominent yellow). Otherwise, de-emphasize it.
        let howOvpService = document.evaluate("//h4[text()='How to Get It']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
        if (!howOvpService) {
          signInLabel.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "non-dda-login-alert");
          signInLabel.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "non-dda-login-alert");
          signInLabel.innerHTML = "Sign in for more options.";
        }
      }
    }
}]);
