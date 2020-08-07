
/* 
 * Begin Google Tag Manager code
 * Adapted from: https://github.com/csudhlib/primo-explore-google-analytics
 */
angular.module('googleTagManager', []);
angular.module('googleTagManager').run(function ($rootScope, $interval, tagOptions) {
  if (tagOptions.hasOwnProperty("enabled") && tagOptions.enabled) {
    if (tagOptions.hasOwnProperty("siteId") && tagOptions.siteId != '') {
      if (typeof gtag === 'undefined') {
        var s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagOptions.siteId;
        document.body.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', tagOptions.siteId, { 
          'allow_ad_personalization_signals': false,
          'allow_google_signals': false,
          'alwaysSendReferrer': true,
          'anonymizeIp': true
        });
      }
    }
    $rootScope.$on('$locationChangeSuccess', function (event, toState, fromState) {
      if (tagOptions.hasOwnProperty("defaultTitle")) {
        var documentTitle = tagOptions.defaultTitle;
        var interval = $interval(function () {
          if (document.title !== '') documentTitle = document.title;
          if (window.location.pathname.indexOf('openurl') !== -1 || window.location.pathname.indexOf('fulldisplay') !== -1) if (angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).length === 0) return;else documentTitle = angular.element(document.querySelector('prm-full-view-service-container .item-title>a')).text();

          if (typeof gtag !== 'undefined') {
            if (fromState != toState) {
              gtag('event', 'page_view', {
                'referrer': fromState,
                'location': toState,
                'title': documentTitle,
              });
            }
            else {
              gtag('event', 'page_view', {
                'location': toState,
                'title': documentTitle,
              });
            }
          }
          $interval.cancel(interval);
        }, 0);
      }
    });
  }
});
angular.module('googleTagManager').value('tagOptions', {
  enabled: true,
  siteId: 'UA-2259271-27',
  defaultTitle: 'Library Search'
});
/* End Google Tag Manager integration */
