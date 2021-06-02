/*
 *  Add an information banner to the My Library Card page
 */
app.component('prmAccountOverviewAfter', {
    bindings: { parentCtrl: '<' },
    template: '<div role="alert" aria-live="assertive" layout-align="center center" class="layout-align-center-center">\
    <div layout="row" class="bar alert-bar layout-align-center-center layout-row" layout-align="center center">\
        <span class="bar-text">Change filter from All Institutions to Has Activity to see campuses where you have active loans.</span>\
    </div>\
    </div>',
});
