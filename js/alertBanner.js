/* 
 * Alert banner
 * Code borrowed from UCI
 */
let alertBanner = window.setInterval(function(){
    let date = new Date();

    /* Different date conditions may be added to control when the banner appears
     * Tip: getMonth() returns 0-11.
     */
    //if((date.getMonth() <= 7) && (date.getDate() < 27)){
    if (true) {
        let prmAlertBar = document.getElementsByClassName('topbar-wrapper');
        if (prmAlertBar) {
            let alertBarDiv = document.createElement('div');
            alertBarDiv.setAttribute('id', 'customAlertBar');
            alertBarDiv.setAttribute('style', 'align-content: center;align-items: center;');
            alertBarDiv.setAttribute('layout-align', 'center center');
            let alertBarInnerDiv = document.createElement('div');
            alertBarInnerDiv.setAttribute('style', 'text-align: center;background-color: #dff0d8;padding: 3px 0;font-size: 20px;');

            /*alert banner message to customize */
            alertBarInnerDiv.innerHTML = 'Welcome to UC Library Search!';
            alertBarDiv.appendChild(alertBarInnerDiv);
            prmAlertBar[0].prepend(alertBarDiv);
        }
        clearInterval(alertBanner);
    }
}, 5000);
