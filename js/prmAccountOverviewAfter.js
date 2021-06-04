/*
 *  Add an information banner to the My Library Card page
 *
 *  By default, primo displays all institutions in a consortium, which leads to a lot of clutter.
 *  We have hidden them in our CSS, and will look for an icon indicating an institution "has
 *  activity", and will selectively show those.
 */
app.component('prmAccountOverviewAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmAccountOverviewAfterController',
    template: '<div role="alert" aria-live="assertive" layout-align="center center" class="layout-align-center-center">\
    <div layout="row" class="bar alert-bar layout-align-center-center layout-row" layout-align="center center">\
        <span class="bar-text">Change filter from All Institutions to Has Activity to see campuses where you have active loans.</span>\
    </div>\
    </div>',
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
            institutionsList.setAttribute('id', 'main-institution-list');
            // Each institution is in its own md-list-item
            let items = document.getElementById('main-institution-list').getElementsByTagName('md-list-item');
            for (const item of items) {
                // If it has a prm-icon element, its an institution with activity that should be displayed
                if (item.querySelector("prm-icon") != null) {
                    item.style.display = 'flex';
                }
            }
        }
    }
}]);
