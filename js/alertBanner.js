/* 
 * Alert banner
 * Code borrowed from UCI
 */

/* Different date conditions may be added to control when the banner appears
 * Tip: getMonth() returns 0-11.
 */
let thisDate = new Date();
let expireDate = new Date("June 4, 2023 03:00:00");

if (thisDate < expireDate) {
//if((bannerDate.getMonth() == 0) && (bannerDate.getDate() < 9)){
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
      alertBarInnerDiv.setAttribute('style', 'text-align: center;background-color: #dff0d8;padding: 10px 20px 3px;font-size: 20px;');

      /*alert banner message to customize */
      alertBarInnerDiv.innerHTML = '<p>UC Library Search will be unavailable on Sunday, June 4th from midnight through 2:00am. You can continue to access library databases through the <a href="https://guides.library.ucsc.edu/az.php">A-Z list</a> during this time.</p>';
      alertBarDiv.appendChild(alertBarInnerDiv);
      prmAlertBar[0].prepend(alertBarDiv);
    }
    clearInterval(alertBanner);
  }, 5000);
}