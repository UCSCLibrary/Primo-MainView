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
    s.src = 'https://api2.libanswers.com/1.0/widgets/7993';
    document.body.appendChild(s);
    var d = document.createElement('div');
    d.id = 's-la-widget-7993';
    document.body.appendChild(d);
})();

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