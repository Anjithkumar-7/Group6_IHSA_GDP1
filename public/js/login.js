let redirecting = false;
const token = sessionStorage.getItem("token");



function checkTokenAndRedirect() {
  if (redirecting) {
    return;
  }

  if (!token && window.location.pathname !== "/adminLogin.html") {
    redirecting = true;
    window.history.pushState({}, '', '/adminLogin.html');
    window.location.href = "/adminLogin.html";
  }
}

window.addEventListener("popstate", () => {
  // Reset the redirect flag after a short delay
  setTimeout(() => {
    redirecting = false;
  }, 1000); // Adjust the delay as needed
  checkTokenAndRedirect();
});

checkTokenAndRedirect();
window.addEventListener("hashchange", () => {
    checkTokenAndRedirect();
  });





  

  
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
            if (responseData.success) {
                console.log(responseData);
                sessionStorage.setItem("token", responseData.token);
                //window.location.href="adminEvents.html";
                const token = sessionStorage.getItem("token");

                if (token) {
                    
                    window.location.href = "/adminEvents.html"; 
                } else {

                    window.location.href = "/adminLogin.html";
                }
            } else {
                console.log("responseData error")
                window.location.href = "/adminLogin.html";
            }
        })
});

