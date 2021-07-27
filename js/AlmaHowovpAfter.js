/*
 *  Add a public note to the Alma Resource Sharing Request
 *  Note changes based on resource type
 */

app.component('almaHowovpAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'almaHowovpAfterController',
});

app.controller('almaHowovpAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
  var vm = this;
  var IllNoteText, IllServiceSpan;

  if (vm.parentCtrl.item.pnx.addata.format[0] == 'book') {
    //IllNoteText = "Request single book chapters during closure of in-person services due to COVID-19";
  } else {
    IllNoteText = "Articles are generally delivered electronically within 1-2 days";
  }

  let serviceIntervalCount = 0;
  var checkServiceInterval = window.setInterval(function(){
    IllServiceSpan = document.evaluate("//span[text()='Request through Interlibrary Loan']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    serviceIntervalCount++;
    if ((IllServiceSpan != null) || (serviceIntervalCount>100)) {
      updateServiceNote(IllServiceSpan);
      clearInterval(checkServiceInterval);
    }
  }, 100);

  function updateServiceNote(IllServiceSpan) {
    if ((IllServiceSpan != null) && (IllNoteText != null)) {
      let IllNoteSpan = document.createElement('span');
      IllNoteSpan.innerHTML = IllNoteText;
      IllServiceSpan.parentNode.insertBefore(IllNoteSpan, IllServiceSpan.nextSibling);
    }
  }
}]);
