function datafill() { 
	var tbBody = document.createElement("tbody");
	var arr = data.results[0]["members"];


	// creating all cells
	for (var i = 0; i < arr.length; i++) {

		// creates a table row
		var row = document.createElement("tr");
		row.style.backgroundColor = ""
		var mem = arr[i];
		for (var j = 0; j < 5; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table row
			var cell = document.createElement("td");

			if (j == 0) {
				var fullname = mem["first_name"];

				if (mem["middle_name"] != null) {

					fullname = fullname + " " + mem["middle_name"];


				} else {
					fullname = mem["first_name"];
				};

				fullname = fullname + " " + mem["last_name"];
				if (mem["url"] == "") {
					var cellText = document.createTextNode(fullname);
					cell.appendChild(cellText);
				} else {
					// adding a link to fullname
					var link = document.createElement("a");

					link.setAttribute("href", mem["url"]);
					link.style.color = "#4a84c3";

					var linkText = document.createTextNode(fullname);
					link.appendChild(linkText);

					// Add the link to the previously created TableCell.
					cell.appendChild(link);
				}


				row.appendChild(cell);
			}

			if (j == 1) {

				var cellText = document.createTextNode(mem["party"]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			if (j == 2) {
				var cellText = document.createTextNode(mem["state"]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			if (j == 3) {
				var cellText = document.createTextNode(mem["seniority"]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			if (j == 4) {
				var cellText = document.createTextNode(mem["votes_with_party_pct"]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}


		}
		// add the row to the end of the table body
		tbBody.appendChild(row);


	}
	
	return tbBody;
}
//datafill()
document.getElementById("page-data").appendChild(datafill());
//to solve the problem of undefind message
document.getElementById("page-data").childNodes[0].nodeValue = null;