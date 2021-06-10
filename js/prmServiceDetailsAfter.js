/*  
 *  Customize the sign-in button on DDA full record display 
 *  Watches the details section for the DDA identifier, then changes the sign in text and classes
 */
app.component('prmServiceDetailsAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'ServiceDetailsAfterController',
});

app.controller('ServiceDetailsAfterController', ['$scope', function($scope){
    var vm = this.parentCtrl;
    var isDdaItem = null;
    var signInLabel = null;
    var signInText = null;
    var alertNode = null;
    var purchaseButton = null;

    // Watch for the details to load, after they do isDdaItem will have a value
    this.$onInit = function () {
        isDdaItem = false;
        let display = vm.item.pnx.display;
        for (const detail in display) {
          // lds07 in the item details means this is a DDA title
          if (detail == 'lds07') {
            isDdaItem = true;
          }
        }
    }; 

    // Keep checking until we have signInLabel & isDdaItem values
    var checkAlertInterval = window.setInterval(function(){
      if (signInLabel == null) {
        signInLabel = document.evaluate("//span[text()='Please sign in to check if there are additional request options.']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
      }
      if (signInLabel == null) {
        signInLabel = document.evaluate("//span[text()='Please sign in to check if there are any request options.']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
      }
      if (signInLabel == null) {
        signInLabel = document.evaluate("//span[text()='Sign In to request this item']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
      }
      if (purchaseButton == null) {
        purchaseButton = document.evaluate("//span[text()='Request Library Purchase']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        if (purchaseButton !== null) {
          purchaseButton = purchaseButton.parentNode.parentNode.parentNode.parentNode.parentNode;
        }
      }
      // If we have both a label and an answer to isDDA, update the alert and exit the interval.
      if (signInLabel !== null && isDdaItem !== null) {
        alertNode = signInLabel.parentNode.parentNode;
        clearInterval(checkAlertInterval);
        updateLoginAlert(isDdaItem, alertNode);
      }
      // If we find a purchase button hide it unless its a DDA item
      // This also means the user is already logged in and we can exit the interval
      if (purchaseButton !== null  && isDdaItem === false) {
        purchaseButton.setAttribute("class", "hidden");
        clearInterval(checkAlertInterval);
      }
    }, 100)

    function updateLoginAlert(isDdaItem, alertNode) {
      signInText = document.evaluate("//span[text()='Sign in']", alertNode, null, XPathResult.ANY_TYPE, null ).iterateNext();
      if (isDdaItem == true) {
        signInLabel.innerHTML = "Sign in to Request Library Purchase.";
      } else {
        // If there is a how to get it, leave the banner as-is (prominent yellow). Otherwise, de-emphasize it.
        let howOvpService = document.evaluate("//h4[text()='How to Get It']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
        if (howOvpService == null) {
          signInLabel.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "non-dda-login-alert");
          signInLabel.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "non-dda-login-alert");
          signInLabel.innerHTML = "Sign in for more options.";
        }
      }
    }
}]);
