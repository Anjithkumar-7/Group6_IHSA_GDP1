document.addEventListener('DOMContentLoaded', async function () {

    const result = await fetch('/getEventsForPhotos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    if(result){
        if(result.events){
            console.log(result.events);
            const Container = document.getElementById('card-container');
            result.events.forEach((data,index) => {
            var temp = `<div class="card">
            <div class="card-content">
                <h2 class="card-title">${data.EventName}</h2>
                <p class="card-description">Description of Event 1</p>
                <a href="${data.Link ? data.Link : '#'}" class="card-button">View Photos</a>
            </div>
        </div>`  
        Container.innerHTML += temp;
            });
            
        }else{
            console.log(result)
            result.error? alert(result.error) : alert(result.errorMessage);
        }
    }
});