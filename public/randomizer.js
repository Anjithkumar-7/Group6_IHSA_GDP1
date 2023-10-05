document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  var EventID = urlParams.get("EventID");
  var EventName = urlParams.get("eventname");
  var classList = [];
  var result = await fetch("/getCombinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      EventID: EventID,
    }),
  }).then((res) => res.json());
  console.log(result);
  if (result.list) {
    result.list.forEach((data) => {
      classList.push(data.classname);
    });
    var classes = [...new Set(classList)];
    classes = classes.sort();
    // console.log(classes)
    classes.forEach((data) => {
      var temp = `<option value="${data}">
            ${data}
          </option>`;
      document.getElementById("classSelection").innerHTML += temp;
    });
  }

  // Fetch data
    const result2 = await fetch("/getSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EventID: EventID,
      }),
    }).then((res) => res.json());
    console.log(result2);
  if(result2.list) {
    const classSelcted = document.getElementById("classSelection").value;
    var classList = [];
    result2.list.forEach((data) => {
      classList.push(data.ClassName);
    });
    var classes = [...new Set(classList)]; // Remove duplicates
    classes = classes.sort();
    // console.log(classes)

    var classTablesDiv = document.getElementById("class-tables");

    classes.forEach((className) => {
      if (className) {
        var heading = document.createElement("h4");
        heading.textContent = className;
        heading.classList.add("class-heading");
        heading.setAttribute("data-class", className);
        classTablesDiv.appendChild(heading);

        // Create a new table
        var table = document.createElement("table");
        table.classList.add("class-table");
        table.setAttribute("data-class", className);
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

        orderHeader.textContent = "Order";
        riderIdHeader.textContent = "Rider ID";
        riderNameHeader.textContent = "Rider Name";
        riderSchoolHeader.textContent = "Rider School";
        horseNameHeader.textContent = "Horse Name";
        horseProviderHeader.textContent = "Horse Provider";
        //   action.textContent = 'Action';

        var classData = result2.list.filter(
          (data) => data.ClassName === className
        );
          console.log(classData)
        classData.forEach((data, index) => {
          var row = tbody.insertRow();
          var orderCell = row.insertCell(0);
          var riderIdCell = row.insertCell(1);
          var riderNameCell = row.insertCell(2);
          var riderSchoolCell = row.insertCell(3);
          var horseNameCell = row.insertCell(4);
          var horseProviderCell = row.insertCell(5);
          //   var editCell = row.insertCell(6); // Add a cell for the "Edit" button

          riderIdCell.textContent = getRiderId(
            data.RiderName,
            className,
            result2
          );
          riderNameCell.textContent = data.RiderName;
          riderSchoolCell.textContent = getRiderSchool(
            data.RiderName,
            result2
          );
          horseNameCell.textContent = data.HorseName;
          horseProviderCell.textContent = getHorseProvider(
            data.HorseName,
            className,
            result2
          );
        });

        classTablesDiv.appendChild(table);
      }
    });
  } else {
    result2.errorMessage ? alert(result2.errorMessage) : alert(result2.error);
  }
});

function displayClassTables(selectedClass) {
  document.querySelectorAll(".class-table, .class-heading").forEach((element) => {
    element.style.display = "none";
  });
  document.querySelectorAll(`.class-table[data-class="${selectedClass}"], .class-heading[data-class="${selectedClass}"]`).forEach((element) => {
    element.style.display = element.classList.contains('class-table') ? "table" : "block";
  });
}
async function updateRandomizer() {
  const urlParams = new URLSearchParams(window.location.search);
  var EventID = urlParams.get("EventID");
  var EventName = urlParams.get("eventname");
  const classSelcted = document.getElementById("classSelection").value;
  displayClassTables(classSelcted);
  var horses = [],
    riders = [],hConstraint=[],rConstraint =[];
  console.log(classSelcted);
  const result2 = await fetch("/getRandom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      EventID: EventID,
      classname: classSelcted,
    }),
  }).then((res) => res.json());
  console.log(result2);
  if (result2.success) {
    console.log(result2.rlist, result2.hlist);
    horses = result2.hlist;
    riders = result2.rlist;
    

    const horseListElement = document.getElementById("horseNames");
    const riderListElement = document.getElementById("riderNames");

    horseListElement.innerHTML = "";
    riderListElement.innerHTML = "";

    let horseName = "" ;
    let riderName = "" ;

    for (let i = 0; i < riders.length; i++) {
      // const horseIndex = i < horses.length ? i : i % horses.length; // Wrap around available horses if necessary
      //  const horseItem = `<li>${horses[horseIndex].Name}</li>`;
      if(riders[i].Height !== null && riders[i].Weight !== null) {
        rConstraint.push(riders[i].Name);
        riderName = riders[i].Name+" [H][W]"
      }else if(riders[i].Height !== null){
        rConstraint.push(riders[i].Name);
        riderName = riders[i].Name+" [H]"
      }else if(riders[i].Weight !== null){
        rConstraint.push(riders[i].Name);
        riderName = riders[i].Name+" [W]"
      }else{
        riderName = riders[i].Name
      }
      const riderItem = `<li>${riderName}</li>`;
      // horseListElement.innerHTML += horseItem;
      riderListElement.innerHTML += riderItem;
    }
    for (let h = 0; h < horses.length; h++) {

      if(horses[h].Spurs !== null){
        hConstraint.push(horses[h].Name);
        horseName = horses[h].Name+" [C]";
      }
      else{
        horseName = horses[h].Name;
      }
      const horseItem = `<li>${horseName}</li>`;
      horseListElement.innerHTML += horseItem;
    }
    
  } 
}


