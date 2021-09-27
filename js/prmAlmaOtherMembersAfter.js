/**
 * Collapse institution list in full record for Primo VE
 * Borrowed from https://github.com/dswalker/csu-central-package
 */

app.controller('prmAlmaOtherMembersAfterController', [function () {
  /**
   * On page load, hide libraries
   */
  this.$onInit = function () {
    this.parentCtrl.isCollapsed = true;
  };
}]);

app.component('prmAlmaOtherMembersAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmAlmaOtherMembersAfterController',
  template: ''
});
