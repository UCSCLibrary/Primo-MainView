/* 
 * Alert banner
 * Code borrowed from UCI
 */

/* Different date conditions may be added to control when the banner appears
 * Tip: getMonth() returns 0-11.
 */
//let bannerDate = new Date();
//if((bannerDate.getMonth() <= 7) && (bannerDate.getDate() < 27)){
if (true) {
  // Use an interval to give a 5000ms delay before alert appears
  let alertBanner = window.setInterval(function(){
    let prmAlertBar = document.getElementsByClassName('topbar-wrapper');
    if (prmAlertBar[0]) {
      let alertBarDiv = document.createElement('div');
      alertBarDiv.setAttribute('id', 'customAlertBar');
      alertBarDiv.setAttribute('style', 'align-content: center;align-items: center;');
      alertBarDiv.setAttribute('layout-align', 'center center');
      let alertBarInnerDiv = document.createElement('div');
      alertBarInnerDiv.setAttribute('style', 'text-align: center;background-color: #dff0d8;padding: 3px 0;font-size: 20px;');

      /*alert banner message to customize */
      alertBarInnerDiv.innerHTML = '<p>S&E Library lower level books are inaccessible September 22, 2021 - March 28, 2022. Please request items through UC Library Search. <a href="https://library.ucsc.edu/news/science-engineering-library-physical-collections-not-accessible-during-renovation" target="_blank">See more information</a>.</p>';
      alertBarDiv.appendChild(alertBarInnerDiv);
      prmAlertBar[0].prepend(alertBarDiv);
    }
    clearInterval(alertBanner);
  }, 5000);
}