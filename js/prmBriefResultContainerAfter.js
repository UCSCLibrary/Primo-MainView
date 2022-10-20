/**
 * Courtesy of https://github.com/cbaksik/HVD2
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

        // When locations load, add an aerial photos guide link
        $scope.$watch('vm.parentCtrl.item.delivery',()=>{
            if (vm.parentCtrl.item.delivery && vm.parentCtrl.item.delivery.bestlocation) {
                let locationCode = vm.parentCtrl.item.delivery.bestlocation.subLocationCode;
                if (locationCode == 'meddg') {
                    var linkItem = new Object();
                    vm.linkText = 'Aerial Photos Guide';
                    linkItem.linkURL = 'https://guides.library.ucsc.edu/maps';
                    updateBriefLink(linkItem);
                }
            }
        });
    };

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
