let redirecting = false;
const token = sessionStorage.getItem("token");


document.addEventListener("DOMContentLoaded", async function () {
  const usertypeSelect = document.getElementById("usertype");
  const eventTypeSelect = document.getElementById("eventType");

  // Add an event listener to the usertype select dropdown
  usertypeSelect.addEventListener("change", function () {
    const selectedValue = usertypeSelect.value;

    // Check if the selected value is "admin" and hide eventTypeSelect
    if (selectedValue === "admin") {
      eventTypeSelect.style.display = "none";
    } else {
      // For any other value, show eventTypeSelect
      eventTypeSelect.style.display = "block";
    }
  });

  // alert('dom laoded');
  const result = await fetch('/getEvents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => res.json())
  console.log('Result ===>', result);

  let eventsResult = [];
  // result.events.forEach(function (element, index) {
  //   eventsResult.push("<option value='" + element.EventID + "'>" + element.Eventname + "</option>");
  // })
  result.events.map(element => {
    eventsResult.push("<option value='" + element.EventID + "'>" + element.EventName + "</option>");
  })
  document.getElementById("eventType").innerHTML = eventsResult;
});

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


//Function to change the display property of dropdown starts.
// let selectBox = document.getElementById('usertype');
//   let selectedValue = selectBox.value;

//   let element = document.getElementById("eventType");
//   // alert(selectedValue);

//   if (selectedValue == 'admin') {
//     element.setAttribute("hidden", "hidden");
//   }

// function changeDropDown() {
//   let selectBox = document.getElementById('usertype');
//   let selectedValue = selectBox.value;

//   let element = document.getElementById("eventType");
//   alert(selectedValue);

//   if (selectedValue == 'admin') {
//     element.setAttribute("hidden", "hidden");
//   }
//   if(selectedValue == 'show_admin'){
//     element.removeAttribute("hidden");
//   }
// }

///Function to change the dropdown value ends.

const login = document.getElementById('loginForm');
login.addEventListener('submit', async (e) => {
  e.preventDefault();


  //--To get the value of the event type from the login form itself without getting the data from the api.
  // var e = document.getElementById("eventType");
  // var text = e.options[e.selectedIndex].text;
  // alert(text);


  const data = new FormData(e.target);
  const object = {};
  data.forEach((value, key) => {
    object[key] = value;
  });
  console.log(object);
  const result = await fetch('/showAdminLogin', {
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
        let eventIdFromResponse = responseData.user.eventId;
        let eventnameFromResponse = responseData.user.EventName;
        sessionStorage.setItem("token", responseData.token);
        sessionStorage.setItem("userData", responseData.user);
        sessionStorage.setItem("usertype", object.usertype);

        //window.location.href="adminEvents.html";
        const token = sessionStorage.getItem("token");

        if (token && object.usertype == 'admin') {
          window.location.href = "/adminEvents.html";
          // window.location.href = `/admin.html?eventname=${eventname}&EventID=${EventID}`;
        }
        else if (token && object.usertype == 'show_admin') {
          // window.location.href = `/admin.html?EventID=${eventIdFromResponse}`;
          window.location.href = `/admin.html?eventname=${eventnameFromResponse}&EventID=${eventIdFromResponse}`;
        } else {
          window.location.href = "/adminLogin.html";
        }
      } else {
        console.log("responseData error")
        window.location.href = "/adminLogin.html";
      }
    })
});

