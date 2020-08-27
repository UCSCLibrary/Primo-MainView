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

    // Watch for the details to load, after they do isDdaItem will have a value
    this.$onInit = function () {
        isDdaItem = false;
        vm._details.forEach(function (itemDetail) {
          // lds26 in the item details means this is a DDA title
          if (itemDetail.label == 'lds07') {
            isDdaItem = true;
          }
        });
    }; 

    // Keep checking until we have signInLabel & isDdaItem values
    var checkAlertInterval = window.setInterval(function(){
      if (signInLabel == null) {
        signInLabel = document.evaluate("//span[text()='Please sign in to check if there are additional request options.']", document, null, XPathResult.ANY_TYPE, null );
        signInLabel = signInLabel.iterateNext();
      }
      if (signInLabel == null) {
        signInLabel = document.evaluate("//span[text()='Please sign in to check if there are any request options.']", document, null, XPathResult.ANY_TYPE, null );
        signInLabel = signInLabel.iterateNext();
      }
      // If we have both, update the alert and exit the interval.
      if (signInLabel !== null && isDdaItem !== null) {
        //signInLabel.setAttribute("class", "hidden");
        alertNode = signInLabel.parentNode.parentNode;
        clearInterval(checkAlertInterval);
        updateLoginAlert(isDdaItem, alertNode);
      }
    }, 100)

    function updateLoginAlert(isDdaItem, alertNode) {
      signInText = document.evaluate("//span[text()='Sign in']", alertNode, null, XPathResult.ANY_TYPE, null );
      signInText = signInText.iterateNext();
      if (isDdaItem == true) {
        signInLabel.innerHTML = "Sign in to Request Library Purchase.";
      } else {
        signInLabel.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "non-dda-login-alert");
        signInLabel.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "non-dda-login-alert");
        signInLabel.innerHTML = "Sign in for more options.";
      }
    }

}]);
