//Script file for OOP5.html and using the JSON file mountains.json
//I hardcoded the json file, maybe not the best idea

  fetch('mountains.json')
    .then(response => response.json())
    .then(data => {
      data.fjelltopper.sort((a, b) => b.elevation - a.elevation) //Sort in descending order
      //I took this smart method from https://www.w3schools.com/js/js_array_sort.asp 
      const mountainsTable = document.getElementById('mountainsTable');
      const tbody = mountainsTable.querySelector('tbody');
      data.fjelltopper.forEach(mountain => { //Syntax learned in DCST1005 for powershell
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

