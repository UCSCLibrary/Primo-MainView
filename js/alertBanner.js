/* 
 * Alert banner
 * Code borrowed from UCI
 */

/* Different date conditions may be added to control when the banner appears
 * Tip: getMonth() returns 0-11.
 */
let bannerDate = new Date();
//if((bannerDate.getMonth() == 0) && (bannerDate.getDate() < 9)){
if (false) {
  // Use an interval to give a 5000ms delay before alert appears
  let alertBanner = window.setInterval(function(){
    let prmAlertBar = document.getElementsByClassName('topbar-wrapper');
    if (prmAlertBar[0]) {
      let alertBarDiv = document.createElement('div');
      alertBarDiv.setAttribute('id', 'customAlertBar');
      alertBarDiv.setAttribute('style', 'align-content: center;align-items: center;');
      alertBarDiv.setAttribute('layout-align', 'center center');
      let alertBarInnerDiv = document.createElement('div');
      alertBarInnerDiv.setAttribute('style', 'text-align: center;background-color: #dff0d8;padding: 10px 0 3px;font-size: 20px;');

      /*alert banner message to customize */
      alertBarInnerDiv.innerHTML = '<p>ProQuest sites, including ebooks on Ebook Central and videos from Alexander Street Press will be unavailable from Saturday, January 7th at 7PM until Sunday, January 8th at 5AM PST. <a href="https://support.proquest.com/s/article/ProQuest-Notifications-and-Updates?language=en_US">More information</a></p>';
      alertBarDiv.appendChild(alertBarInnerDiv);
      prmAlertBar[0].prepend(alertBarDiv);
    }
    clearInterval(alertBanner);
  }, 5000);
}