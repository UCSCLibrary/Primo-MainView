/* 
 * Alert banner
 * Code borrowed from UCI
 */
let alertBanner = window.setInterval(function(){
    let date = new Date();

    /* Different date conditions may be added to control when the banner appears
     * Tip: getMonth() returns 0-11.
     */
    if((date.getMonth() == 5) && (date.getDate() > 20) && (date.getDate() < 27)){
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
            alertBarInnerDiv.innerHTML = 'Proquest Ebook Central will be unavailable on Saturday, June 26 from 7AM - 3PM; this will impact some of our ebooks. <a href="https://library.ucsc.edu/news/some-ebooks-unavailable-saturday-june-26-from-7am-3pm">More information</a>';
            alertBarDiv.appendChild(alertBarInnerDiv);
            prmAlertBar[0].prepend(alertBarDiv);
        }
        clearInterval(alertBanner);
    }
}, 5000);
