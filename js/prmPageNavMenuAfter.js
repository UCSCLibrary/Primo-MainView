/*
 *  Adds an anchor button to go to the 'haven't found it' box at the bottom of search results
 */
 
app.component('prmPageNavMenuAfter', {
    bindings: { parentCtrl: '<' },
    template: "<md-button id='findItButton' class='md-raised' href='#haventFoundBox'>Didn't Find It ?</md-button>",
});
