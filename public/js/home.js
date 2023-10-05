document.addEventListener('DOMContentLoaded', async function () {

    const result = await fetch('/getEvents', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json());
    if(result){
        if(result.events){
            console.log(result.events);
            const Container = document.getElementById('event-card-container');
            result.events.forEach((data,index) => {
                var temp = `<a href="upcommingEvents.html" class="event-card-link">

                <div class="event-card">
      
                  <h3 >${data.EventName}</h3>
      
                  <p>Date: <span>${data.EventDate}</span></p>
      
                  <p>Location: <span>${data.EventLocation}</span></p>
      
                </div>
      
              </a>`;
              Container.innerHTML += temp;
            });
            
        }else{
            console.log(result)
            result.error? alert(result.error) : alert(result.errorMessage);
        }
    };

    const result2 = await fetch('/getAllAnnouncements', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json());
    if(result2.events){
        console.log(result2.events);
        const Container = document.getElementById('marquee');
        result2.events.forEach((data,index) => {
           var mar = `
            <p>${data.Content}</p>`
            Container.innerHTML += mar;
        });
    }
});