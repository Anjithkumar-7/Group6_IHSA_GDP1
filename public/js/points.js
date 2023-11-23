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

                orderHeader.textContent = "Sl.No";
                riderIdHeader.textContent = "Rider ID";
                riderNameHeader.textContent = "Rider Name";
                riderSchoolHeader.textContent = "Rider School";
                action.textContent = 'Assign Points';

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
                    orderCell.textContent = index + 1;
                    riderIdCell.textContent = getRiderId(
                        data.RiderName,
                        className,
                        scheduleData
                    );
                    riderNameCell.textContent = data.RiderName;
                    riderSchoolCell.textContent = getRiderSchool(data.RiderName, scheduleData);
                    // editCell.innerHTML = `<textarea class="editor"></textarea>`
                    // Replace the textarea with an input of type number
                    editCell.innerHTML = `<input type="number" class="editor" min="0" max="100">`;

                });

                // Add a single submit button at the end of the class
                var classSubmitButton = document.createElement("button");
                var tableId = `class-table-${classIndex}`;
                var buttonId = `class-submit-${classIndex}`;
                classSubmitButton.setAttribute("id", buttonId);
                classSubmitButton.textContent = `Submit ${className} Data`;
                classSubmitButton.classList.add("class-submit-button");
                classSubmitButton.addEventListener("click", async function () {
                    // Handle submission when the class submit button is clicked
                    var tableRows = document.getElementById(tableId).querySelectorAll("tbody tr");
                    var formDataArray = [];

                    tableRows.forEach((row, dataIndex) => {
                        var riderId = row.cells[1].textContent;
                        var riderName = row.cells[2].textContent;
                        // var pointsAssigned = row.cells[4].querySelector(".editor").value;
                        var pointsAssigned = parseFloat(row.cells[4].querySelector(".editor").value); // If the data type is number instead of text area.

                        console.log(`Submitted value for ${className}, row ${dataIndex + 1} (Rider ID: ${riderId}) (Rider Name: ${riderName}):`, pointsAssigned);
                        if (pointsAssigned) {
                            formDataArray.push({
                                className,
                                riderId,
                                riderName,
                                pointsAssigned
                            })
                        }
                    });

                    try {
                        console.log('FormDataArray:-', formDataArray)
                        const response = await fetch("/saveRiderPoints", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formDataArray),
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

    //Checking if the horses are available or not.
    if (scheduleData.horses.length) {

        //New implementation starts
        var horseTable = document.getElementById("horse-tables");
        console.log('Unique classes identified inside horses :-', classes);
        //Iterate the classes and construct the table header & table data.
        classes.forEach((className, classIndex) => {
            if (className) {
                var heading = document.createElement("h4");
                heading.textContent = className;
                heading.classList.add("class-heading");
                heading.setAttribute("data-class", className);
                horseTable.appendChild(heading);

                // Create a new table
                var table = document.createElement("table");
                table.classList.add("class-table-horses");
                table.setAttribute("data-class", className);
                var thead = table.createTHead();
                var tbody = table.createTBody();

                // Create table headers
                var headerRow = thead.insertRow();
                var orderHeader = headerRow.insertCell(0);
                var horseIdHeader = headerRow.insertCell(1);
                var action = headerRow.insertCell(2);

                orderHeader.textContent = "Sl.No";
                horseIdHeader.textContent = "Horse Name";
                action.textContent = 'Assign Points';

                var classData = scheduleData.list.filter(
                    (data) => data.ClassName === className
                );
                console.log('classes data in the horses section:-', classData);//Separate the classes and horses
                classData.forEach((data, index) => {
                    var row = tbody.insertRow();
                    var orderCell = row.insertCell(0);
                    var horseNameCell = row.insertCell(1);
                    var editCell = row.insertCell(2); // Add a cell for the "Edit" button

                    orderCell.textContent = index + 1;
                    horseNameCell.textContent = data.HorseName;
                    // editCell.innerHTML = `<textarea class="editor"></textarea>`
                    // Replace the textarea with an input of type number
                    editCell.innerHTML = `<input type="number" class="editor" min="0" max="100">`;

                });

                // Add a single submit button at the end of the class
                var classSubmitButton = document.createElement("button");
                var tableId = `class-table-horses-${classIndex}`;
                var buttonId = `class-submit-${classIndex}`;
                classSubmitButton.setAttribute("id", buttonId);
                classSubmitButton.textContent = `Submit ${className} Data`;
                classSubmitButton.classList.add("class-submit-button");
                classSubmitButton.addEventListener("click", async function () {
                    // Handle submission when the class submit button is clicked
                    var tableRows = document.getElementById(tableId).querySelectorAll("tbody tr");
                    let horsesDataArray = [];
                    tableRows.forEach((row, dataIndex) => {
                        // console.log('Row value', row);
                        var horseName = row.cells[1].textContent;
                        // var pointsAssigned = row.cells[2].querySelector(".editor").value;
                        var pointsAssigned = parseFloat(row.cells[2].querySelector(".editor").value);//If  pointsAssigned field data type is text area.

                        console.log(`Submitted value for ${className}, row ${dataIndex + 1} (Horse Name: ${horseName}):`, pointsAssigned);
                        if (pointsAssigned) {
                            horsesDataArray.push({
                                className,
                                horseName,
                                pointsAssigned
                            })
                        }
                        // You can perform further actions with the submitted values here
                    });
                    try {
                        console.log('horsesDataArray:-', horsesDataArray)
                        const response = await fetch("/saveHorsePoints", {
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

                horseTable.appendChild(table);
                table.setAttribute("id", tableId);
                horseTable.appendChild(classSubmitButton); // Add the class submit button
            }
        });

        //New implementation ends here.
    }
});



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




