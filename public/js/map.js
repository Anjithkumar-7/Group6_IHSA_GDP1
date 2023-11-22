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
    { name: 'Earlham College', region: 1, lat: 39.8244, lon: -85.0089, isAnchorSchool: 'Yes' },
    { name: 'Indiana University', region: 1, lat: 39.1765, lon: -86.5125, isAnchorSchool: 'No' },
    { name: 'Lake Land College', region: 1, lat: 39.4762, lon: -88.3665, isAnchorSchool: 'Yes' },
    { name: 'Purdue University', region: 1, lat: 40.4240, lon: -86.9626, isAnchorSchool: 'Yes' },
    { name: 'St Mary of the Woods', region: 1, lat: 39.5111, lon: -87.4086, isAnchorSchool: 'Yes' },
    { name: 'Taylor University', region: 1, lat: 40.2586, lon: -85.6599, isAnchorSchool: 'No' },
    { name: 'University of Illinois at Urbana-Champaign', region: 1, lat: 40.1010, lon: -88.2272, isAnchorSchool: 'Yes' },
    { name: 'University of Notre Dame', region: 1, lat: 41.7031, lon: -86.2396, isAnchorSchool: 'No' },
    { name: 'DePauw University', region: 1, lat: 39.6382, lon: -86.8642, isAnchorSchool: 'No' },
    { name: 'Eastern Illinois University', region: 1, lat: 39.4817, lon: -88.1763, isAnchorSchool: 'No' },
    { name: 'Indiana University at South Bend', region: 1, lat: 41.6699, lon: -86.2542, isAnchorSchool: 'No' },
    { name: 'Indiana University East', region: 1, lat: 39.8206, lon: -84.8890, isAnchorSchool: 'No' },
    { name: 'Indiana University Purdue University Fort Wayne', region: 1, lat: 41.1157, lon: -85.1227, isAnchorSchool: 'No' },
    { name: 'Indiana University Purdue University Indianapolis', region: 1, lat: 39.7739, lon: -86.1830, isAnchorSchool: 'No' },
    { name: 'IUPUI', region: 1, lat: 39.7739, lon: -86.1830, isAnchorSchool: 'No' },
    { name: 'Manchester University', region: 1, lat: 41.0009, lon: -85.7597, isAnchorSchool: 'No' },
    { name: 'Saint Mary’s College', region: 1, lat: 41.7188, lon: -86.2424, isAnchorSchool: 'No' },
    { name: 'University of Saint Francis', region: 1, lat: 41.0937, lon: -85.1394, isAnchorSchool: 'No' },
    

    // Region 2
    { name: 'North Central Texas College', region: 2, lat: 33.2140, lon: -97.1344, isAnchorSchool:'Yes' },
    { name: 'Oklahoma Panhandle State University', region: 2, lat: 36.4376, lon: -101.4452, isAnchorSchool:'No' },
    { name: 'Southern Nazarene University', region: 2, lat: 35.6127, lon: -97.5444, isAnchorSchool: 'No' },
    { name: 'West Texas A&M University', region: 2, lat: 35.2030, lon: -101.8767, isAnchorSchool: 'Yes' },
    { name: 'Baylor University', region: 2, lat: 31.5469, lon: -97.1219, isAnchorSchool: 'No' },
    { name: 'Mesalands Community College', region: 2, lat: 35.2505, lon: -103.2503, isAnchorSchool: 'No' },
    { name: 'New Mexico State University', region: 2, lat: 32.2782, lon: -106.7475, isAnchorSchool: 'No' },
    { name: 'Redlands Community College', region: 2, lat: 35.5259, lon: -98.7286, isAnchorSchool: 'No' },
    { name: 'Southern Methodist University', region: 2, lat: 32.8412, lon: -96.7845, isAnchorSchool: 'No' },
    { name: 'Southwestern University', region: 2, lat: 30.6244, lon: -97.6789, isAnchorSchool: 'No' },
    { name: 'Stephen F. Austin State University', region: 2, lat: 31.6117, lon: -94.6500, isAnchorSchool: 'No' },
    { name: 'Tarleton State University', region: 2, lat: 32.2217, lon: -98.2155, isAnchorSchool: 'No' },
    { name: 'Texas A&M University-Commerce', region: 2, lat: 33.2393, lon: -95.9030, isAnchorSchool: 'No' },
    { name: 'Texas Tech University', region: 2, lat: 33.5849, lon: -101.8787, isAnchorSchool: 'No' },
    { name: 'The University of Oklahoma', region: 2, lat: 35.2058, lon: -97.4453, isAnchorSchool: 'No' },
    { name: 'University of North Texas', region: 2, lat: 33.2110, lon: -97.1525, isAnchorSchool: 'No' },
    
    // Region 3
    { name: 'Gustavus Adolphus College', region: 3, lat: 44.3213, lon: -93.9760,isAnchorSchool:'No' },
    { name: 'North Dakota State University', region: 3, lat: 46.8742, lon: -96.7898, isAnchorSchool:'Yes' },
    { name: 'University of Minnesota, Crookston', region: 3, lat: 47.7949, lon: -96.6063, isAnchorSchool: 'Yes' },
    { name: 'University of Wisconsin-River Falls', region: 3, lat: 44.8486, lon: -92.6232, isAnchorSchool: 'Yes' },
    { name: 'Bethany Lutheran College', region: 3, lat: 44.1696, lon: -94.0177, isAnchorSchool: 'No' },
    { name: 'Carleton College', region: 3, lat: 44.4614, lon: -93.1538, isAnchorSchool: 'No' },
    { name: 'Lakehead University', region: 3, lat: 48.4254, lon: -89.2577, isAnchorSchool: 'No' },
    { name: 'Montana State University', region: 3, lat: 45.6666, lon: -110.7987, isAnchorSchool: 'No' },
    { name: 'Rochester Community and Technical College', region: 3, lat: 44.0216, lon: -92.4630, isAnchorSchool: 'No' },
    { name: 'South Dakota State University', region: 3, lat: 44.3243, lon: -96.7843, isAnchorSchool: 'No' },
    { name: 'St Cloud State University', region: 3, lat: 45.5569, lon: -94.1995, isAnchorSchool: 'No' },

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