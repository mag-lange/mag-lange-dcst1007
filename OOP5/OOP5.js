//Script file for OOP5.html and using the JSON file mountains.json

//I hardcoded the json file, maybe not the best idea
  fetch('mountains.json')
    .then(response => response.json())
    .then(data => {
      const mountainsTable = document.getElementById('mountainsTable');
      const tbody = mountainsTable.querySelector('tbody');

      // Iterate over the mountains data and create table rows
      data.fjelltopper.forEach(mountain => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${mountain.fylke}</td>
          <td>${mountain.name}</td>
          <td>${mountain.elevation}</td>
        `; //Using the new method used in the previous lecture with `. 
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });

