let arr = data.results[0]["members"];
let allstate = [];
let selectList = document.getElementById("state-selection");

//a function to build options for dropdown list

function buildoptions() {
	//define allstate list
	for (let i = 0; i < arr.length; i++) {
		allstate[i] = arr[i]["state"];

	}

	let unique = [...new Set(allstate)];
	let sortedunique = unique.sort();
	let option = document.createElement("option");
	//adding ALL
	option.value = "ALL";

	option.text = "ALL";

	selectList.appendChild(option);

	//adding the sorted unique list

	for (let i = 0; i < sortedunique.length; i++) {
		let option = document.createElement("option");
		option.value = sortedunique[i];
		option.id = sortedunique[i];

		option.text = sortedunique[i];

		selectList.appendChild(option);


	}

}


let tbBody = document.createElement("tbody");


buildoptions();


//function to fill data in house and senate data pages

function datafill(arr) {

	let tbBody = document.createElement("tbody");


	// creating all cells
	for (let i = 0; i < arr.length; i++) {

		// creates a table row
		let row = document.createElement("tr");
		row.style.backgroundColor = ""
		let mem = arr[i];
		for (let j = 0; j < 5; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table row
			let cell = document.createElement("td");

			if (j == 0) {
				let fullname = mem["first_name"];

				if (mem["middle_name"] != null) {

					fullname = fullname + " " + mem["middle_name"];


				} else {
					fullname = mem["first_name"];
				};

				fullname = fullname + " " + mem["last_name"];
				if (mem["url"] == "") {
					let cellText = document.createTextNode(fullname);
					cell.appendChild(cellText);
				} else {
					// adding a link to fullname
					let link = document.createElement("a");

					link.setAttribute("href", mem["url"]);
					link.style.color = "#4a84c3";

					let linkText = document.createTextNode(fullname);
					link.appendChild(linkText);

					// Add the link to the previously created TableCell.
					cell.appendChild(link);
				}


				row.appendChild(cell);
			}

			if (j == 1) {

				let cellText = document.createTextNode(mem["party"]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			if (j == 2) {
				let cellText = document.createTextNode(mem["state"]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			if (j == 3) {
				let cellText = document.createTextNode(mem["seniority"]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			if (j == 4) {
				let cellText = document.createTextNode(mem["votes_with_party_pct"]);
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
document.getElementById("page-data").appendChild(datafill(arr));
//to solve the problem of undefind message
document.getElementById("page-data").childNodes[0].nodeValue = null;


//to drop the table
function droptable() {

	let element = document.getElementById("page-data");
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

// variable to check if the state filter is used
let statefiltered = "";


//filter by checkboxes 


let checkboxR = document.querySelector("input[id=parR]");
let checkboxD = document.querySelector("input[id=parD]");
let checkboxI = document.querySelector("input[id=parI]");

let filterarray = [0, 0, 0];

checkboxR.addEventListener('change', function () {
	if (this.checked) {
		// Checkbox is checked..
		filterarray[0] = 1;

	} else {
		// Checkbox is not checked..
		filterarray[0] = 0;

	}
	if ((statefiltered == "") || (statefiltered == "ALL")) {
		partyfilter(filterarray);
	} else {
		doublefilter(filterarray, statefiltered)
	}
});
checkboxD.addEventListener('change', function () {
	if (this.checked) {
		// Checkbox is checked..
		filterarray[1] = 1;

	} else {
		// Checkbox is not checked..
		filterarray[1] = 0;


	}
	if ((statefiltered == "") || (statefiltered == "ALL")) {

		partyfilter(filterarray);
	} else {
		doublefilter(filterarray, statefiltered);
	}
});
checkboxI.addEventListener('change', function () {
	if (this.checked) {
		// Checkbox is checked..
		filterarray[2] = 1;

	} else {
		// Checkbox is not checked..
		filterarray[2] = 0;
	}
	if ((statefiltered == "") || (statefiltered == "ALL")) {
		partyfilter(filterarray);
	} else {
		doublefilter(filterarray, statefiltered);
	}
});
// for loop for array
function forloop(arr, str1, str2) {
	let newarr = [];
	arr.forEach(element => {
		if ((element["party"] == str1) || (element["party"] == str2)) {
			newarr.push(element)
		}


	});
	return newarr
}
// for loop for array with state condition
function forloopWithState(arr, str1, str2, str3) {
	let newarr = [];
	arr.forEach(element => {
		if (((element["party"] == str1) || (element["party"] == str2)) && (element["state"] == str3)) {
			newarr.push(element)
		}


	});
	return newarr
}

// filter by party only function
function partyfilter(filterarray) {


	if ((filterarray[0] == filterarray[1]) && (filterarray[1] == filterarray[2])) {
		droptable();


		document.getElementById("page-data").appendChild(datafill(arr));
	}
	if ((filterarray[0] == 1) && (filterarray[1] == 0) && (filterarray[2] == 0)) {

		droptable();
		newarr = [];

		newarr = forloop(arr, "R", "");


		document.getElementById("page-data").appendChild(datafill(newarr));
	}
	if ((filterarray[0] == 1) && (filterarray[1] == 1) && (filterarray[2] == 0)) {

		droptable();
		newarr = [];
		newarr = forloop(arr, "R", "D");

		document.getElementById("page-data").appendChild(datafill(newarr));
	}
	if ((filterarray[0] == 1) && (filterarray[1] == 0) && (filterarray[2] == 1)) {

		droptable();
		newarr = [];
		newarr = forloop(arr, "R", "I");
		document.getElementById("page-data").appendChild(datafill(newarr));
	}
	if ((filterarray[0] == 0) && (filterarray[1] == 1) && (filterarray[2] == 0)) {

		droptable();
		newarr = [];
		newarr = forloop(arr, "D", "");
		document.getElementById("page-data").appendChild(datafill(newarr));
	}

	if ((filterarray[0] == 0) && (filterarray[1] == 1) && (filterarray[2] == 1)) {

		droptable();
		newarr = [];
		newarr = forloop(arr, "D", "I");
		document.getElementById("page-data").appendChild(datafill(newarr));
	}
	if ((filterarray[0] == 0) && (filterarray[1] == 0) && (filterarray[2] == 1)) {

		droptable();
		newarr = [];
		newarr = forloop(arr, "I", "");
		document.getElementById("page-data").appendChild(datafill(newarr));
	}
}


//filter by state only


let dropdownstate = document.getElementById("state-selection");
let x = document.getElementById("state-selection").value;
dropdownstate.addEventListener('change', function () {
	let x = document.getElementById("state-selection").value;


	if ((filterarray[0] == filterarray[1]) && (filterarray[1] == filterarray[2])) {
		statefilter(x);
	} else {
		statefiltered = x;
		doublefilter(filterarray, statefiltered)
	}
});
// filter by state only function
function statefilter(x) {

	droptable();
	if (x == "ALL") {
		statefiltered = x;
		document.getElementById("page-data").appendChild(datafill(arr));
	} else {
		let statearr = [];
		let j = 0;
		statefiltered = x;
		for (i = 0; i < arr.length; i++) {
			if (arr[i]["state"] == x) {
				statearr[j] = arr[i];
				j++;
			}
		}
		document.getElementById("page-data").appendChild(datafill(statearr));
	}
}
// both filters togather
function doublefilter(filterarray, x) {
	droptable();

	let finalarr = [];
	let j = 0;
	if (x == "ALL") {
		partyfilter(filterarray);
	} else {
		if ((filterarray[0] == filterarray[1]) && (filterarray[1] == filterarray[2])) {
			statefilter(x);
		}
		if ((filterarray[0] == 1) && (filterarray[1] == 0) && (filterarray[2] == 0)) {


			finalarr = forloopWithState(arr, "R", "", x);
			document.getElementById("page-data").appendChild(datafill(finalarr));

		}
		if ((filterarray[0] == 1) && (filterarray[1] == 1) && (filterarray[2] == 0)) {
			finalarr = forloopWithState(arr, "R", "D", x);
			document.getElementById("page-data").appendChild(datafill(finalarr));

		}
		if ((filterarray[0] == 1) && (filterarray[1] == 0) && (filterarray[2] == 1)) {

			finalarr = forloopWithState(arr, "R", "I", x);
			document.getElementById("page-data").appendChild(datafill(finalarr));

		}
		if ((filterarray[0] == 0) && (filterarray[1] == 1) && (filterarray[2] == 0)) {

			finalarr = forloopWithState(arr, "", "D", x);
			document.getElementById("page-data").appendChild(datafill(finalarr));

		}

		if ((filterarray[0] == 0) && (filterarray[1] == 1) && (filterarray[2] == 1)) {
			finalarr = forloopWithState(arr, "D", "I", x);
			document.getElementById("page-data").appendChild(datafill(finalarr));
		}
		if ((filterarray[0] == 0) && (filterarray[1] == 0) && (filterarray[2] == 1)) {
			finalarr = forloopWithState(arr, "I", "", x);

			document.getElementById("page-data").appendChild(datafill(finalarr));
		}

	}
}