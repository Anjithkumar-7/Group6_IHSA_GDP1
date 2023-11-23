
document.addEventListener('DOMContentLoaded', async function () {

    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get('EventID');
    var eventName = urlParams.get('eventname');

    if (eventName && EventID) {
    // if (EventID) {

        const links = document.querySelectorAll('.admin-btn');
        links.forEach(link => {
            const href = link.getAttribute('href');
            // link.setAttribute('href', `${href}?eventname=${eventName}&EventID=${EventID}`);
            link.setAttribute('href', `${href}?eventname=${eventName}&EventID=${EventID}`);
            //Uncomment this to add/change the url in the admin.html page to add hyperlinks to all the cards.
            // link.setAttribute('href', `${href}?EventID=${EventID}`);
        });

        //Hide the particular card using the anchor id for that particular element.
        if(sessionStorage.usertype == 'show_admin'){
            var scheduleCard = document.getElementById("schedule-card");
            scheduleCard.classList.add("hidden-card-class");
            var usersCard = document.getElementById("useraccess-card");
            usersCard.classList.add("hidden-card-class");
            var eventsHeaderLink = document.getElementById("events-hyper-link-header");
            eventsHeaderLink.classList.add("hidden-card-class");
            
        }
        // document.getElementById("dashboardName").innerText = eventName + " - Dashboard";
        document.getElementById("dashboardName").innerText =  eventName + " - Admin Dashboard";
        /*  const result = await fetch('/createEventDashboard', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   eventName : eventName
               })
           })
           .then((res) => res.json());
           console.log(result);  */
    }

});
