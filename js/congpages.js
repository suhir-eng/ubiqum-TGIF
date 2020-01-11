
function datafill()
{   // get the reference for the body
    // var body = document.getElementsByTagName("body")[0];
    // let table = document.getElementById("page-data");
     // creates a <table> element and a <tbody> element
   // var tb = document.createElement("table");
   // tb.setAttribute("class" , "table table-bordered table-hover cong-table");
    var tbBody = document.createElement("tbody");

     //create first row for labels
     /* var newrow = table.insertRow(0);
     newrow.style.fontWeight = "bold";
     newrow.style.backgroundColor = "#adbce6";
     var cell1 = newrow.insertCell(0);
     var cell2 = newrow.insertCell(1);
     var cell3 = newrow.insertCell(2);
     var cell4 = newrow.insertCell(3);
     var cell5 = newrow.insertCell(4);
     cell1.innerHTML = "Name";
     cell2.innerHTML = "Party";
     cell3.innerHTML = "State";
     cell4.innerHTML = "Years in Office";
     cell5.innerHTML = "% Votes w/Party"; */

   
     
     var arr =data.results[0]["members"];

     
// creating all cells
for (var i = 0; i < arr.length; i++)
{

     // creates a table row
     var row = document.createElement("tr");
     row.style.backgroundColor = ""
     var mem = arr[i];
     for (var j = 0; j < 5; j++)
     {   
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
         
          if (j == 0)
          {
                    var fullname = mem["first_name"];
          
                    if ( mem["middle_name"] != null)
                         {
               
                              fullname = fullname +" " + mem["middle_name"];
               
          
                         }else {
                              fullname = mem["first_name"];
                              };
          
                    fullname = fullname + " " +  mem["last_name"];
                    if (mem["url"] ==""){ 
                         var cellText = document.createTextNode(fullname);
                         cell.appendChild(cellText);
                    }else{
                    // adding a link to fullname
                    var link = document.createElement("a");

                    link.setAttribute("href", mem["url"]);
                    link.style.color= "#4a84c3";
                   
                    var linkText = document.createTextNode(fullname);
                    link.appendChild(linkText);

                    // Add the link to the previously created TableCell.
                    cell.appendChild(link);
               }
                   
                  
               row.appendChild(cell);
          }
          
               if (j == 1)
               {
               
               var cellText = document.createTextNode(mem["party"]);
                    cell.appendChild(cellText);
               row.appendChild(cell);
               }
               if (j == 2)
               {
               var cellText = document.createTextNode(mem["state"]);
                    cell.appendChild(cellText);
               row.appendChild(cell);
               }
               if (j == 3) 
               {
               var cellText = document.createTextNode(mem["seniority"]);
                    cell.appendChild(cellText);
               row.appendChild(cell);
               }
               if (j == 4)
               {
               var cellText = document.createTextNode(mem["votes_with_party_pct"]);
                    cell.appendChild(cellText);
               row.appendChild(cell);
               }
               
     
     }
     // add the row to the end of the table body
     tbBody.appendChild(row);

     
}
// put the <tbody> in the <table>
     //tb.appendChild(tbBody);
     // appends <table> into <body>
    // body.appendChild(tb);
    

     //table.appendChild(tbBody)
     return tbBody;
}
//datafill()
document.getElementById("page-data").appendChild(datafill()) ;
//to solve the problem of undefind message
document.getElementById("page-data").childNodes[0].nodeValue = null;









