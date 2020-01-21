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


buildoptions();

//finding the fullname
function findfullname(oneMember){
	if (oneMember.middle_name != null){
		 fullname=oneMember.first_name +" "+oneMember.middle_name+" "+oneMember.last_name;
		 
	}else{ fullname=oneMember.first_name +" "+oneMember.last_name}
	return fullname;
}

//linking to the fullname
function urlformember(oneMember){
	let link =document.createElement("a");
	  link.setAttribute("href",oneMember.url );
	  link.style.color = "#4a84c3";
	let linkText = document.createTextNode(findfullname(oneMember));
	link.appendChild(linkText);
	return link;
}

let tbBody = document.createElement("tbody");



//function to fill data in house and senate data pages

function datafill(arr) {
	let tBody = document.getElementById("table-rows");
	tBody.innerHTML = "";
	arr.forEach(function(oneMember) {
	  let tr = document.createElement("tr");
	  let td1 = document.createElement("td");
	 let td2 = document.createElement("td");
	 let td3 = document.createElement("td");
	 let td4 = document.createElement("td");
	 let td5 = document.createElement("td");
	 if (oneMember.url==""){
	  td1.innerHTML = findfullname(oneMember);}
	  else{
       td1.appendChild(urlformember(oneMember))}
	 td2.innerHTML = oneMember.party;
	 td3.innerHTML = oneMember.state;
	 td4.innerHTML = oneMember.seniority;
	 td5.innerHTML = oneMember.votes_with_party_pct;
	  tr.appendChild(td1);
	  tr.appendChild(td2);
	  tr.appendChild(td3);
	  tr.appendChild(td4);
	  tr.appendChild(td5);
	  tBody.appendChild(tr);
	  
	});
	

}
datafill(arr);

// events on checkboxes and droplist
function defineEvent() {
	let checkBoxI = document.getElementById("parI");
	let checkBoxD = document.getElementById("parD");
	let checkBoxR = document.getElementById("parR");
	let dropliststate= document.getElementById("state-selection")
	checkBoxD.addEventListener("click", function() {
	 doublefilter();
	});
	checkBoxI.addEventListener("click", function() {
	 doublefilter();
	});
	checkBoxR.addEventListener("click", function() {
	 doublefilter();
	});
	  dropliststate.addEventListener("change", function() {
		doublefilter();
	});
  }

  defineEvent();

  //filter for checkboxes only
  function filtercheckbox() {
	let checkBox = Array.from(
	  document.querySelectorAll("input[name=party]:checked")
	);
	let checkBoxValue = checkBox.map(oneCheckbox => {
	  return oneCheckbox.value;
	});
	let filteredMembers = [];
	if (checkBoxValue.length ==0){
				datafill(arr)
	}else{
	        arr.forEach(oneMember => {
	              if (checkBoxValue.includes(oneMember.party)) {
	                	filteredMembers.push(oneMember);
	                }	 
			});			
			datafill(filteredMembers);
		}
  }
  // filter for droplist only
  function filterstate(){
	  let x = document.getElementById("state-selection").value;
	  let filteredliststate =[];
	  arr.forEach(oneMember => {
		  if (x =="ALL"){filteredliststate.push(oneMember);}
		if (oneMember.state ==x) {
		  filteredliststate.push(oneMember);
        }
		});
		datafill(filteredliststate);
  }
// compined filters
  function doublefilter(){
	let x = document.getElementById("state-selection").value;
	let checkBox = Array.from(
		document.querySelectorAll("input[name=party]:checked")
	  );
	  let checkBoxValue = checkBox.map(oneCheckbox => {
		return oneCheckbox.value;
	  });
	 
	  let filteredMembers = [];
	  if ((x=="ALL")&&(checkBoxValue.length==0)){datafill(arr)}
	  else if(x=="ALL"){filtercheckbox()}
	 else if(checkBoxValue.length==0){filterstate()}
	 else{ arr.forEach(oneMember => {
		if (checkBoxValue.includes(oneMember.party) &&(oneMember.state==x)) {
			  filteredMembers.push(oneMember);
		  }	 
        });			
       datafill(filteredMembers);}
  }


 