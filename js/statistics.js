let arr = [];
let txt = "";
let loading = true;

function renderRemoteData(url, txt) {
	fetch(url, {
			method: "GET",
			dataType: 'json',
			headers: {
				"X-API-Key": "LZOb4ub75l4DHlg1E7gnEhU1AlRFTyLch2cy7KJp"
			}
		})

		.then(response => {
			console.log(response);
			let json = response.json();
			return json;
		})
		.then(result => {
			loading = false;
			arr = result.results[0]["members"];

			if (txt == "page-data") {

				buildoptions(arr);
				datafill(arr);
				defineEvent();
			} else if (txt == "attendance") {
				partymember(arr);
			} else if (txt == "loyalty") {
				loyalpages(arr);
			}

		})
		.catch(error => console.log(error));

}
var democrat = [];
var republican = [];
var independent = [];


// finding every party members
function partymember(arr) {
	if (loading == false) {
		j = 0;
		k = 0;
		l = 0;
		for (i = 0; i < arr.length; i++) {
			if (arr[i]["party"] == "D") {
				democrat[j] = arr[i];
				j++;
			}
			if (arr[i]["party"] == "R") {
				republican[k] = arr[i];
				k++;
			}
			if (arr[i]["party"] == "ID") {
				independent[l] = arr[i];
				l++;
			}
			if (arr[i]["party"] == "I") {
				independent[l] = arr[i];
				l++;
			}

		}


		//the statistics object
		var statistics = {
			"Democrats": [democrat.length, averagecal(democrat, "missed_votes_pct")],
			"Republican": [republican.length, averagecal(republican, "missed_votes_pct")],
			"Independent": [independent.length, averagecal(independent, "missed_votes_pct")],
			"Total": [arr.length, averagecal(arr, "missed_votes_pct")]
		};

		// building glance table from an object


		if (document.getElementById("glance") != null) {
			document.getElementById("loader1").style.display="none";
			document.getElementById("glance").appendChild(dataobject(statistics));
		}


		//sorting our object
		var sortedobj = arr.sort(function (a, b) {
			return parseFloat(b.missed_votes_pct) - parseFloat(a.missed_votes_pct);
		});


		if (document.getElementById("bottom-attendance") != null) {
			document.getElementById("loader2").style.display="none";
			document.getElementById("bottom-attendance").appendChild(dataleast(least(sortedobj)));
		}
		//building the bottom table
		function dataleast(arr) {
			let tBody = document.createElement("tbody");
			arr.forEach(function (oneMember) {
				let tr = document.createElement("tr");
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");
				let td3 = document.createElement("td");
				if (oneMember.url == "") {
					td1.innerHTML = findfullname(oneMember);
				} else {
					td1.appendChild(urlformember(oneMember))
				}
				td2.innerHTML = oneMember.missed_votes;
				td3.innerHTML = oneMember.missed_votes_pct;
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tBody.appendChild(tr);

			});
			return tBody;
		}


		//sorting our object
		var sortedobjrev = arr.sort(function (a, b) {
			return parseFloat(a.missed_votes_pct) - parseFloat(b.missed_votes_pct);
		});
		if (document.getElementById("most-attendance") != null) {
			document.getElementById("loader3").style.display="none";
			document.getElementById("most-attendance").appendChild(dataleast(least(sortedobjrev)));
		}
	}


}
//finding fullname
function findfullname(oneMember) {
	if (oneMember.middle_name != null) {
		fullname = oneMember.first_name + " " + oneMember.middle_name + " " + oneMember.last_name;

	} else {
		fullname = oneMember.first_name + " " + oneMember.last_name
	}
	return fullname;
}
//linking to the fullname
function urlformember(oneMember) {
	let link = document.createElement("a");
	link.setAttribute("href", oneMember.url);
	link.style.color = "#4a84c3";
	let linkText = document.createTextNode(findfullname(oneMember));
	link.appendChild(linkText);
	return link;
}

//average function

function averagecal(array, str) {
	var sum = 0;
	var average = 0;
	if (array.length == 0) {
		return "--"
	} else {
		for (i = 0; i < array.length; i++) {
			if (array[i][str] != null) {
				sum = sum + array[i][str];
			}
		}

		average = (sum / array.length).toFixed(2);
		return average;
	}
}

function dataobject(statistics) {
	let tBody = document.createElement("tbody");
	Object.entries(statistics).forEach(function (element) {
		let tr = document.createElement("tr");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		td1.innerHTML = element[0];
		td2.innerHTML = element[1][0];
		td3.innerHTML = element[1][1];

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tBody.appendChild(tr);

	});

	return tBody;
}


function least(sorted) {
	var j = 0;
	var leastengaged = [];
	for (i = 0; i < 10; i++) {
		leastengaged[j] = sorted[i];
		j++;
	}
	return leastengaged;
}

function loyalpages(arr) {
	if (loading == false) {
		j = 0;
		k = 0;
		l = 0;
		for (i = 0; i < arr.length; i++) {
			if (arr[i]["party"] == "D") {
				democrat[j] = arr[i];
				j++;
			}
			if (arr[i]["party"] == "R") {
				republican[k] = arr[i];
				k++;
			}
			if (arr[i]["party"] == "ID") {
				independent[l] = arr[i];
				l++;
			}
			if (arr[i]["party"] == "I") {
				independent[l] = arr[i];
				l++;
			}

		}

		//the statistics loyal object
		var statisticsloy = {
			"Democrats": [democrat.length, averagecal(democrat, "votes_with_party_pct")],
			"Republican": [republican.length, averagecal(republican, "votes_with_party_pct")],
			"Independent": [independent.length, averagecal(independent, "votes_with_party_pct")],
			"Total": [arr.length, averagecal(arr, "votes_with_party_pct")]
		};
		if (document.getElementById("glance-loy") != null) {
			document.getElementById("loader1").style.display="none";
			document.getElementById("glance-loy").appendChild(dataobject(statisticsloy));
		}

		function dataleastloyal(arr) {
			let tBody = document.createElement("tbody")
			arr.forEach(function (oneMember) {
				let tr = document.createElement("tr");
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");
				let td3 = document.createElement("td");
				if (oneMember.url == "") {
					td1.innerHTML = findfullname(oneMember);
				} else {
					td1.appendChild(urlformember(oneMember))
				}
				td2.innerHTML = oneMember.total_votes;
				td3.innerHTML = oneMember.votes_with_party_pct;
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tBody.appendChild(tr);

			});
			return tBody;
		}
		var sortedobjloy = arr.sort(function (a, b) {
			return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
		});

		if (document.getElementById("bottom-senate-loyalty") != null) {
			document.getElementById("loader2").style.display="none";
			document.getElementById("bottom-senate-loyalty").appendChild(dataleastloyal(least(sortedobjloy)));
		}

		//sorting our object
		var sortedobjloyrev = arr.sort(function (a, b) {
			return parseFloat(b.votes_with_party_pct) - parseFloat(a.votes_with_party_pct);
		});
		if (document.getElementById("most-senate-loyalty") != null) {
			document.getElementById("loader3").style.display="none";
			document.getElementById("most-senate-loyalty").appendChild(dataleastloyal(least(sortedobjloyrev)));
		}


	}}