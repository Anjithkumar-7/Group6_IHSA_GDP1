document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get("EventID");

    // Fetch the schedule data
    const scheduleData = await fetch("/getSchedule", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            EventID: EventID,
        }),
    }).then((res) => res.json());
    console.log("Schedule data:-", scheduleData);
    //Checking if the classes category list exist(s)
    var classList = [];
    scheduleData.list.forEach((data) => {
        classList.push(data.ClassName);
    });
    var classes = [...new Set(classList)]; // Remove duplicates classes and list out the unique ones.
    classes = classes.sort(); // Sort the classes by name.
    console.log('Unique classes identified:-', classes);

    //Checking data from the list of combinations.
    if (scheduleData.list) {
        var ridersTable = document.getElementById("rider-tables");
        //Iterate the classes and construct the table header & table data.
        classes.forEach((className, classIndex) => {
            if (className) {
                var heading = document.createElement("h4");
                
       

                heading.textContent = className;
                heading.classList.add("class-heading");
                heading.setAttribute("data-class", className);
                ridersTable.appendChild(heading);
                

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
                var action = headerRow.insertCell(4);
                var horseName = headerRow.insertCell(5);
                var pointsForHorse = headerRow.insertCell(6);

                orderHeader.textContent = "Sl.No";
                riderIdHeader.textContent = "Rider ID";
                riderNameHeader.textContent = "Rider Name";
                riderSchoolHeader.textContent = "Rider School";
                action.textContent = 'Assign Rider Points';
                horseName.textContent = 'Horse Name';
                pointsForHorse.textContent = 'Assign Horse Points';


                var classData = scheduleData.list.filter(
                    (data) => data.ClassName === className
                );
                console.log('Classes data in riders section', classData);//Separate the classes and horses
                classData.forEach((data, index) => {
                    var row = tbody.insertRow();
                    var orderCell = row.insertCell(0);
                    var riderIdCell = row.insertCell(1);
                    var riderNameCell = row.insertCell(2);
                    var riderSchoolCell = row.insertCell(3);
                    var editCell = row.insertCell(4); // Add a cell for the "Edit" button
                    var horseNameCell = row.insertCell(5);
                    var horsePointsCell = row.insertCell(6);
                    // var riderPointsHiddenCell = row.insertCell(7);
                    // var horsePointsHiddenCell = row.insertCell(8);
                    orderCell.textContent = index + 1;
                    let riderObj = getRiderId(
                        data.RiderName,
                        className,
                        scheduleData
                    );

                    // Use the below code to get the horse provider details, if need more details convert it into an object as did above.
                    let horseDetailsObj = getHorseProvider(
                        data.HorseName,
                        className,
                        scheduleData
                    );

                    //

                    riderIdCell.textContent = riderObj.RiderId;
                    riderNameCell.textContent = data.RiderName;
                    riderSchoolCell.textContent = getRiderSchool(data.RiderName, scheduleData);
                    // editCell.innerHTML = `<textarea class="editor"></textarea>`
                    // Replace the textarea with an input of type number
                    // editCell.innerHTML = `<input type="number" class="editor" min="0" max="100" value=${riderObj.points} ${riderObj.points > 0 ? 'disabled' : 'enabled'}>`; //Uncomment this if you want to add disabled field to the rider points.
                    editCell.innerHTML = `<input type="number" class="editor" min="0" max="100" value=${riderObj.points} }>`;
                    horseNameCell.textContent = data.HorseName;
                    // horsePointsCell.innerHTML = `<input type="number" class="editor" min="0" max="100" value=${horseDetailsObj.points} ${horseDetailsObj.points > 0 ? 'disabled' : 'enabled'}> `; //Uncomment this if you want to add disabled field to the horse points.
                    horsePointsCell.innerHTML = `<input type="number" class="editor" min="0" max="100" value=${horseDetailsObj.points} }> `;
                    // riderPointsHiddenCell.innerHTML =  `<input type="hidden" id="riderPointsHiddenCell" name="riderPointsHiddenCell" value=${riderObj.points ? 'assigned' : 'not-assigned'}>`
                    // horsePointsHiddenCell.innerHTML =  `<input type="hidden" id="horsePointsHiddenCell" name="horsePointsHiddenCell" value=${horseDetailsObj.points ? 'assigned' : 'not-assigned'}>`

                });

                // Add a single submit button at the end of the class
                var classSubmitButton = document.createElement("button");
                var tableId = `class-table-${classIndex}`;
                var buttonId = `class-submit-${classIndex}`;
                

                classSubmitButton.setAttribute("id", buttonId);
                classSubmitButton.textContent = `Submit ${className} Data`;
                classSubmitButton.classList.add("submit-button");
                
                
                classSubmitButton.addEventListener("click", async function () {
                    // Handle submission when the class submit button is clicked
                    var tableRows = document.getElementById(tableId).querySelectorAll("tbody tr");
                    let ridersDataArray = [];
                    let horsesDataArray = [];

                    tableRows.forEach((row, dataIndex) => {
                        let riderId = row.cells[1].textContent;
                        let riderName = row.cells[2].textContent;
                        let horseName = row.cells[5].textContent;
                        // var ridersPointsAssigned = row.cells[4].querySelector(".editor").value;
                        let ridersPointsAssigned = parseFloat(row.cells[4].querySelector(".editor").value); // If the data type is number instead of text area.
                        let horsePointsAssigned = parseFloat(row.cells[6].querySelector(".editor").value);
                        // alert(horsePointsAssigned);

                        console.log(`Riders Data Submitted value for ${className}, row ${dataIndex + 1} (Rider ID: ${riderId}) (Rider Name: ${riderName}):`, ridersPointsAssigned);
                        console.log(`Horses Data Submitted value for ${className}, row ${dataIndex + 1} (Horse Name: ${horseName}):`, horsePointsAssigned);
                        if (ridersPointsAssigned) {
                            ridersDataArray.push({
                                EventID,
                                className,
                                riderId,
                                riderName,
                                ridersPointsAssigned
                            })
                        }
                        if (horsePointsAssigned) {
                            horsesDataArray.push({
                                EventID,
                                className,
                                horseName,
                                horsePointsAssigned
                            })
                        }
                    });

                    try {
                        console.log('ridersDataArray:-', ridersDataArray);
                        // console.log('horsesDataArray:-', horsesDataArray);
                        const response = await fetch("/saveRiderPointsToEventClass", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(ridersDataArray),
                        });
                        const responseData = await response.json();
                        console.log("API response:", responseData);
                        if (responseData.statusCode == 1) {
                            alert(responseData.statusMessage);
                            // window.location.reload(true);
                        }
                    } catch (error) {
                        console.error("Error making API call:", error);
                    }

                    try {
                        console.log('horsesDataArray:-', horsesDataArray)
                        const response = await fetch("/saveHorsePointsToEventClass", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(horsesDataArray),
                        });
                        const responseData = await response.json();
                        console.log("API response:", responseData);
                        if (responseData.statusCode == 1) {
                            alert(responseData.statusMessage);
                            window.location.reload(true);
                        }
                    } catch (error) {
                        console.error("Error making API call:", error);
                    }

                });

                ridersTable.appendChild(table);
                table.setAttribute("id", tableId);
                ridersTable.appendChild(classSubmitButton);
            }
        });
    } else {
        scheduleData.errorMessage ? alert(scheduleData.errorMessage) : alert(scheduleData.error);
    }

});



function getRiderId(riderName, className, result) {
    var rider = result.riders.find(
        (data) => data.Name === riderName && data.Class === className
    );
    console.log('Rider data returned', rider);
    // return rider ? rider.RiderId : "-";
    return rider;
}

function getRiderSchool(riderName, result) {
    var rider = result.riders.find((data) => data.Name === riderName);
    return rider ? rider.School : "-";
}

function getHorseProvider(horseName, className, result) {

    console.log('Horsenname:-', horseName, 'className:-', className)
    var horse = result.horses.find(
        (data) => data.Name === horseName && data.Class === className
    );
    console.log('Horse Data Returned', horse);
    // return horse ? horse.Provider : "-";
    return horse;
}




