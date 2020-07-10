(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['googleTagManager','angularLoad']);

"use strict";
'use strict';

/****************************************************************************************************/

/*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

/*var app = angular.module('centralCustom', ['angularLoad']);*/

/****************************************************************************************************/

// Adds the chat button
(function () {
    var s = document.createElement('script');
    s.src = 'https://v2.libanswers.com/load_chat.php?hash=d3813658438965a0df80a95fc6312cc4';
    document.body.appendChild(s);
    var d = document.createElement('div');
    d.id = 'libchat_d3813658438965a0df80a95fc6312cc4';
    document.body.appendChild(d);
})();


/*
 * Add Haven't Found box
 *
 */
app.controller('SearchResultListAfterController', ['$scope', function($scope){
  var vm = this;
  vm.getQuery = getQuery;

  // Libchat script
  var libchat = document.createElement("script");
  libchat.src = "https://v2.libanswers.com/load_chat.php?hash=d01223b2d5b712cc1cf9015fef8fa534";
  document.head.appendChild(libchat);

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
    var resultCount = angular.element( document.querySelector( 'prm-no-search-result' ) );
    if (Object.keys(resultCount).length === 0) {
      document.getElementById("haventFoundBox").classList.remove('hidden');
    }
  }, 2000)
}]);

app.component('prmSearchResultListAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchResultListAfterController',
    template: `
  <md-card id="haventFoundBox" class="hidden">
  <md-card-title>
    <md-card-title-text>
      <span class="md-headline">Haven\'t found what you\'re looking for?</span>
    </md-card-title-text>
  </md-card-title>
  <md-card-content>
      <div>
        <span class="md-subheadline">Chat with us for help</span>
        <div id="libchat_d01223b2d5b712cc1cf9015fef8fa534"></div>
      </div>

      <div role="list" class="md-primoExplore-theme">
        <span class="md-subheadline">Try your search again in...</span>
        <md-list-item role="listitem" class="_md-no-proxy _md"><span><a href="https://ucsc.on.worldcat.org/external-search?queryString={{$ctrl.getQuery()}}" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/Melvyl_logo_0.png" width="30" height="30" />Melvyl</a></span></md-list-item>
        <md-list-item role="listitem" class="_md-no-proxy _md"><span><a href="https://babel.hathitrust.org/cgi/wayf?target=https%3A%2F%2Fbabel.hathitrust.org%2Fcgi%2Fls%3Ffield1%3Docr%3Bq1%3D{{$ctrl.getQuery()}}%3Ba%3Dsrchls%3Blmt%3Dft" target="_blank"><img src="https://library.ucsc.edu/sites/default/files/HathiTrust_icon.png" width="30" height="30" />HathiTrust</a></span></md-list-item>
      </div>

  </md-card-content>
</md-card>`
});

/* 
 * Begin Google Tag Manager code
 * Adapted from: https://github.com/csudhlib/primo-explore-google-analytics
 */
angular.module('googleTagManager', []);
angular.module('googleTagManager').run(function ($rootScope, $interval, tagOptions) {
  if (tagOptions.hasOwnProperty("enabled") && tagOptions.enabled) {
    if (tagOptions.hasOwnProperty("siteId") && tagOptions.siteId != '') {
      if (typeof gtag === 'undefined') {
        var s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagOptions.siteId;
        document.body.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', tagOptions.siteId, { 
          'allow_ad_personalization_signals': false,
          'allow_google_signals': false,
          'alwaysSendReferrer': true,
          'anonymizeIp': true
        });
      }
    }
    $rootScope.$on('$locationChangeSuccess', function (event, toState, fromState) {
      if (tagOptions.hasOwnProperty("defaultTitle")) {
        var documentTitle = tagOptions.defaultTitle;
        var interval = $interval(function () {
          if (document.title !== '') documentTitle = document.title;
          if (window.location.pathname.indexOf('openurl') !== -1 || window.location.pathname.indexOf('fulldisplay') !== -1) if (angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).length === 0) return;else documentTitle = angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).text();

          if (typeof gtag !== 'undefined') {
            if (fromState != toState) {
              gtag('event', 'page_view', {
                'referrer': fromState,
                'location': toState,
                'title': documentTitle,
              });
            }
            else {
              gtag('event', 'page_view', {
                'location': toState,
                'title': documentTitle,
              });
            }
          }
          $interval.cancel(interval);
        }, 0);
      }
    });
  }
});
angular.module('googleTagManager').value('tagOptions', {
  enabled: true,
  siteId: 'UA-2259271-27',
  defaultTitle: 'Library Search'
});
/* End Google Tag Manager integration */


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

/* Online only message
 * Adds a clarifying message for the online search scope results page.
 */
