(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

"use strict";
'use strict';

/****************************************************************************************************/

/*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

/*var app = angular.module('centralCustom', ['angularLoad']);*/

/****************************************************************************************************/

// Adds the chat button
(function () {
    var s = document.createElement('script');
    s.src = 'https://api2.libanswers.com/1.0/widgets/9392';
    document.body.appendChild(s);
    var d = document.createElement('div');
    d.id = 's-la-widget-9392';
    document.body.appendChild(d);
})();

// Remove Request Purchase button for non-dda items
/* Commenting this out 1/24/2019 because the update has fixed this issue -- BK
app.controller('HowovpAfterController', ['$scope', function($scope){
    var vm = this;
    var checkDdaInterval;
    checkDdaInterval = window.setInterval(function(){
      var getItLinks = document.evaluate("//span[text()='Request Library Purchase']", document, null, XPathResult.ANY_TYPE, null );
      var requestPurchase = getItLinks.iterateNext();
      var relatedLinks = document.evaluate("//span[text()='xyz1121']", document, null, XPathResult.ANY_TYPE, null );
      var ddaLink = relatedLinks.iterateNext();
      if (ddaLink) {
        ddaLink.parentNode.parentNode.setAttribute("class", "hidden");
      } else {
        requestPurchase.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("class", "hidden");
      }
    }, 500)
}]);

app.component('almaHowovpAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'HowovpAfterController'
});*/

// Add Haven't Found box

app.controller('SearchResultListAfterController', ['$scope', function($scope){
    var vm = this;
    vm.getQuery = getQuery;
    function getQuery() {
      var queryString = vm.parentCtrl.query;
      if (queryString.includes(",AND;")) {
        var queryString = queryString.split(",AND;");
        var queryString = queryString[0];
      } else if (queryString.includes(",OR;")) {
        var queryString = queryString.split(",OR;");
        var queryString = queryString[0];
      } else if (queryString.includes(",NOT;")) {
        var queryString = queryString.split(",NOT;");
        var queryString = queryString[0];
      } else if (queryString.includes(",AND")) {
        var queryString = queryString.split(",AND");
        var queryString = queryString[0];
      } else {
        var queryString = vm.parentCtrl.query;
      }
      return queryString;
    }
    var checkResultsInterval;
    checkResultsInterval = window.setInterval(function(){
      var resultCount = angular.element( document.querySelector( '.results-count' ) )[0].innerHTML;
      resultCount = resultCount.replace(/\D/g,'');
      if (resultCount > 0){
        document.getElementById("haventFoundBox").classList.remove('hidden');
      }
    }, 2000)
}]);

app.component('prmSearchResultListAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchResultListAfterController',
    template: '<md-card  id="haventFoundBox" class="hidden"><md-card-title><md-card-title-text><span class="md-headline">Haven\'t found what you\'re looking for?</span></md-card-title-text></md-card-title><md-card-content><md-list role="list" class="md-primoExplore-theme"><md-list-item role="listitem" class="_md-no-proxy _md"><span><img src="https://library.ucsc.edu/sites/default/files/external/images/HFbox_Ask_30px.png"> <a href="https://guides.library.ucsc.edu/ask-a-librarian" target="_blank">Ask a Librarian</a> for expert research help</span></md-list-item><md-list-item role="listitem" class="_md-no-proxy _md"><span><img src="https://library.ucsc.edu/sites/default/files/external/images/HFbox_Melvyl2_30px.png"> <a href="https://melvyl.worldcat.org/search?qt=wc_org_melvyl&q={{$ctrl.getQuery()}}&scope=0&oldscope=&wcsbtn2w=Search" target="_blank">Continue your search in Melvyl</a> to find and request items from other libraries</span></md-list-item><md-list-item role="listitem" class="_md-no-proxy _md"><span><img src="https://library.ucsc.edu/sites/default/files/external/images/HFbox_Database_30px.png"> Try searching <a href="https://scholar.google.com/" target="_blank">Google Scholar</a> or one of the Library\'s <a href="https://guides.library.ucsc.edu/az.php?" target="_blank">research databases</a></span></md-list-item><md-list-item role="listitem" class="_md-no-proxy _md"><span><img src="https://library.ucsc.edu/sites/default/files/external/images/HFbox_Start_30px.png"> Find tips for <a href="https://guides.library.ucsc.edu/writing" target="_blank">starting your research</a> or check out our subject <a href="https://guides.library.ucsc.edu/?b=s" target="_blank">Research Guides</a></span></md-list-item></md-list></md-card-content></md-card>'
});

//Auto generated code by primo app store DO NOT DELETE!!! -START-
/*
    hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */


app.controller('ServiceLinksAfterController', [function () {
    var vm = this;
}]);

app.component('prmServiceLinksAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'ServiceLinksAfterController',
    template: '\n    <remove-specific-request-for-location parent-ctrl="$ctrl.parentCtrl"></remove-specific-request-for-location>\n'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-

//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.constant('removeSpecificRequestForLocationStudioConfig', [{ "libraryCode": "SE, RES_SHARE, MCH, DSC", "subLocationCode": "spc, spann, spanv, spred, spwhi, spflm, spnr, spovr, spovm", "displayLabel": "Special Collections Request Form" }]);
//Auto generated code by primo app store DO NOT DELETE!!! -END-
//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.controller('removeSpecificRequestForLocationController', ['removeSpecificRequestForLocationStudioConfig', '$scope', function (addonParameters, $scope) {
    var vm = this.parentCtrl;
    var recordLinks2;

    $scope.$watch(function () {
        return vm.recordLinks ? vm.recordLinks : undefined;
    }, function () {
        if (recordLinks2 && recordLinks2.length !== vm.recordLinks.length) {
            recordLinks2 = vm.recordLinks;
            calculateRemove();
        } else if (!recordLinks2) {
            recordLinks2 = vm.recordLinks;
            calculateRemove();
        } else {
            recordLinks2 = vm.recordLinks;
        }
    });

    function calculateRemove() {
        var libraryCodes = addonParameters[0].libraryCode;
        var subLocationCodes = addonParameters[0].subLocationCode;
        var libraryCode = libraryCodes ? libraryCodes.split(/\s*,\s*/) : [];
        var subLocationCode = subLocationCodes ? subLocationCodes.split(/\s*,\s*/) : [];
        var holding = [];
        if (vm.item.delivery.holding) {
            holding = vm.item.delivery.holding.filter(function (holding) {
                return libraryCode.indexOf(holding.libraryCode) !== -1;
            }).filter(function (holding) {
                return subLocationCode.indexOf(holding.subLocationCode) !== -1;
            });
        }
        if (recordLinks2.length > 0 && holding.length === 0) {
            vm.recordLinks = recordLinks2.filter(function (e) {
                return e.displayLabel !== addonParameters[0].displayLabel;
            });
        }
    }
}]);

app.component('removeSpecificRequestForLocation', {
    controller: 'removeSpecificRequestForLocationController',
    bindings: { parentCtrl: '<' }
});

//Auto generated code by primo app store DO NOT DELETE!!! -END-
})();
