document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get('EventID');
    var EventName = urlParams.get('eventname');
    var classList = [];

    // Define the result variable at a higher scope
    var result;

    // Fetch data
    try {
        result = await fetch('/getSchedule', {
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
        var classesList = [];
        result.list.forEach(data => {
            classList.push(data.ClassName)
        });
        var classes = [...new Set(classList)]; // Remove duplicates
        console.log(classes)
        // Create a container div for all the tables
        var classTablesDiv = document.getElementById('class-tables');

        // Create tables for each class and append them to the container
        classes.forEach(className => {
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
            var action = headerRow.insertCell(6);

            orderHeader.textContent = 'Order';
            riderIdHeader.textContent = 'Rider ID';
            riderNameHeader.textContent = 'Rider Name';
            riderSchoolHeader.textContent = 'Rider School';
            horseNameHeader.textContent = 'Horse Name';
            horseProviderHeader.textContent = 'Horse Provider';
            action.textContent = 'Action';

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
                var editCell = row.insertCell(6); // Add a cell for the "Edit" button
            
                // Create an "Edit" button
                var editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', function () {
                    // Make the "Order" cell editable
                    orderCell.contentEditable = true;
                    orderCell.focus(); // Focus on the "Order" cell
                });
            
                // Append the "Edit" button to the editCell
                editCell.appendChild(editButton);
            
                // Populate the "Order" cell with the initial value
                orderCell.textContent = index + 1; // Order starts from 1
            
                // Add an event listener to the "Order" cell for editing
                orderCell.addEventListener('input', function () {
                    var newOrder = parseInt(orderCell.textContent);
                    if (!isNaN(newOrder)) {
                        // Update the order in your data
                        classData[index].Order = newOrder;
                        // Reorder the rows based on the updated order values
                        reorderRows(tbody);
                    }
                });
            
                // Rest of your row population code...
                riderIdCell.textContent = getRiderId(data.RiderName, className, result);
                riderNameCell.textContent = data.RiderName;
                riderSchoolCell.textContent = getRiderSchool(data.RiderName, result);
                horseNameCell.textContent = data.HorseName;
                horseProviderCell.textContent = getHorseProvider(data.HorseName, className, result);
            });
            
            // Function to reorder rows based on the order values
            function reorderRows(tbody) {
                var rows = Array.from(tbody.rows);
                rows.sort(function (a, b) {
                    var orderA = parseInt(a.cells[0].textContent);
                    var orderB = parseInt(b.cells[0].textContent);
                    return orderA - orderB;
                });
            
                // Remove all rows from the tbody
                rows.forEach(function (row) {
                    tbody.removeChild(row);
                });
            
                // Add rows back in the new order
                rows.forEach(function (row) {
                    tbody.appendChild(row);
                });
            }
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
        });
    }
});

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
