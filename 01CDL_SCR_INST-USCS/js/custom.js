(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/



// Adds the chat button
(function() {
  var s=document.createElement('script');
  s.src='https://api2.libanswers.com/1.0/widgets/7993';
  document.body.appendChild(s);
  var d=document.createElement('div');
  d.id='s-la-widget-7993';
  document.body.appendChild(d);
 })(); 

}) ();


