var arr = data.results[0]["members"];
var allstate = [];
var selectList = document.getElementById("state-selection");

//a function to build options for dropdown list

function buildoptions() {
	//define allstate list
	for (var i = 0; i < arr.length; i++) {
		allstate[i] = arr[i]["state"];

	}

	let unique = [...new Set(allstate)];
	var sortedunique = unique.sort();
	var option = document.createElement("option");
	//adding ALL
	option.value = "ALL";

	option.text = "ALL";

	selectList.appendChild(option);

	//adding the sorted unique list

	for (var i = 0; i < sortedunique.length; i++) {
		var option = document.createElement("option");
		option.value = sortedunique[i];
		option.id = sortedunique[i];

		option.text = sortedunique[i];

		selectList.appendChild(option);


	}

}


var tbBody = document.createElement("tbody");


buildoptions();


//function to fill data in house and senate data pages

function datafill(arr) {

	var tbBody = document.createElement("tbody");


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

//filter to checkbox


var checkboxR = document.querySelector("input[id=parR]");
var checkboxD = document.querySelector("input[id=parD]");
var checkboxI = document.querySelector("input[id=parI]");

var filterarray = [0, 0, 0];

checkboxR.addEventListener('change', function () {
	if (this.checked) {
	   // Checkbox is checked..
	   filterarray[0]=1;
	} else {
	   // Checkbox is not checked..
	  filterarray[0]=0;
	}
	partyfilter(filterarray);
});
checkboxD.addEventListener('change', function () {
	if (this.checked) {
		// Checkbox is checked..
		filterarray[1]=1;
	 } else {
		 // Checkbox is not checked..
	   filterarray[1]=0;
	 }
	
	 partyfilter(filterarray);
});
checkboxI.addEventListener('change', function () {
	if (this.checked) {
		// Checkbox is checked..
		filterarray[2]=1;
	 } else {
		// Checkbox is not checked..
	   filterarray[2]=0;
	 }	 

	partyfilter(filterarray);
});

function partyfilter(filterarray) {
	
	
	if ((filterarray[0]==filterarray[1])&&(filterarray[1]==filterarray[2])){
		droptable();
    
		document.getElementById("page-data").appendChild(datafill(arr));
	} 
	 if((filterarray[0]==1)&&(filterarray[1]==0)&&(filterarray[2]==0)){
	     
		droptable();
		newarr = [];
    	j = 0;
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["R"]) {
					newarr[j] = arr[i];
					j++;
				}
			}
			document.getElementById("page-data").appendChild(datafill(newarr));
	} 
	 if ((filterarray[0]==1)&&(filterarray[1]==1)&&(filterarray[2]==0)) {
		
			droptable();
			newarr = [];
			 j = 0;  
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["R"]) {
					newarr[j] = arr[i];
					j++;
				}
			} 
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["D"]) {
					newarr[j] = arr[i];
					j++;
				}
			}
			document.getElementById("page-data").appendChild(datafill(newarr));
	}
	if ((filterarray[0]==1)&&(filterarray[1]==0)&&(filterarray[2]==1)){

		droptable();
			newarr = [];
			 j = 0;  
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["R"]) {
					newarr[j] = arr[i];
					j++;
				}
			} 
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["I"]) {
					newarr[j] = arr[i];
					j++;
				}
			}
			document.getElementById("page-data").appendChild(datafill(newarr));
	}
	if ((filterarray[0]==0)&&(filterarray[1]==1)&&(filterarray[2]==0)){

		droptable();
			newarr = [];
			 j = 0;  
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["D"]) {
					newarr[j] = arr[i];
					j++;
				}
			} 
			
			document.getElementById("page-data").appendChild(datafill(newarr));
	}

	if ((filterarray[0]==0)&&(filterarray[1]==1)&&(filterarray[2]==1)){

		droptable();
			newarr = [];
			 j = 0;  
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["D"]) {
					newarr[j] = arr[i];
					j++;
				}
			} 
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["I"]) {
					newarr[j] = arr[i];
					j++;
				}
			}
			document.getElementById("page-data").appendChild(datafill(newarr));
	}
	if ((filterarray[0]==0)&&(filterarray[1]==0)&&(filterarray[2]==1)){

		droptable();
			newarr = [];
			 j = 0;  
			for (i = 0; i < arr.length; i++) {
				if (arr[i]["party"] == ["I"]) {
					newarr[j] = arr[i];
					j++;
				}
			} 
			
			document.getElementById("page-data").appendChild(datafill(newarr));
		}
}


//filter by state


var dropdownstate = document.getElementById("state-selection");
var x = document.getElementById("state-selection").value;
dropdownstate.addEventListener('change', function(){
	var x = document.getElementById("state-selection").value;
	statefilter(x);
});

function	statefilter(x){
	droptable();
   
   console.log(x);
   if (x =="ALL"){
	document.getElementById("page-data").appendChild(datafill(arr));
   }else{
			var statearr =[];
			var j=0;

			for (i=0;i<arr.length;i++){
				if (arr[i]["state"]==x){
						statearr[j]=arr[i];
						j++;
				}
			}
			document.getElementById("page-data").appendChild(datafill(statearr));
		}
}
