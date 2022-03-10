/**
 * Courtesy of https://github.com/cbaksik/HVD2/blob/master/js/prm-brief-result-container-after.js
 * Adds a "Finding Aid" button
**/
app.controller('prmBriefResultContainerAfterCtrl',['$location','$scope',function ($location,$scope) {
    var vm = this;
    vm.cssClass = 'finding-aid-brief';
    vm.findingAid = {'displayLabel':'','linkURL':'','newLinkURL':''};
    vm.$onInit = () => {
        // get links data from primo parent-ctrl binding data
        $scope.$watch('vm.parentCtrl.links',()=>{
            if(vm.parentCtrl.links) {
                for(var i=0; i < vm.parentCtrl.links.length; i++) {
                    var linkItem = vm.parentCtrl.links[i];
                    if(linkItem.displayLabel === 'Collection guide')  {
                        vm.linkText = 'Collection Guide';
                        updateBriefLink(linkItem);
                        i = vm.parentCtrl.links.length;
                    }
                    if(linkItem.displayLabel === 'For user guides or to request extended checkout visit')  {
                        vm.linkText = 'Equipment Information and Guides';
                        updateBriefLink(linkItem);
                        i = vm.parentCtrl.links.length;
                    }
                }
            }
        });
    };
    // Locations lag, use an interval
    angular.element(document).ready(function() {
        let locationsCount = 0;
        var locationsInterval = window.setInterval(function(){
            if (locationsCount > 20) {
                clearInterval(locationsInterval);
            }
            if (vm.parentCtrl.item && vm.parentCtrl.item.delivery && vm.parentCtrl.item.delivery.bestlocation) {
                clearInterval(locationsInterval);
                // Location codes for S&E ETAS, and two Aerial photos locations
                const locations = ['setas', 'meddg', 'meddo'];
                let locationCode = vm.parentCtrl.item.delivery.bestlocation.subLocationCode;
                if (locationCode && locations.includes(locationCode)) {
                    var linkItem = new Object();
                    vm.linkText = 'Aerial Photos Guide';
                    linkItem.linkURL = 'https://guides.library.ucsc.edu/maps';
                    updateBriefLink(linkItem);
                }
            }
            locationsCount++;
        }, 500);
    });

   function updateBriefLink(linkItem) {
        vm.findingAid = linkItem;
        vm.findingAid.newLinkURL = linkItem.linkURL ? linkItem.linkURL : '';
        // add more padding when it is full display page
        var param = $location.search();
        if(param.docid) {
            vm.cssClass = 'finding-aid-full';
        }
    }
}]);

app.component('prmBriefResultContainerAfter',{
    bindings: {parentCtrl:'<'},
    controller: 'prmBriefResultContainerAfterCtrl',
    controllerAs: 'vm',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmBriefResultContainerAfter.html'
});
