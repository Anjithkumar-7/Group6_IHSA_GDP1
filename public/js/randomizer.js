
document.addEventListener("DOMContentLoaded", async function () {     
    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get('EventID');
    var EventName = urlParams.get('eventname');
    var classList = [];
    var result = await fetch('/getCombinations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           EventID : EventID,
        })
    })
    .then((res) => res.json());
    console.log(result)
    if(result.list){
        result.list.forEach(data => {
            classList.push(data.classname)
        })
        var classes = [...new Set(classList)];
       // console.log(classes)
        classes.forEach(data=> {
            var temp = `<option value="${data}">
            ${data}
          </option>`
          document.getElementById('classSelection').innerHTML += temp
        });
    
    }

});

async function updateRandomizer(){
        
    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get('EventID');
    var EventName = urlParams.get('eventname');
    const classSelcted = document.getElementById("classSelection").value;
    var horses = [], riders = [];
    console.log(classSelcted);
    const result2 = await fetch('/getRandom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           EventID : EventID,
           classname : classSelcted
        })
    })
    .then((res) => res.json());
    console.log(result2)
    if(result2.success){

            console.log(result2.rlist,result2.hlist);
            horses=result2.hlist
            riders=result2.rlist
            // Determine the number of items to display (minimum of horse and rider count)
         //   const itemCount = Math.max(horses.length, riders.length);

            // Get the element where you want to display the list
            const horseListElement = document.getElementById("horseNames");
            const riderListElement = document.getElementById("riderNames");

            // Clear the previous content if any
            horseListElement.innerHTML = "";
            riderListElement.innerHTML = "";

            // Loop through and display the items
            for (let i = 0; i < riders.length; i++) {
                const horseIndex = i < horses.length ? i : i % horses.length; // Wrap around available horses if necessary
                const horseItem = `<li>${horses[horseIndex].Name}</li>`;
                const riderItem = `<li>${riders[i].Name}</li>`;
                horseListElement.innerHTML += horseItem;
                riderListElement.innerHTML += riderItem;
              }
    }
}

// Helper functions to retrieve rider ID, rider school, and horse provider
function getRiderId(riderName, className, result) {
    var rider = result.riders.find(data => data.Name === riderName && data.Class === className);
    return rider ? rider.RiderId : '';
}

function getRiderSchool(riderName, result) {
    var rider = result.riders.find(data => data.Name === riderName);
    return rider ? rider.School : '';
}

function getHorseProvider(horseName, className, result) {
    var horse = result.horses.find(data => data.Name === horseName && data.Class === className);
    return horse ? horse.Provider : '';
}
      // Function to shuffle an array using Fisher-Yates algorithm
      function shuffleArray(array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }




function generateRandomCombinations() {
   
    var randomCombinationsTable =
          document.getElementById("randomCombinations");
        randomCombinationsTable.innerHTML = "";

        const horseList = document.getElementById("horseNames");
        const riderList = document.getElementById("riderNames");
        
        // Get the list items as an array
        const horses = Array.from(horseList.querySelectorAll("li"));
        const riders = Array.from(riderList.querySelectorAll("li"));
        let horsearray = horses.map(horse => horse.textContent);
        let riderarray = riders.map(rider => rider.textContent);
      //  console.log(horsearray,riderarray)
        //

        var shuffledHorses = shuffleArray(horsearray);
        var shuffledRiders = shuffleArray(riderarray);

        var tableHeader = document.createElement("thead");
        var headerRow = document.createElement("tr");
        var horseHeader = document.createElement("th");
        horseHeader.innerText = "Horse";
        var riderHeader = document.createElement("th");
        riderHeader.innerText = "Rider";
        headerRow.appendChild(horseHeader);
        headerRow.appendChild(riderHeader);
        tableHeader.appendChild(headerRow);
        randomCombinationsTable.appendChild(tableHeader);

        var tableBody = document.createElement("tbody");
        for (var i = 0; i < shuffledHorses.length; i++) {
          var horseName = shuffledHorses[i];
          var riderName = shuffledRiders[i];

          var row = document.createElement("tr");
          var horseCell = document.createElement("td");
          horseCell.innerText = horseName;
          var riderCell = document.createElement("td");
          riderCell.innerText = riderName;
          row.appendChild(horseCell);
          row.appendChild(riderCell);
          tableBody.appendChild(row);
        }
        randomCombinationsTable.appendChild(tableBody);
 
}

