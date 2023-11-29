document.addEventListener("DOMContentLoaded", async function () {

  const urlParams = new URLSearchParams(window.location.search);
  var EventID = urlParams.get('EventID');
  var EventName = urlParams.get('eventname');
  if (EventID && EventName) {

    const result = await fetch('/getClassCategorization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        EventID: EventID
      })
    })
      .then((res) => res.json());
    console.log(result);
    if (result.success) {

      let classesList
      result.Classes.forEach(data => {
        classesList += `<option value="${data.classname}">${data.classname}</option>`
      })
      const table = document.createElement('table');
      table.className = 'table'; // Add any desired classes

      // Create the table head (thead) and header row (tr)
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      
      // Create the header cells (th) for the table
      const headerCell1 = document.createElement('th');
      const headerCell2 = document.createElement('th');
      const headerCell3 = document.createElement('th');
      const headerCell4 = document.createElement('th');
      const headerCell5 = document.createElement('th');
      const headerCell6 = document.createElement('th');
      const headerCell7 = document.createElement('th');
      const headerCell8 = document.createElement('th');

      // Set the header cell content
      headerCell8.textContent = 'Rider ID';
      headerCell1.textContent = 'Rider Name';
      headerCell2.textContent = 'HeightConstraint';
      headerCell3.textContent = 'WeightConstraint';
      headerCell4.textContent = 'Experience';
      headerCell5.textContent = 'Class';
      headerCell6.textContent = 'Remarks';
      headerCell7.textContent = 'Action';
      // Append header cells to the header row
      headerRow.appendChild(headerCell8);
      headerRow.appendChild(headerCell1);
      headerRow.appendChild(headerCell2);
      headerRow.appendChild(headerCell3);
      headerRow.appendChild(headerCell4);
      headerRow.appendChild(headerCell5);
      headerRow.appendChild(headerCell6);
      headerRow.appendChild(headerCell7);

      // Append the header row to the table head
      thead.appendChild(headerRow);
      const tbody = document.createElement('tbody');

      result.uniqueRiders.forEach((data, index) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');
        const cell4 = document.createElement('td');
        const cell5 = document.createElement('td');
        const cell6 = document.createElement('td');
        const cell7 = document.createElement('td');
        const cell8 = document.createElement('td');
        const cell9 = document.createElement('td');
        const cell10 = document.createElement('td');
        const button = document.createElement('button');

        cell8.innerHTML = `<input type="text" data-original-id="${data.RiderId}" value="${data.RiderId}" class="id-editor">`
        cell1.innerHTML = `<input type="text" value="${data.Name}" class="name-editor">`;
        cell2.innerHTML = `<input type="text" value="${data.Height ? data.Height : 0}" class="id-editor">`;
        cell3.innerHTML = `<input type="text" value="${data.Weight ? data.Weight : 0}" class="id-editor">`;
        cell4.innerHTML = `<input type="text" value="${data.Experience ? data.Experience : 0}" class="remarks-editor">`;

        var options = "";
        data.Classes.map((op, i) => {
          options += `<option value="${op}" id="${i}" ${result.Classes.includes(op) ? 'selected' : ''} style="border-radius: 5px;"">${op}</option>`
        })
        options += classesList

        cell5.innerHTML = `<select class="editor" multiple id="mySelect${index}" onclick="allowPageScroll()" data-original-class="${data.Classes}">
          ${result.Classes.map((classItem, i) => `
            <option value="${classItem.classname}" id="${i}" ${data.Classes.includes(classItem.classname) ? 'selected' : ''}>
              ${classItem.classname}
            </option>
          `)}
        </select>`



        // data.Classes.forEach((classItem) => {
        //   const tagElement = document.createElement('div');
        //   tagElement.className = 'tag';
        //   tagElement.textContent = classItem;
        //   tagElement.onclick = function () {
        //     // Handle tag removal here if needed
        //     // Example: row.classes.splice(row.classes.indexOf(classItem), 1);
        //     tagElement.remove(); // Remove tag element from UI
        //   };
        //   cell5.appendChild(tagElement);
        // });
        //


        cell6.innerHTML = `<input type="text" value="${data.Remarks}" class="remarks-editor">`;
        cell9.innerHTML = `<input type="hidden" value="${data.School}" class="hidden-editor" >`;
        cell10.innerHTML = `<input type="hidden" value="${data.file_name}" class="hidden-editor" >`;

        button.textContent = "Save";
        button.className = "button";
        button.addEventListener('click', async function () {
          // Get the row containing the clicked button
          const currentRow = this.closest('tr');

          let selectedClasses = [];
          // Extract data from the row's cells
          const riderId = currentRow.querySelector('td:nth-child(1) input').value;
          const riderName = currentRow.querySelector('td:nth-child(2) input').value;
          const height = currentRow.querySelector('td:nth-child(3) input').value==0?null:currentRow.querySelector('td:nth-child(3) input').value;
          const weight = currentRow.querySelector('td:nth-child(4) input').value == 0?null:currentRow.querySelector('td:nth-child(4) input').value;
          const experience = currentRow.querySelector('td:nth-child(5) input').value == 0 ? null:currentRow.querySelector('td:nth-child(5) input').value;

          // Get the edited class value and the original class value
          const editedClass = currentRow.querySelector('td:nth-child(6) select').value;
          //test
          const testClass = currentRow.querySelector('td:nth-child(6) select');
          const selectedOptions = testClass.selectedOptions;

          // Loop through the selected options
          for (let i = 0; i < selectedOptions.length; i++) {
            const selectedOption = selectedOptions[i];
            const selectedValue = selectedOption.value;
            // Do something with each selected value, for instance, log it
            console.log('Selected Value:', selectedValue);
            selectedClasses.push(selectedValue);
          }
          //test ends
          var originalClass = currentRow.querySelector('td:nth-child(6) select').getAttribute('data-original-class');
          originalClass = originalClass.split(',')

          const originalId = currentRow.querySelector('td:nth-child(1) input').getAttribute('data-original-id');
          const remarks = currentRow.querySelector('td:nth-child(7) input').value;
          let school = currentRow.querySelector('td:nth-child(9) input').value;
          let filename = currentRow.querySelector('td:nth-child(10) input').value;
          // alert(school);

          if (selectedClasses.length) {
            const result1 = await fetch('/updateRider', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                EventId: EventID,
                originalId: originalId,
                riderid: riderId,
                name: riderName,
                height: height,
                weight: weight,
                experience: experience,
                classname: editedClass, // Use the edited class value here
                originalClass: originalClass, // Store the original class value
                remarks: remarks,
                school,
                filename,
                selectedClasses
              })
            }).then((res) => res.json());
            console.log(result1);
            if (result1.success) {
              alert(result1.success);
              window.location.reload(true);
            }
          } else {
            alert('Atleast one class should be present, you are trying to delete/unselect all the classes')
          }

        });

        cell7.appendChild(button);
        row.appendChild(cell8)
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell9);
        row.appendChild(cell10);

        tbody.appendChild(row);
      });

      table.appendChild(thead);
      table.appendChild(tbody);

      const container = document.getElementById('riderTable');
      container.appendChild(table);


      /// Horse Table Data Rendering From Here  ---------------
      const htable = document.createElement('table');
      htable.className = 'table'; // Add any desired classes

      // Create the table head (thead) and header row (tr)
      const head = document.createElement('thead');
      const hheaderRow = document.createElement('tr');

      // Create the header cells (th) for the table
      const hheaderCell1 = document.createElement('th');
      const hheaderCell2 = document.createElement('th');
      const hheaderCell3 = document.createElement('th');
      const hheaderCell4 = document.createElement('th');
      const hheaderCell5 = document.createElement('th');
      const hheaderCell6 = document.createElement('th');
      const hheaderCell7 = document.createElement('th');

      // Set the header cell content
      hheaderCell1.textContent = 'Horse Name';
      hheaderCell2.textContent = 'Provider';
      hheaderCell3.textContent = 'HeightConstraint';
      hheaderCell4.textContent = 'WeightConstraint';
      hheaderCell5.textContent = 'Class';
      hheaderCell6.textContent = 'Remarks';
      hheaderCell7.textContent = 'Action';
      // Append header cells to the header row
      hheaderRow.appendChild(hheaderCell1);
      hheaderRow.appendChild(hheaderCell2);
      hheaderRow.appendChild(hheaderCell3);
      hheaderRow.appendChild(hheaderCell4);
      hheaderRow.appendChild(hheaderCell5);
      hheaderRow.appendChild(hheaderCell6);
      hheaderRow.appendChild(hheaderCell7);

      // Append the header row to the table head
      head.appendChild(hheaderRow);
      const ttbody = document.createElement('tbody');
      result.uniqueHorses.forEach((data, index) => {
        const hrow = document.createElement('tr');
        const hcell1 = document.createElement('td');
        const hcell2 = document.createElement('td');
        const hcell3 = document.createElement('td');
        const hcell4 = document.createElement('td');
        const hcell5 = document.createElement('td');
        const hcell6 = document.createElement('td');
        const hcell7 = document.createElement('td');
        const hcell8 = document.createElement('td');
        const hbutton = document.createElement('button');

        hcell1.innerHTML = `<input type="text" data-original-name="${data.Name}" value="${data.Name}" class="name-editor">`;
        hcell2.innerHTML = `<input type="text" value="${data.Provider}" class="id-editor">`;
        hcell3.innerHTML = `<input type="text" value="${data.Spurs}" class="id-editor">`;
        hcell4.innerHTML = `<input type="text" value="${data.Rein_hold}" class="id-editor">`
        // hcell5.innerHTML = `<select class="editor" style="overflow: scroll;" data-original-class="${data.Class}"><option selected hidden value="${data.Class}">${data.Class}</option>${classesList} </select>`;
        hcell5.innerHTML = `<select class="editor" multiple id="mySelect${index}" onclick="allowPageScroll()" data-original-class="${data.Classes}">
          ${result.Classes.map((classItem, i) => `
            <option value="${classItem.classname}" id="${i}" ${data.Classes.includes(classItem.classname) ? 'selected' : ''}>
              ${classItem.classname}
            </option>
          `)}
        </select>`
        hcell6.innerHTML = `<input type="text" value="${data.Remarks}" class="remarks-editor">`;
        hcell8.innerHTML = `<input type="hidden" value="${data.file_name}" class="editor">`;
        hbutton.textContent = "Save";
        hbutton.className = "button";
        // ...
        hbutton.addEventListener('click', async function () {
          // Get the row containing the clicked button
          const currentRow = this.closest('tr');

          let selectedClasses = [];
          // Extract data from the row's cells
          const horseName = currentRow.querySelector('td:nth-child(1) input').value;
          const originalName = currentRow.querySelector('td:nth-child(1) input').getAttribute('data-original-name');
          const provider = currentRow.querySelector('td:nth-child(2) input').value;
          const spur = currentRow.querySelector('td:nth-child(3) input').value;
          const reinHold = currentRow.querySelector('td:nth-child(4) input').value;

          // Get the edited class value and the original class value
          const editedClass = currentRow.querySelector('td:nth-child(5) select').value;
          var originalClass = currentRow.querySelector('td:nth-child(5) select').getAttribute('data-original-class');
          originalClass = originalClass.split(',')

          const selectMenuRow = currentRow.querySelector('td:nth-child(5) select');
          const selectedOptions = selectMenuRow.selectedOptions;

          // Loop through the selected options
          for (let i = 0; i < selectedOptions.length; i++) {
            const selectedOption = selectedOptions[i];
            const selectedValue = selectedOption.value;
            selectedClasses.push(selectedValue);
          }
          //test ends


          const remarks = currentRow.querySelector('td:nth-child(6) input').value;
          const filename = currentRow.querySelector('td:nth-child(8) input').value;


          if (selectedClasses.length) {

            const horseUpdatedData = await fetch('/updateHorse', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                EventId: EventID,
                originalName: originalName,
                name: horseName,
                provider: provider,
                spurs: spur,
                rein_hold: reinHold,
                classname: editedClass, // Use the edited class value here
                originalClass: originalClass, // Store the original class value
                remarks: remarks,
                selectedClasses,
                filename
              })
            })
              .then((res) => res.json());
            console.log(horseUpdatedData);
            if (horseUpdatedData.success) {
              alert(horseUpdatedData.success);
              window.location.reload(true);
            }

          } else {
            alert('Atleast one class should be present, you are trying to delete/unselect all the classes')
          }


          // ...
        });
        hcell7.appendChild(hbutton);
        hrow.appendChild(hcell1);
        hrow.appendChild(hcell2);
        hrow.appendChild(hcell3);
        hrow.appendChild(hcell4);
        hrow.appendChild(hcell5);
        hrow.appendChild(hcell6);
        hrow.appendChild(hcell7);
        hrow.appendChild(hcell8);

        ttbody.appendChild(hrow);
      });

      htable.appendChild(head);
      htable.appendChild(ttbody);

      const ccontainer = document.getElementById('horseTable');
      ccontainer.appendChild(htable);
    }
  }



});

