/* 
 * Alert banner
 * Code borrowed from UCI
 */

/* Different date conditions may be added to control when the banner appears
 * Tip: getMonth() returns 0-11.
 */
let bannerDate = new Date();
if((bannerDate.getMonth() == 10) && (bannerDate.getDate() < 7)){
//if (false) {
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
      alertBarInnerDiv.innerHTML = '<p>UC Library search will be unavailable on Sunday, November 6th from 1:00 AM to approximately 2:00 AM</p>';
      alertBarDiv.appendChild(alertBarInnerDiv);
      prmAlertBar[0].prepend(alertBarDiv);
    }
    clearInterval(alertBanner);
  }, 5000);
}