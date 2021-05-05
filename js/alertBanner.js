/* 
 * Alert banner
 * Code borrowed from UCI
 */
let alertBanner = window.setInterval(function(){
    let date = new Date();

    /* different date conditions may be added to control when the banner appears */
    if((date.getFullYear() == 2021) && (date.getMonth() == 5) && (date.getDate() > 14) && (date.getDate() < 30)){
        let prmAlertBar = document.getElementsByClassName('topbar-wrapper');
        let alertBarDiv = document.createElement('div');
        alertBarDiv.setAttribute('id', 'customAlertBar');
        alertBarDiv.setAttribute('style', 'align-content: center;align-items: center;');
        alertBarDiv.setAttribute('layout-align', 'center center');
        let alertBarInnerDiv = document.createElement('div');
        alertBarInnerDiv.setAttribute('style', 'text-align: center;background-color: #fcd02f;padding: 3px 0;font-size: 20px;');

        /*alert banner message to customize */
        alertBarInnerDiv.innerHTML = 'Alert: Library Search will be down for maintenance Saturday, May 29 6:00PM – Sunday, May 30 6:00PM';
        alertBarDiv.appendChild(alertBarInnerDiv);
        prmAlertBar[0].prepend(alertBarDiv);
        clearInterval(alertBanner);
    }
}, 5000);
