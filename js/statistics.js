var arr = data.results[0]["members"];

// building glance table from an object
function dataobject() {

	var tbBody = document.createElement("tbody");


	// creating all cells
	for (var i = 0; i < Object.keys(statistics).length; i++) {

		// creates a table row
		var row = document.createElement("tr");
		row.style.backgroundColor = ""
		for (var j = 0; j < Object.entries(statistics)[0].length + 1; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table row
			var cell = document.createElement("td");

			if (j == 0) {
				var cellText = document.createTextNode(Object.keys(statistics)[i]);
			}


			if (j == 1) {
				var cellText = document.createTextNode(statistics[Object.keys(statistics)[i]][j - 1]);
			}


			if (j == 2) {

				var cellText = document.createTextNode(statistics[Object.keys(statistics)[i]][j - 1]);
			}
			cell.appendChild(cellText);


			row.appendChild(cell);
		}


		tbBody.appendChild(row);
	}
	// add the row to the end of the table body


	return tbBody;
}
document.getElementById("glance").appendChild(dataobject());









//finding fullname
function name(arr) {

	var names = [];
	for (i = 0; i < arr.length; i++) {
		var fullname = arr[i]["first_name"];

		if (arr[i]["middle_name"] != null) {

			fullname = fullname + " " + arr[i]["middle_name"];


		} else {
			fullname = arr[i]["first_name"];
		};

		fullname = fullname + " " + arr[i]["last_name"];
		names.push(fullname);

	}

	return names
}
//sorting our object
var sortedobj = arr.sort(function (a, b) {
	return parseFloat(b.missed_votes_pct) - parseFloat(a.missed_votes_pct);
});






function least(sorted){
var j = 0;
var leastengaged = [];
for (i=0; i<10;i++) {
		leastengaged[j] = sorted[i];
		j++;
	}
	return leastengaged;
}


//building the bottom table
function dataleast(arr1, str1, str2, str3) {

	var tbBody = document.createElement("tbody");


	// creating all cells
	for (var i = 0; i < name(arr1).length; i++) {

		// creates a table row
		var row = document.createElement("tr");
		row.style.backgroundColor = ""
		for (var j = 0; j < 3; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table row
			var cell = document.createElement("td");

			if (j == 0) {
				if (arr1[i][str3] == "") {
					var cellText = document.createTextNode((name(arr1)[i]));
					cell.appendChild(cellText);

				} else {
					// adding a link to fullname
					var link = document.createElement("a");

					link.setAttribute("href", arr1[i][str3]);
					link.style.color = "#4a84c3";

					var linkText = document.createTextNode(name(arr1)[i]);
					link.appendChild(linkText);

					// Add the link to the previously created TableCell.
					cell.appendChild(link);
				}

			}


			if (j == 1) {
				var cellText = document.createTextNode(arr1[i][str1]);
				cell.appendChild(cellText);
			}


			if (j == 2) {

				var cellText = document.createTextNode(arr1[i][str2]);
				cell.appendChild(cellText);
			}


			row.appendChild(cell);
		}


		tbBody.appendChild(row);
	}
	// add the row to the end of the table body


	return tbBody;
}

document.getElementById("bottom-attendance").appendChild(dataleast(least(sortedobj), "missed_votes", "missed_votes_pct", "url"));




//sorting our object
var sortedobjrev = arr.sort(function (a, b) {
	return parseFloat(a.missed_votes_pct) - parseFloat(b.missed_votes_pct);
});



	
document.getElementById("most-attendance").appendChild(dataleast(least(sortedobjrev), "missed_votes", "missed_votes_pct", "url"));




