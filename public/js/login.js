const login = document.getElementById('loginForm');
login.addEventListener('submit', async (e) => {
    e.preventDefault();
        const data = new FormData(e.target);
        const object = {};
        data.forEach((value, key) => {
            object[key] = value;
        });
        console.log(object)
       const result = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        })
        .then(response => response.json())
        .then(responseData => {
            if(responseData.success){
                console.log(responseData);
                window.location.href="adminEvents.html";
            }else{
                console.log(responseData)
                alert(responseData.error)
            }
        })
    });