async function saveCombinations() {
    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get('EventID');
    var EventName = urlParams.get('eventname');
    var savedCombinations = []
    // Get the shuffled combinations from the lists
    const horseList = document.getElementById("horseNames");
    const riderList = document.getElementById("riderNames");
    const horses = Array.from(horseList.children);
    const riders = Array.from(riderList.children);

    // Store the class name and combinations in the savedCombinations array
    const savedCombination = {
        className: document.getElementById("classSelection").value,
        horses: horses.map((horse) => horse.textContent),
        riders: riders.map((rider) => rider.textContent),

    };

    savedCombinations.push(savedCombination);

    // You can now use the savedCombinations array for further processing (e.g., sending to a server, displaying to the user)
    console.log(savedCombinations);
  //  console.log(horses,riders);

  const post = await fetch('/saveCombination', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        EventID :EventID,
        classname: savedCombinations[0].className,
        riders: savedCombinations[0].riders,
        horses: savedCombinations[0].horses
    })
})
.then((res) => res.json());
if(post.success){
    alert("Randomized data Uploaded");

      // Fetch data
      try {
        var result = await fetch('/getSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EventID: EventID,
            })
        }).then((res) => res.json());
    } catch (error) {
        console.error('Error fetching data:', error);
        return;
    }

    if (result.list) {
        const classSelcted = document.getElementById("classSelection").value;
        var classList = [];
        result.list.forEach(data => {
            classList.push(data.ClassName)
        });
        var classes = [...new Set(classList)]; // Remove duplicates
       // console.log(classes)
        // Create a container div for all the tables
        var classTablesDiv = document.getElementById('class-tables');

        // Create tables for each class and append them to the container
        classes.forEach(className => {

            if(className == classSelcted){

            // Create an <h2> heading for the table with the class name
            var heading = document.createElement('h4');
            heading.textContent = className;

            // Append the heading to the container div
            classTablesDiv.appendChild(heading);

            // Create a new table
            var table = document.createElement('table');
            table.classList.add('class-table');
            var thead = table.createTHead();
            var tbody = table.createTBody();

            // Create table headers
            var headerRow = thead.insertRow();
            var orderHeader = headerRow.insertCell(0);
            var riderIdHeader = headerRow.insertCell(1);
            var riderNameHeader = headerRow.insertCell(2);
            var riderSchoolHeader = headerRow.insertCell(3);
            var horseNameHeader = headerRow.insertCell(4);
            var horseProviderHeader = headerRow.insertCell(5);
           // var action = headerRow.insertCell(6);

            orderHeader.textContent = 'Order';
            riderIdHeader.textContent = 'Rider ID';
            riderNameHeader.textContent = 'Rider Name';
            riderSchoolHeader.textContent = 'Rider School';
            horseNameHeader.textContent = 'Horse Name';
            horseProviderHeader.textContent = 'Horse Provider';
         //   action.textContent = 'Action';

            // Filter data for the current class
            var classData = result.list.filter(data => data.ClassName === className);

            classData.forEach((data, index) => {
                var row = tbody.insertRow();
                var orderCell = row.insertCell(0);
                var riderIdCell = row.insertCell(1);
                var riderNameCell = row.insertCell(2);
                var riderSchoolCell = row.insertCell(3);
                var horseNameCell = row.insertCell(4);
                var horseProviderCell = row.insertCell(5);
             //   var editCell = row.insertCell(6); // Add a cell for the "Edit" button
            
               
            
            
                // Rest of your row population code...
                riderIdCell.textContent = getRiderId(data.RiderName, className, result);
                riderNameCell.textContent = data.RiderName;
                riderSchoolCell.textContent = getRiderSchool(data.RiderName, result);
                horseNameCell.textContent = data.HorseName;
                horseProviderCell.textContent = getHorseProvider(data.HorseName, className, result);
            });
          /*  // Populate the table with data
            classData.forEach((data, index) => {
                var row = tbody.insertRow();
                var orderCell = row.insertCell(0);
                var riderIdCell = row.insertCell(1);
                var riderNameCell = row.insertCell(2);
                var riderSchoolCell = row.insertCell(3);
                var horseNameCell = row.insertCell(4);
                var horseProviderCell = row.insertCell(5);

                orderCell.textContent = index + 1; // Order starts from 1
                riderIdCell.textContent = getRiderId(data.RiderName, className, result);
                riderNameCell.textContent = data.RiderName;
                riderSchoolCell.textContent = getRiderSchool(data.RiderName, result);
                horseNameCell.textContent = data.HorseName;
                horseProviderCell.textContent = getHorseProvider(data.HorseName, className, result);
            });  */

            // Append the table to the container div
            classTablesDiv.appendChild(table);
        }
        });
    }

} else{
    alert("Failed to upload")
}
}



  
   /* const horseList = document.getElementById("horseNames");
    const riderList = document.getElementById("riderNames");
    
    // Get the list items as an array
    const horses = Array.from(horseList.children);
    const riders = Array.from(riderList.children);

    // Shuffle the arrays
    shuffleArray(horses);
    shuffleArray(riders);

    // Update the list elements
    horses.forEach((horse, index) => {
        horseList.appendChild(horse);
        riderList.appendChild(riders[Math.floor(Math.random() * horses.length)]);
    }); */



    
/*
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}  */