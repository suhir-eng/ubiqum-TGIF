var arr = data.results[0]["members"];

var democrat = partymember("D");
var republican = partymember("R");
var independent = partymember("I");

// finding every party members
function partymember(str) {
	var partylist = [];
	j = 0;
	for (i = 0; i < arr.length; i++) {
		if (arr[i]["party"] == str) {
			partylist[j] = arr[i];
			j++;
		}
	}
	
	return partylist;
}
//the statistics object

var statistics = {
	"Democrats": [democrat.length, averagecal(democrat, "votes_with_party_pct")],
	"Republican": [republican.length, averagecal(republican, "votes_with_party_pct")],
	"Independent": [independent.length, averagecal(independent, "votes_with_party_pct")],
	"Total": [arr.length, averagecal(arr, "votes_with_party_pct")]
};
//average function

function averagecal(array, str) {
	var sum = 0;
	var average = 0;
	if (array.length == 0){
		return "--";
	}else{
	for (i = 0; i < array.length; i++) {
		sum = sum + array[i][str];
	}
	average = (sum / array.length).toFixed(2);
	return average;
}}



	

	

	
