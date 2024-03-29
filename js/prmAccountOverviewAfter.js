/*
 *  Add an information banner to the My Library Card page
 *
 *  Add a header for the institutions list.
 *
 *  By default, primo displays all institutions in a consortium, which leads to a lot of clutter.
 *  We have hidden them in our CSS, and will look for an icon indicating an institution "has
 *  activity", and will selectively show those.
 */
app.component('prmAccountOverviewAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmAccountOverviewAfterController',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmAccountOverviewAfter.html',
});

app.controller('prmAccountOverviewAfterController', ['$scope', '$rootScope', function($scope, $rootScope){
    var vm = this;
    var institutionsCount = 0;
    var institutionsList = null;

    // Check every 500ms for the institutions list to load
    var institutionsInterval = window.setInterval(function(){
        institutionsList = document.querySelector(".main-institution-list");
        institutionsCount++;
        // Stop checking if we find the element or 15 seconds has passed
        if ((institutionsList) || (institutionsCount > 30)) {
            updateInstitutions(institutionsList);
            clearInterval(institutionsInterval);
        }
    }, 500);

    function updateInstitutions(institutionsList) {
        if (institutionsList != null) {
            // Only show the header when there are visible institutions
            var showHeader = false;
            institutionsList.setAttribute('id', 'main-institution-list');
            // Each institution is in its own md-list-item
            let items = document.getElementById('main-institution-list').getElementsByTagName('md-list-item');
            for (const item of items) {
                // If it has a prm-icon element, its an institution with activity that should be displayed
                if (item.querySelector("prm-icon") != null) {
                    item.style.display = 'flex';
                    showHeader = true;
                }
            }
            if (showHeader) {
                // Add a header to the institution list and give it an ID.
                institutionsList.insertAdjacentHTML( 'beforeBegin', '<h2>UC Campus</h2>' );
            }
        }
    }
}]);