function allowPageScroll() {
  // Enable scrolling on the page when the dropdown is open
  document.body.style.overflow = "auto";
}

function showRiderTable() {
  document.getElementById("riderTable").style.display = "block";
  document.getElementById("horseTable").style.display = "none";
  document.getElementById("class-config").style.display = "none";
  document.querySelector(".tabs button.active").classList.remove("active");
  document.querySelector(".tabs button:nth-child(1)").classList.add("active");
}

function showHorseTable() {
  document.getElementById("riderTable").style.display = "none";
  document.getElementById("horseTable").style.display = "block";
  document.getElementById("class-config").style.display = "none";
  document.querySelector(".tabs button.active").classList.remove("active");
  document.querySelector(".tabs button:nth-child(2)").classList.add("active");
}

function showClassConfig() {
  document.getElementById("riderTable").style.display = "none";
  document.getElementById("horseTable").style.display = "none";
  document.getElementById("class-config").style.display = "block";
  document.querySelector(".tabs button.active").classList.remove("active");
  document.querySelector(".tabs button:nth-child(3)").classList.add("active");
}

// JavaScript for adding and deleting classes
document.addEventListener("DOMContentLoaded", function () {
  const classList = document.getElementById("class-list");
  const classInput = document.getElementById("class-input");
  const addClassButton = document.getElementById("add-class-btn");
  const urlParams = new URLSearchParams(window.location.search);
  var EventID = urlParams.get('EventID');

  async function addClass() {
    const className = classInput.value.trim();
    if (className !== "") {
      const result = await fetch('/addClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EventID: EventID,
          classname: className
        })
      })
        .then((res) => res.json());
      console.log(result);
      if (result.success) {
        console.log("Class added successfully");
        alert("Class added successfully");
        getClasses();
      } else {
        result.errorMessage ? alert(result.errorMessage) : alert(result.error);
      }

      /*
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${className}</td>
        <td><button class="delete-class-button">Delete</button></td>
      `;
      classList.appendChild(newRow);
      classInput.value = "";
      attachDeleteClassListener(newRow); */
    }
  }

  // Function to delete a class from the table
  function deleteClass(row) {
    row.remove();
  }



  // Attach event listener to the Add Class button
  addClassButton.addEventListener("click", addClass);
});


