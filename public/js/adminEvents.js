
document.addEventListener('DOMContentLoaded', async function () {

    const result = await fetch('/getEvents', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    if(result){
        if(result.events){
            console.log(result.events);

            result.events.forEach((data,index) => {
                
            const tableBody = document.getElementById('eventTableBody');
            const newRow = tableBody.insertRow();
        
            // Insert data into cells
            const cell1 = newRow.insertCell();
            const cell2 = newRow.insertCell();
            const cell3 = newRow.insertCell();
            const cell4 = newRow.insertCell();
            const cell5 = newRow.insertCell();
            const cell6 = newRow.insertCell();
            const cell7 = newRow.insertCell();
            // Create a clickable row
            newRow.style.cursor = 'pointer';
            cell1.innerHTML = `<span class="editable-field" readonly>${data.EventName}</span>`;
            cell2.innerHTML = `<span class="editable-field" readonly>${data.EventDate.substr(0,10) + ' ' + data.EventDate.substr(10)}</span>`;
            cell3.innerHTML = `<span class="editable-field" readonly>${data.EventLocation}</span>`;
            cell7.innerHTML = `<span class="editable-field" hidden>${data.EventID}</span>`;
            // Create "Edit" button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', async function(event) {
              event.stopPropagation();
              const row = this.parentNode.parentNode;
              const cells = row.getElementsByTagName('td');
              const editableFields = row.getElementsByClassName('editable-field');
        
              if (row.classList.contains('edit-mode')) {
                // Update button clicked
                row.classList.remove('edit-mode');
                this.textContent = 'Edit';
                console.log(editableFields[0].innerHTML,editableFields[1].innerHTML,editableFields[3].innerHTML)
                for (let i = 0; i < editableFields.length-1; i++) {
                  editableFields[i].contentEditable = 'false';
                  editableFields[i].classList.remove('edit-mode');
                }
                const editResult = await fetch('/editEvent', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    EventID : editableFields[3].innerHTML,
                    name : editableFields[0].innerHTML,
                    date : editableFields[1].innerHTML,
                    location : editableFields[2].innerHTML
                  })
              })
              .then((res) => res.json());
              console.log(editResult);
              if(editResult.success){
                alert(editResult.success);
                window.location.reload(true);
              } else {
                editResult.error ? alert(editResult.error) : alert(editResult.errorMessage);
              }
              } else {
                // Edit button clicked
                row.classList.add('edit-mode');
                this.textContent = 'Update';
                
                for (let i = 0; i < editableFields.length-1 ; i++)
                {
                  editableFields[i].contentEditable = 'true';
                  editableFields[i].classList.add('edit-mode');
                }
              }
            });
        
            cell4.appendChild(editButton);
        
            // Create "Schedule" button
            const scheduleButton = document.createElement('button');
            scheduleButton.innerHTML = '<i class="fas fa-calendar-alt btn-icon"></i>Schedule';
            scheduleButton.classList.add('schedule-button');
            scheduleButton.addEventListener('click', function(event) {
              event.stopPropagation();
              const row = this.parentNode.parentNode;
              const cells = row.getElementsByTagName('td');
              const editableFields = row.getElementsByClassName('editable-field');
              const EventID = editableFields[3].textContent.toString();
              const eventname = editableFields[0].textContent;
              window.location.href = `schedule.html?eventname=${eventname}&EventID=${EventID}`;
              // window.location.href = `schedule.html?EventID=${EventID}`;
            });
        
            cell5.appendChild(scheduleButton);
            // Create "Delete" button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', async function(event) {
              event.stopPropagation();
              const row = this.parentNode.parentNode;
              const cells = row.getElementsByTagName('td');
              const editableFields = row.getElementsByClassName('editable-field');
              const deleteResult = await fetch('/deleteEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  EventID : editableFields[3].innerHTML
                })
            })
            .then((res) => res.json());
            console.log(deleteResult);
            if(deleteResult.success){
              alert(deleteResult.success);
              window.location.reload(true);
            } else {
              deleteResult.error ? alert(deleteResult.error) : alert(deleteResult.errorMessage);
            }
            });
            cell6.appendChild(deleteButton);
        });

        }else{
            console.log(result)
            alert(result.error)
        }
    }

});


document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve entered data
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;
    
    const result = await fetch('/addEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name : eventName,
              time : eventDate+" "+eventTime,
              location : eventLocation
            }),
        })
        .then(response => response.json())
        .then(responseData => {
            if(responseData.success){
                alert(responseData.success)
                console.log(responseData);
                window.location.href="adminEvents.html";
            }else{
                console.log(responseData)
                alert(responseData.error)
            }
        }) 


    /*

    const tableBody = document.getElementById('eventTableBody');
    const newRow = tableBody.insertRow();

    // Insert data into cells
    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    const cell3 = newRow.insertCell();
    const cell6 = newRow.insertCell();
    const cell5 = newRow.insertCell();

    // Create a clickable row
    newRow.style.cursor = 'pointer';

    cell1.innerHTML = `<span class="editable-field" readonly>${eventName}</span>`;
    cell2.innerHTML = `<span class="editable-field" readonly>${eventDate + ' ' + eventTime}</span>`;
    cell3.innerHTML = `<span class="editable-field" readonly>${eventLocation}</span>`;

    // Create "Edit" button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function(event) {
      event.stopPropagation();
      const row = this.parentNode.parentNode;
      const cells = row.getElementsByTagName('td');
      const editableFields = row.getElementsByClassName('editable-field');

      if (row.classList.contains('edit-mode')) {
        // Update button clicked
        row.classList.remove('edit-mode');
        this.textContent = 'Edit';

        for (let i = 0; i < editableFields.length; i++) {
          editableFields[i].contentEditable = 'false';
          editableFields[i].classList.remove('edit-mode');
        }
      } else {
        // Edit button clicked
        row.classList.add('edit-mode');
        this.textContent = 'Update';

        for (let i = 0; i < editableFields.length ; i++)
        {
          editableFields[i].contentEditable = 'true';
          editableFields[i].classList.add('edit-mode');
        }
      }
    });

    cell5.appendChild(editButton);

    // Create "Schedule" button
    const scheduleButton = document.createElement('button');
    scheduleButton.innerHTML = '<i class="fas fa-calendar-alt btn-icon"></i>Schedule';
    scheduleButton.classList.add('schedule-button');
    scheduleButton.addEventListener('click', function(event) {
      event.stopPropagation();
      getSchedule();
    });

    cell5.appendChild(scheduleButton); */

    // Reset form
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventLocation').value = '';
  });

  // Handle click events on table rows
  document.getElementById('eventTableBody').addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'TD') {
      const row = target.parentNode;
      if (!row.classList.contains('edit-mode')) {
        // Redirect to event details page
        // Replace this line with the desired behavior
        const editableFields = row.querySelectorAll('.editable-field');
        console.log(editableFields)
        const EventID = editableFields[3].textContent.toString();
        const eventname = editableFields[0].textContent;
        window.location.href = `admin.html?eventname=${eventname}&EventID=${EventID}`;
        // window.location.href = `admin.html?EventID=${EventID}`;
      }
    }
  });


function getSchedule() {
    window.location.href = "schedule.html";

  }