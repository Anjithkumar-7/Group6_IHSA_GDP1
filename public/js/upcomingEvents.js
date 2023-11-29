document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let eventId = urlParams.get("EventID");
    let eventName = urlParams.get("eventname");


    const downloadLink = document.getElementById('download-link');

    try {

        const response = await fetch('/getPatternsData?eventId=' + eventId);
        // const data = await response.json();
        // let patternResponse = data.patterns[0];

        // const fileName = patternResponse.fileName;
        // const fileContent = patternResponse.fileContent;


        // // Creating a Blob object from the file content
        // const blob = new Blob([fileContent], { type: 'application/octet-stream' });

        // // Creating a temporary URL for the Blob object
        // const blobUrl = URL.createObjectURL(blob);

        // // Set the download link href and filename attribute
        // downloadLink.href = blobUrl;
        // downloadLink.setAttribute('download', fileName);

        if (response.status === 200) {
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            downloadLink.href = blobUrl;
            downloadLink.setAttribute('download', fileName);
        } else {
            // Hide the download button or show an alert indicating no file available
            // downloadLink.style.display = 'none';
            // alert('No file available to download');

            const noFileText = document.getElementById('no-file-text');
            noFileText.style.display = 'inline';
            noFileText.style.color = 'red';
        }
        downloadLink.addEventListener('click', function (event) {
            if (response.status !== 200) {
                event.preventDefault(); // Prevents default action (i.e., don't follow the link)
                alert('No file available to download');
            }
        });
    } catch (error) {
        console.error('Error fetching file:', error);
    }
    // });



    //Schedule data display block starts.
    var classList = [], result;

    // Fetch data
    try {
        result = await fetch('/getSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EventID: eventId,
            })
        }).then((res) => res.json());
    } catch (error) {
        console.error('Error fetching data:', error);
        return;
    }
    console.log('Schedule result:-', result);
    if (result.list) {
        result.list.forEach(data => {
            classList.push(data.ClassName)
        });
        var classes = [...new Set(classList)]; // Remove duplicates
        console.log('Unique classes after duplicate removal:-', classes);
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

            orderHeader.textContent = 'Sl.No';
            riderIdHeader.textContent = 'Rider ID';
            riderNameHeader.textContent = 'Rider Name';
            riderSchoolHeader.textContent = 'Rider School';
            horseNameHeader.textContent = 'Horse Name';
            horseProviderHeader.textContent = 'Horse Provider';

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


                // Populate the "Order" cell with the initial value
                orderCell.textContent = index + 1; // Order starts from 1
                // Rest of your row population code...
                riderIdCell.textContent = getRiderId(data.RiderName, className, result);
                riderNameCell.textContent = data.RiderName;
                riderSchoolCell.textContent = getRiderSchool(data.RiderName, result);
                horseNameCell.textContent = data.HorseName;
                horseProviderCell.textContent = getHorseProvider(data.HorseName, className, result);
            });

            // Function to reorder rows based on the order values

            // Append the table to the container div
            classTablesDiv.appendChild(table);
        });
    }
});


// Helper functions to retrieve rider ID, rider school, and horse provider
function getRiderId(riderName, className, result) {
    var rider = result.riders.find(data => data.Name === riderName && data.Class === className);
    return rider ? rider.RiderId : 'No Rider Id Found';
}

//Helper functions to retrieve riders school information.
function getRiderSchool(riderName, result) {
    var rider = result.riders.find(data => data.Name === riderName);
    return rider ? rider.School : 'No Rider School Found';
}

//Helper functions to retrieve horse provider information.
function getHorseProvider(horseName, className, result) {
    // console.log('HorseName:-', horseName, 'classsName', className);
    var horse = result.horses.find(data => data.Name === horseName && data.Class === className);
    return horse ? horse.Provider : 'No Data Present';
}