app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchBarAfterController',
    template: '<div id="scopeLimitationMessage" class="hidden"><p>Only showing items available online. <a href="/discovery/search?query={{$ctrl.getQuery()}}&tab=Everything&search_scope=MyInst_and_CI&vid=01CDL_SCR_INST:USCS&offset=0">Click to include print and other physical items.</a></p></div>',
});

app.controller('SearchBarAfterController', ['$scope', function($scope){
  var vm = this;
  vm.getQuery = getQuery;
  // Only present this information on the Available Online scope.
  // This changes asynchronously, so we need to check on an interval.
  // TODO: This could be more elegant with a watch for scope change.
  var checkScopeInterval = window.setInterval(function(){
    if (vm.parentCtrl.$stateParams.tab == 'AvailableOnline') {
      document.getElementById("scopeLimitationMessage").classList.remove('hidden');
    } else {
      document.getElementById("scopeLimitationMessage").classList.add('hidden');
    }
  }, 1000);

  function getQuery() {
    return vm.parentCtrl.$stateParams.query;
  }
}]);

/*
 *  Overrides Primo's default behavior of not showing the public note on GES
 *  when they appear as a 'service button' in the GetIt tab.
 */ /*
app.component('prmServiceButtonAfter', {
    bindings: { parentCtrl: '<' },
    template: '<span class="italic-text weak-text public-note">{{$ctrl.parentCtrl["service"].publicNote}}</span>',
}); */

/*  
 *  Hides hold requests if there are none 
 */
app.component('prmLocationItemsAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'LocationItemsAfterController',
});

app.controller('LocationItemsAfterController', ['$scope', function($scope){
    var vm = this.parentCtrl;
    var statement = null;

    this.$onInit = function () {
      // Keep checking until the availability statement loads
      var availabilityInterval = window.setInterval(function(){
        if (statement == null) {
          statement = vm.loc.location.availabilityStatement;
        }
        else {
          // Stop the interval and check if statement needs updating
          clearInterval(availabilityInterval);
          if (statement.includes(", 0 holds")) {
            statement = statement.replace(", 0 holds", "");
            // Find the p element and replace the text.
            var paragraph = document.evaluate("//p[@ng-if='$ctrl.currLoc.location.availabilityStatement']", document, null, XPathResult.ANY_TYPE, null );
            paragraph = paragraph.iterateNext();
            paragraph.innerHTML = statement;
          }
        }
      }, 100);
    };
}]);

/*
 *  Begin BrowZine - Primo Integration...
 */ /*
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/89",
    apiKey: "1fca6dbe-b86e-4128-b9a7-555bb66f4313",
 
    journalCoverImagesEnabled: true,
 
    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",
 
    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",
 
    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",
 
    articleLinkEnabled: true,
    articleLinkText: "Read Article",
 
    printRecordsIntegrationEnabled: true,
 
    unpaywallEmailAddressKey: "enter-your-email@your-institution-domain.edu",
 
    articlePDFDownloadViaUnpaywallEnabled: true,
    articlePDFDownloadViaUnpaywallText: "Download PDF (via Unpaywall)",
 
    articleLinkViaUnpaywallEnabled: true,
    articleLinkViaUnpaywallText: "Read Article (via Unpaywall)",
 
    articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
    articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF (Accepted Manuscript via Unpaywall)",
 
    articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
    articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article (Accepted Manuscript via Unpaywall)",
  };
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
 
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });
 
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
// ... End BrowZine - Primo Integration

/* 
 * AEON code from ExL 
 * 
 * Note: //Auto generated code by primo app store DO NOT DELETE!!! -START-
 *   and //Auto generated code by primo app store DO NOT DELETE!!! -END-
 *   comments removed throughout this block.
 *
 *  hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
 *  e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */

 /* Commenting out 1/15/19 now that GES can be applied at item-level, location is available natively.
  */
  /*
app.controller('ServiceLinksAfterController', [function () {
    var vm = this;
}]);

app.component('prmServiceLinksAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'ServiceLinksAfterController',
    template: '\n    <remove-specific-request-for-location parent-ctrl="$ctrl.parentCtrl"></remove-specific-request-for-location>\n'
});

app.constant('removeSpecificRequestForLocationStudioConfig', [{ "libraryCode": "SE, RES_SHARE, MCH, DSC", "subLocationCode": "spc, spann, spanv, spred, spwhi, spflm, spnr, spovr, spovm", "displayLabel": "Special Collections Request Form" }]);

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
        var libraryCode = libraryCodes ? libraryCodes.split(/\s*,\s*/ //comment ) : [];
      //  var subLocationCode = subLocationCodes ? subLocationCodes.split(/\s*,\s*/) : [];
      /*  var holding = [];
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
/*
End commented out AEON hack */

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


// End File
})();
