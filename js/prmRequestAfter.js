/* Add help text to the resource sharing request form
 * for now just the preferred pickup location field
 */
app.component('prmRequestAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmRequestAfterController',
});

app.controller('prmRequestAfterController', ['$element', '$timeout', function($element, $timeout){
  this.$onInit = function() {

      var pickupField = null;
      let intervalCount = 0;

      var requestFormInterval = window.setInterval(function(){
          // Bail out if the form doesn't load within 30 seconds
          intervalCount++;
          if (intervalCount > 150) {
            clearInterval(requestFormInterval);
          }

          if (!pickupField) {
            pickupField = $element.parent()[0].querySelector('[id*="form_field_preferredPickupLocation"]');
          }

          if (pickupField && !document.querySelector('#preferredPickupLocation-help')) {
              const helpText = document.createElement('div');
              helpText.id = 'preferredPickupLocation-help';
              helpText.innerText = 'Not all items are eligible for pickup at alternate institutions. Ineligible items will be delivered to McHenry library.';
              helpText.style.fontSize = '0.85em';
              helpText.style.color = '#777';
              helpText.style.marginTop = '-10px';
              helpText.style.marginBottom = '15px';
              pickupField.parentElement.appendChild(helpText);
              clearInterval(requestFormInterval);
          }
      }, 200);
  };
}]);
