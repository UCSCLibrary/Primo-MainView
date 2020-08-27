/*
 *  Overrides Primo's default behavior of not showing the public note on GES
 *  when they appear as a 'service button' in the GetIt tab.
 */
app.component('prmServiceButtonAfter', {
    bindings: { parentCtrl: '<' },
    template: '<span class="italic-text weak-text public-note">{{$ctrl.parentCtrl["service"].publicNote}}</span>',
});
