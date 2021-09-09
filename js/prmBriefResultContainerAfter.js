/**
 * Courtesy of https://github.com/cbaksik/HVD2/blob/master/js/prm-brief-result-container-after.js
 * Adds a "Finding Aid" button
**/
app.controller('prmBriefResultContainerAfterCtrl',['$location','$scope',function ($location,$scope) {
    var vm = this;
    vm.cssClass = 'finding-aid-brief';
    vm.linkText = 'Collection Guide';
    vm.findingAid = {'displayLabel':'','linkURL':'','newLinkURL':''};
    vm.$onInit = () => {
        // get links data from primo parent-ctrl binding data
        $scope.$watch('vm.parentCtrl.links',()=>{
            // find $$Elinktofa
            if(vm.parentCtrl.links) {
                for(var i=0; i < vm.parentCtrl.links.length; i++) {
                    var linkItem=vm.parentCtrl.links[i];
                    var falink = '';
                    if((linkItem.displayLabel === 'Collection guide') || (linkItem.displayLabel === 'Thumbnail image'))  {
                        vm.findingAid = linkItem;
                        if(linkItem.linkURL){
							                falink = linkItem.linkURL;
                        }
                        vm.findingAid.newLinkURL = falink;
                        // add more padding when it is full display page
                        var param = $location.search();
                        if(param.docid) {
                            vm.cssClass = 'finding-aid-full';
                        }
                        i = vm.parentCtrl.links.length;
                    }
                }
            }
        });
    };
}]);

app.component('prmBriefResultContainerAfter',{
    bindings: {parentCtrl:'<'},
    controller: 'prmBriefResultContainerAfterCtrl',
    controllerAs: 'vm',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmBriefResultContainerAfter.html'
});
