document.addEventListener('DOMContentLoaded', async function () {

    const urlParams = new URLSearchParams(window.location.search);
    var EventID = urlParams.get('EventID');
    var EventName = urlParams.get('eventname');
    
    if(EventID){
        var result = await fetch('/getAnnouncements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EventID : EventID
            })
        })
        .then((res) => res.json());
        console.log(result);
        if(result.success){
       
        result.success.forEach((data, index) => {
            const tableBody = document.getElementById("announcementTable");
            const newRow = tableBody.insertRow();
            var row = tableBody.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var cell4 = row.insertCell()
            var cell5 = row.insertCell()
         // Create a clickable row
         newRow.style.cursor = 'pointer';
         cell1.innerHTML = `<span class="editable-field" readonly>${data.Title}</span>`;
         cell2.innerHTML = `<span class="editable-field" readonly>${data.Content}</span>`;
         cell5.innerHTML = `<span class="editable-field" hidden readonly>${data.AnnouncementID}</span>`;
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
         //    console.log(editableFields[0].innerHTML,editableFields[0].innerHTML,editableFields[2].innerHTML)
             for (let i = 1; i < editableFields.length; i++) {
               editableFields[i].contentEditable = 'false';
               editableFields[i].classList.remove('edit-mode');
             }
             const editResult = await fetch('/editAnnouncement', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                 AnnouncementID : editableFields[2].innerHTML,
                 Title : editableFields[0].innerHTML,
                 Content : editableFields[1].innerHTML
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
             
             for (let i = 0; i < editableFields.length ; i++)
             {
               editableFields[i].contentEditable = 'true';
               editableFields[i].classList.add('edit-mode');
             }
           }
         });
     
         cell3.appendChild(editButton);

         // Create "Delete" button
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Delete';
         deleteButton.classList.add('delete-button');
         deleteButton.addEventListener('click', async function(event) {
           event.stopPropagation();
           const row = this.parentNode.parentNode;
           const cells = row.getElementsByTagName('td');
           const editableFields = row.getElementsByClassName('editable-field');
           const deleteResult = await fetch('/deleteAnnouncement', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                AnnouncementID : editableFields[2].innerHTML
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
         cell4.appendChild(deleteButton);
        });

    } else{
        result.error ? alert(result.error) : alert(result.errorMessage);
    }

    var result2 = await fetch('/getImagesLink', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            EventID : EventID
        })
    })
    .then((res) => res.json());
    console.log(result2);

    if(result2.success){
       
        result2.success.forEach((data, index) => {
            const tableBody = document.getElementById("imagesTable");
            const newRow = tableBody.insertRow();
            var row = tableBody.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var cell4 = row.insertCell();
         // Create a clickable row
         newRow.style.cursor = 'pointer';
         cell1.innerHTML = `<span class="editable-field" readonly>${data.Link}</span>`;
         cell4.innerHTML = `<span class="editable-field" hidden readonly>${data.PhotoID}</span>`;
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
         //    console.log(editableFields[0].innerHTML,editableFields[0].innerHTML,editableFields[2].innerHTML)
             for (let i = 1; i < editableFields.length; i++) {
               editableFields[i].contentEditable = 'false';
               editableFields[i].classList.remove('edit-mode');
             }
             const editResult = await fetch('/editImagesLink', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                 PhotoID : editableFields[1].innerHTML,
                 Link: editableFields[0].innerHTML
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
             
             for (let i = 0; i < editableFields.length ; i++)
             {
               editableFields[i].contentEditable = 'true';
               editableFields[i].classList.add('edit-mode');
             }
           }
         });
     
         cell2.appendChild(editButton);

        // Create "Delete" button
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Delete';
         deleteButton.classList.add('delete-button');
         deleteButton.addEventListener('click', async function(event) {
           event.stopPropagation();
           const row = this.parentNode.parentNode;
           const cells = row.getElementsByTagName('td');
           const editableFields = row.getElementsByClassName('editable-field');
           const deleteResult = await fetch('/deleteImagesLink', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                PhotoID : editableFields[1].innerHTML
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
         cell3.appendChild(deleteButton); 
        });

    } else{
        result2.error ? alert(result2.error) : alert(result2.errorMessage);
    }

    }

    
});