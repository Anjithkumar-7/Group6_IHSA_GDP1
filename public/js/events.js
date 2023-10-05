
document.addEventListener('DOMContentLoaded', async function () {

    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get('EventID');
    var eventName = urlParams.get('eventname');
    
    if(eventName && EventID){

        const links = document.querySelectorAll('.admin-btn');
        links.forEach(link => {
        const href = link.getAttribute('href');
        link.setAttribute('href', `${href}?eventname=${eventName}&EventID=${EventID}`);
        });
        document.getElementById("dashboardName").innerText = eventName + " - Dashboard";
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