function getRiderId(riderName, className, result) {
  var rider = result.riders.find(
    (data) => data.Name === riderName && data.Class === className
  );
  return rider ? rider.RiderId : "-";
}

function getRiderSchool(riderName, result) {
  var rider = result.riders.find((data) => data.Name === riderName);
  return rider ? rider.School : "-";
}

function getHorseProvider(horseName, className, result) {
  var horse = result.horses.find(
    (data) => data.Name === horseName && data.Class === className
  );
  return horse ? horse.Provider : "-";
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

function customShuffling(horsearray,riderarray){
  if (horsearray.length < riderarray.length) {
    const lowHorseArray = [];
    for (let k = 0; k < riderarray.length; k++) {
      const randomIndex = Math.floor(Math.random() * horsearray.length);
      const selectedHorse = horsearray[randomIndex];
      lowHorseArray.push(selectedHorse);
    }
    return shuffleArray(lowHorseArray);
  } else if (horsearray.length > riderarray.length) {
    const highHorseArray = [...horsearray];

    for (let h = 0; h < horsearray.length; h++) {
      const j = Math.floor(Math.random() * (h + 1));
      [highHorseArray[h], highHorseArray[j]] = [
        highHorseArray[j],
        highHorseArray[h],
      ];
    }
    const resulthighHorseArray = highHorseArray.splice(0, riderarray.length);

    return  shuffleArray(resulthighHorseArray);
  } else {
    return shuffleArray(horsearray);
  }
}


function generateRandomCombinations() {
  
  var randomCombinationsTable = document.getElementById("randomCombinations");
  randomCombinationsTable.innerHTML = "";

  const horseList = document.getElementById("horseNames");
  const riderList = document.getElementById("riderNames");



  const horses = Array.from(horseList.querySelectorAll("li"));
  const riders = Array.from(riderList.querySelectorAll("li"));
  

  let horsearray = horses.map((horse) => horse.textContent);
  let riderarray = riders.map((rider) => rider.textContent);

  let hConstraint = horsearray.filter(horse => horse.includes('['));
  let rConstraint = riderarray.filter(rider => rider.includes('['));

  let nHConstraint = horsearray.filter(horse => !new Set(hConstraint).has(horse));
  let nRConstraint = riderarray.filter(rider => !new Set(rConstraint).has(rider));


  let shuffledHorses = customShuffling(nHConstraint,rConstraint);
  let shuffledRiders = shuffleArray(rConstraint);
  let unUsedHorses = horsearray.filter(unHorse => !new Set(shuffledHorses).has(unHorse));
  let shuffledHorses2 = customShuffling(unUsedHorses,nRConstraint);
  let shuffledRiders2 = shuffleArray(nRConstraint);

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

  for (var i = 0; i < shuffledHorses2.length; i++) {
    var horseName = shuffledHorses2[i];
    var riderName = shuffledRiders2[i];

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
  var EventID = urlParams.get("EventID");
  var EventName = urlParams.get("eventname");
  var savedCombinations = [];
  let horsesArray = [];
  let ridersArray = [];
  let table = document.getElementById("randomCombinations");
  let tableStruct = table.children;
  let tbody = tableStruct[1];

  const rows = tbody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    console.log("val" + rows);
    const columns = row.getElementsByTagName("td");
    console.log(columns);
    // Extract horse and rider values from the columns
    const horse = columns[0].innerText.replace(/\[.*\]/g,'').trim();
    const rider = columns[1].innerText.replace(/\[.*\]/g, '').trim();

    // Push the values into their respective arrays
    if (horse !== "undefined") {
      horsesArray.push(horse);
    }
    if (rider !== "undefined") {
      ridersArray.push(rider);
    }
  }

  // const horseList = document.getElementById("horseNames");
  // const riderList = document.getElementById("riderNames");
  // const horses = Array.from(horseList.children);
  // const riders = Array.from(riderList.children);

  const savedCombination = {
    className: document.getElementById("classSelection").value,
    // horses: horses.map((horse) => horse.textContent),
    // riders: riders.map((rider) => rider.textContent),
    horses: horsesArray,
    riders: ridersArray,
  };

  console.log("Hiii  " + savedCombination.horses + savedCombination.riders);
  savedCombinations.push(savedCombination);


  //console.log(savedCombinations);
  //  console.log(horses,riders);

  const post = await fetch("/saveCombination", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      EventID: EventID,
      classname: savedCombinations[0].className,
      riders: savedCombinations[0].riders,
      horses: savedCombinations[0].horses,
    }),
  }).then((res) => res.json());
  if (post.success) {
    alert("Randomized data Uploaded");
    window.location.reload(true);
  } else {
    alert("Failed to upload");
  }
}
