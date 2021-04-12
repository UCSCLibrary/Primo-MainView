
var app = angular.module('viewCustom', ['angularLoad','googleTagManager','hathiTrustAvailability','externalSearch']);

/****************************************************************************************************/

/*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

/*var app = angular.module('centralCustom', ['angularLoad']);*/

/****************************************************************************************************/

// Adds the chat button
(function () {
    var s = document.createElement('script');
    s.src = 'https://v2.libanswers.com/load_chat.php?hash=d3813658438965a0df80a95fc6312cc4';
    document.body.appendChild(s);
    var d = document.createElement('div');
    d.id = 'libchat_d3813658438965a0df80a95fc6312cc4';
    document.body.appendChild(d);
})();
