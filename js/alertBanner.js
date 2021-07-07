/* 
 * Alert banner
 * Code borrowed from UCI
 */
let alertBanner = window.setInterval(function(){
    let date = new Date();

    /* Different date conditions may be added to control when the banner appears
     * Tip: getMonth() returns 0-11.
     */
    if((date.getMonth() == 6) && (date.getDate() < 27)){
    //if (false) {
        let prmAlertBar = document.getElementsByClassName('topbar-wrapper');
        if (prmAlertBar) {
            let alertBarDiv = document.createElement('div');
            alertBarDiv.setAttribute('id', 'customAlertBar');
            alertBarDiv.setAttribute('style', 'align-content: center;align-items: center;');
            alertBarDiv.setAttribute('layout-align', 'center center');
            let alertBarInnerDiv = document.createElement('div');
            alertBarInnerDiv.setAttribute('style', 'text-align: center;background-color: #fcd02f;padding: 3px 0;font-size: 20px;');

            /*alert banner message to customize */
            alertBarInnerDiv.innerHTML = '<p>July 9 - 26: My Account links will not be available. July 27: UC Library Search will replace UCSC Library Search and Melvyl.<br /> <a href="https://guides.library.ucsc.edu/summer2021" target="_blank">See our FAQ</a> for more details.</p>';
            alertBarDiv.appendChild(alertBarInnerDiv);
            prmAlertBar[0].prepend(alertBarDiv);
        }
        clearInterval(alertBanner);
    }
}, 5000);