//--------------
async function getClasses() {
  const urlParams = new URLSearchParams(window.location.search);
  var EventID = urlParams.get('EventID');
  const classList = document.getElementById("class-list");
  const classInput = document.getElementById("class-input");
  const result1 = await fetch('/getClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      EventID: EventID
    })
  })
    .then((res) => res.json());
  console.log(result1);
  if (result1.success) {
    let temp = "";
    var newRow = document.createElement("tr");
    result1.list.forEach(data => {
      if (data.isAdded == 1) {
        var newRow = document.createElement("tr");
        temp = `<td>${data.classname}</td>
              <td><button class="delete-class-button">Delete</button></td>
            `;
        newRow.innerHTML = temp;
        classList.appendChild(newRow);
        attachDeleteClassListener(newRow);
      } else {
        var newRow = document.createElement("tr");
        temp = `<td>${data.classname}</td>`;
        newRow.innerHTML = temp;
        classList.appendChild(newRow);
        // attachDeleteClassListener(newRow);
      }
    });

    console.log(newRow)
    // classList.appendChild(newRow);
    classInput.value = "";

  } else {
    console.log(result1);
    result1.errorMessage ? alert(result1.errorMessage) : alert(result1.error);
  }
}



// Attach event listener to the delete buttons
function attachDeleteClassListener(row) {
  const deleteButton = row.querySelector(".delete-class-button");
  deleteButton.addEventListener("click", function () {
    console.log(row)
  });
}
// Show Rider Details by default
showRiderTable();
getClasses();
