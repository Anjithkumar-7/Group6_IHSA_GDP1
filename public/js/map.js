// yourscript.js

// Create a map centered at the United States
var mymap = L.map('map').setView([39.8283, -98.5795], 4);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mymap);

// Define university data with regions
var universities = [
    // Region 1
    { name: 'Ball State University', region: 1, lat: 40.2044, lon: -85.4088, isAnchorSchool:'Yes' },
    { name: 'Butler University', region: 1, lat: 39.8380, lon: -86.1700, isAnchorSchool:'No' },
    // Add more universities for Region 1...

    // Region 2
    { name: 'North Central Texas College', region: 2, lat: 33.2140, lon: -97.1344, isAnchorSchool:'Yes' },
    { name: 'Oklahoma Panhandle State University', region: 2, lat: 36.4376, lon: -101.4452, isAnchorSchool:'No' },
    // Add more universities for Region 2...

    // Region 3
    { name: 'Gustavus Adolphus College', region: 3, lat: 44.3213, lon: -93.9760,isAnchorSchool:'No' },
    { name: 'North Dakota State University', region: 3, lat: 46.8742, lon: -96.7898, isAnchorSchool:'Yes' },
    // Add more universities for Region 3...

    // Region 4
    { name: 'Augustana College', region: 4, lat: 43.5446, lon: -96.7311, isAnchorSchool:'Yes' },
    { name: 'Iowa State University', region: 4, lat: 42.0271, lon: -93.6465, isAnchorSchool:'No' },
    // Add more universities for Region 4...

    // Region 5
    { name: 'Black Hawk College', region: 5, lat: 41.4530, lon: -90.5307, isAnchorSchool:'No' },
    { name: 'Kansas State University', region: 5, lat: 39.1975, lon: -96.5849, isAnchorSchool:'Yes' },
    // Add more universities for Region 5...
];

// Define marker colors for each region
var markerColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

// Add markers to the map
var markers = [];
var originalIconSize = [20, 20]; // Store the original icon size
var selectedMarker = null; 

// Add markers to the map with modified style
for (var i = 0; i < universities.length; i++) {
    var university = universities[i];
    var marker = L.marker([university.lat, university.lon], {
        title: university.name,
        originalColor: markerColors[university.region-1],
        icon: L.divIcon({
            className: 'custom-marker',
            iconSize: originalIconSize, // Adjust the size of the marker
            html: '<div class="circle" style="background-color: ' + markerColors[university.region - 1] + ';"></div>',
        })
    }).addTo(mymap);

    markers.push(marker);

    marker.bindPopup('<b>' + university.name + '</b><br>Region: ' + university.region);
    marker.on('mouseover', function (event) {
        event.target.bindTooltip(event.target.options.title, { sticky: true }).openTooltip();
    });

    // Hide tooltip on mouseout
    marker.on('mouseout', function (event) {
        event.target.closeTooltip();
    });
    
}

function filterUniversities() {
    var regionFilter = document.getElementById('region-filter');
    var selectedRegion = regionFilter.value;

    // Clear the existing table
    var tableBody = document.getElementById('university-table-body');
    tableBody.innerHTML = '';

    // Display universities based on the selected region
    for (var i = 0; i < universities.length; i++) {
        var university = universities[i];

        if (selectedRegion === 'all' || university.region.toString() === selectedRegion) {
            // Add the university to the table
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3)

            cell1.textContent = i + 1;
            var link = document.createElement('a');
            link.href = '#';
            link.textContent = university.name;

            // Add a click event listener to highlight the corresponding marker on the map
            link.addEventListener('click', function (index) {
                return function () {
                    if (!selectedMarker || selectedMarker !== markers[index]) {
                        highlightMarker(index);
                    }
                };
            }(i));

            cell2.appendChild(link);
            cell3.textContent = university.region;
            cell4.textContent = university.isAnchorSchool;
        }
    }
}
function highlightMarker(index) {
    console.log('markerColors array:', markerColors);
    // Reset the icon for the previously selected marker
    if (selectedMarker) {
        selectedMarker.setIcon(L.divIcon({
            className: 'custom-marker',
            iconSize: originalIconSize,
            html: '<div class="circle" style="background-color: '+selectedMarker.options.originalColor+';" ></div>',
        }));
    }

    // Increase the size of the clicked marker
    var marker = markers[index];
    marker.setIcon(L.divIcon({
        className: 'custom-marker',
        iconSize: [originalIconSize[0] * 1.5, originalIconSize[1] * 1.5],
        html: '<div class="circle" style="background-color: #000000 '  + ';"></div>',
    }));
    selectedMarker = marker;

    // Center the map on the selected marker
    mymap.panTo(marker.getLatLng());
}

// Populate the university list table with clickable links
var universityTable = document.querySelector('#university-table-body');

for (var i = 0; i < universities.length; i++) {
    var university = universities[i];

    var row = universityTable.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.textContent = i + 1;

    // Create a clickable link for each university
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = university.name;

    // Add a click event listener to highlight the corresponding marker on the map
    link.addEventListener('click', function (index) {
        return function () {
            if (!selectedMarker || selectedMarker !== markers[index]) {
                highlightMarker(index);
            }
        };
    }(i));

    cell2.appendChild(link);
    cell3.textContent = university.region;
    cell4.textContent = university.isAnchorSchool;
}

