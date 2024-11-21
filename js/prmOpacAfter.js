/*
 *  Checks for journals, to show a manual ILL link in the template.
 *  Piggybacking on prmAlmaViewitAfter
 */

app.component('prmOpacAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmAlmaViewitAfter',
    templateUrl: 'custom/01CDL_SCR_INST-USCS/html/prmOpacAfter.html',
});
