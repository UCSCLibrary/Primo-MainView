/* 
 * Alert banner
 * Code borrowed from UCI
 */

/* Different date conditions may be added to control when the banner appears
 */
let thisDate = new Date();
let expireDate = new Date("September 16, 2023 14:00:00");

if (thisDate < expireDate) {
//if (false) {

  // Use an interval to give a 5 second delay before alert appears
  let alertBanner = window.setInterval(function(){
    let prmAlertBar = document.getElementsByClassName('topbar-wrapper');
    if (prmAlertBar[0]) {
      let alertBarDiv = document.createElement('div');
      alertBarDiv.setAttribute('id', 'customAlertBar');
      alertBarDiv.setAttribute('style', 'align-content: center;align-items: center;');
      alertBarDiv.setAttribute('layout-align', 'center center');
      let alertBarInnerDiv = document.createElement('div');
      alertBarInnerDiv.setAttribute('style', 'text-align: center;background-color: #dff0d8;padding: 10px 20px 3px;font-size: 20px;');

      /*alert banner message to customize */
      alertBarInnerDiv.innerHTML = '<p>UCSC accounts will be under maintenance Saturday, September 16th, 10am-2pm.</p><p>There is an unlikely chance that access to library accounts and off-campus access to articles and databases will be impacted during the maintenance window.</p>';
      alertBarDiv.appendChild(alertBarInnerDiv);
      prmAlertBar[0].prepend(alertBarDiv);
    }
    clearInterval(alertBanner);
  }, 5000);
}