document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    var eventId = urlParams.get("EventID");
    var eventName = urlParams.get("eventname");

    const eventData = await fetch("/getEventByEventIdAndPatternData?eventId=" + eventId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json());
    let singleEvent = eventData.event[0];
    let patternData = eventData.patternData[0];
    console.log('Pattern Data', patternData)

    if (singleEvent) {
        let patternsTable = document.getElementById("pattern-table");
        var tbody = patternsTable.createTBody();
        var row = tbody.insertRow();
        var eventNameCell = row.insertCell(0);
        var dateAndTimeCell = row.insertCell(1);
        var locationCell = row.insertCell(2);
        var patternNameCell = row.insertCell(3);
        var uploadPatternCell = row.insertCell(4);
        // var fileNameCell = row.insertCell(5);

        eventNameCell.textContent = singleEvent.EventName;
        dateAndTimeCell.textContent = singleEvent.EventDate;
        locationCell.textContent = singleEvent.EventLocation;

        // Create textarea for patternNameCell
        var patternTextarea = document.createElement('textarea');
        patternTextarea.classList.add('editor');
        let patternValue = patternData ? patternData.patternName : '';
        patternTextarea.value = patternValue;
        patternTextarea.addEventListener('input', function (event) {
            // Get the value from the textarea and do something with it
            patternValue = event.target.value;
            // You can use patternValue in an API call or store it for later use
        });
        patternNameCell.appendChild(patternTextarea);

        // Create file input and upload button for uploadPatternCell
        var fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.classList.add('file-input');
        fileInput.setAttribute('accept', 'application/pdf');

        var uploadButton = document.createElement('button');
        uploadButton.textContent = 'Upload';
        uploadButton.classList.add('upload-button');

        var fileNameParagraph = document.createElement('p');
        fileNameParagraph.textContent = patternData && patternData.fileName ? patternData.fileName : '';
        // fileNameCell.appendChild(fileNameParagraph);

        if (patternData && patternData.fileName) {
            fileInput.setAttribute('value', patternData.fileName);
            // fileInput.setAttribute('disabled', 'true'); // Disable file input
            // uploadButton.setAttribute('disabled', 'true'); // Disable upload button
            // uploadButton.style.display = 'none';
        };

        uploadButton.addEventListener('click', async function () {
            // Handle the file upload here
            let file = fileInput.files[0];
            let patternValue = patternTextarea.value;

            if (file && patternValue) {
                // Use the file in an API call or perform necessary actions
                const formData = new FormData();
                formData.append('file', file);
                formData.append('patternName', patternValue);
                formData.append('eventId', eventId);
                formData.append('eventName', eventName);

                console.log(patternValue);
                console.log("file:-", file);

                // Make an API call to upload the file
                try {
                    const response = await fetch('/uploadPatternData', {
                        method: 'POST',
                        body: formData,
                    });
                    const responseData = await response.json();
                    console.log("API response:", responseData);
                    if (responseData.statusCode == 1) {
                        alert(responseData.statusMessage);
                        window.location.reload(true);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            } else {
                console.error('No file selected.');
            }
        });

        uploadPatternCell.appendChild(fileInput);
        uploadPatternCell.appendChild(uploadButton);
        uploadPatternCell.appendChild(fileNameParagraph)
    }
});
