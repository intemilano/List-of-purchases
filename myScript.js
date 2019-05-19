//Form validation Conditional Statements 
var x;
function myTest() {
  var inpObj = document.getElementById("myForm").elements[0];
  if (!inpObj.checkValidity()) {
    alert(inpObj.validationMessage);
  } 

  else if (document.getElementById("myForm").elements[0].value != '' && document.getElementById("myForm").elements[1].value != '' && document.getElementById("myForm").elements[2].value == "USD" || document.getElementById("myForm").elements[2].value == "Usd"|| document.getElementById("myForm").elements[2].value == "usd" || document.getElementById("myForm").elements[2].value == "EURO"|| document.getElementById("myForm").elements[2].value == "Euro"|| document.getElementById("myForm").elements[2].value == "euro"|| document.getElementById("myForm").elements[2].value == "PLN"|| document.getElementById("myForm").elements[2].value == "Pln"|| document.getElementById("myForm").elements[2].value == "pln"|| document.getElementById("myForm").elements[2].value == "UAH"|| document.getElementById("myForm").elements[2].value == "Uah"|| document.getElementById("myForm").elements[2].value == "uah" && document.getElementById("myForm").elements[3].value != '' ){
    x = document.getElementById("myBtn");
    x.addEventListener("click", myData);
    x.addEventListener("click", resultPrice);
    x.addEventListener("click", resultPrice1);
    x.addEventListener("click", myFunction);
  }
  else {
    alert("All input fields must be filled out. Fill the form correctly!");
  } 
} 

//Loop through all elements in a form and output the value of each element:
var one = [];
function myData() {
  var x = document.getElementById("myForm");
  var txt = "";
  var i;
  for (i = 0; i < x.length; i++) {
    txt = txt + x.elements[i].value + "<br>";
    one.push(x.elements[i].value);
  }
    
  //Convert curency in UAH
  var numbers = [];
  var total = ""; 
  var currency = one[2]; //Копируем значение ячейки;
  var price = one[1];

  //Конвертируем валюту в гривны;
switch (currency) {
  case "USD":
  case "Usd":
  case "usd":
    priceInUah = (usd * price).toFixed(2);
    break;
  case "EURO":
  case "Euro":
  case "euro":
    priceInUah = (euro * price).toFixed(2);
    break;
  case "PLN":
  case "Pln":
  case "pln":
    priceInUah = (pln * price).toFixed(2);
    break;  
  case "UAH":
  case "Uah":
  case "uah":
    priceInUah = (1*price).toFixed(2);
    break;
  default:
    priceInUah = "";
  }
}

//TOTAL PRICE IN UAH
var add = (function () {
  var counter = "";
  return function () {counter = (1* counter) + (1 * priceInUah); return counter.toFixed(2) + " UAH";}
})();

function resultPrice(){
  document.getElementById("totalPrice").innerHTML = add();
}

//TOTAL PRICE 2019 IN UAH
var add1 = (function () {
  var counter1 = "";
  return function () {counter1 = (1* counter1) + (1 * priceInUah); return counter1.toFixed(2) + " UAH";}
})();

function resultPrice1(){
  var text = one[0]; 
  var pattern = /2019/.test(text);
  if (pattern) {
    document.getElementById("totalPrice1").innerHTML = add1();
  }
}

//Add a new row at the first position of the table and then add cells and content
function myFunction() {
  var table = document.getElementById("myTable");
  var row = table.insertRow(1);
  row.setAttribute("class", "item");
  row.setAttribute("class", "one");
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = one[0];
  cell2.innerHTML = one[1];
  cell3.innerHTML = one[2];
  cell4.innerHTML = priceInUah;
  cell5.innerHTML = one[3];
  one.splice(0, 6);                          //Clear array "one"
  document.getElementById("myForm").reset(); //Clear form "myForm"
}

//Parcing currency
  $.getJSON("http://data.fixer.io/api/latest?access_key=875bf9b9d5a6e2b8acb0c2160ba4d8d3", function(data) {
    $('#EURO').html("1 EURO -> " + data.rates.UAH + " UAH");
    $('#USD').html("1 USD -> " + 1/data.rates.USD*data.rates.UAH + " UAH");
    $('#PLN').html("1 PLN -> " + 1/data.rates.PLN*data.rates.UAH + " UAH");
    euro = data.rates.UAH;
    usd = 1/data.rates.USD * data.rates.UAH;
    pln = 1/data.rates.PLN * data.rates.UAH;
});

//Delete a row in the table
$(document).ready(function(){
  $(".item").dblclick(function(){
    $(this).addClass("hiding");
  });
});

function rowDel() {
  document.getElementById("myTable").deleteRow(1);
}

//Removes all row/rows for specified date
function clearYear() {
  var input, filter, table, tr, td, i, txtValue;
  input = prompt("Please enter your date:", "2019-04-25");
  filter = input.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "none";
      } else {
        tr[i].style.display = " ";
      }
    }       
  }
}

//Delete all rows in the table
$(document).ready(function(){
  $("#delSelRows").click(function(){
    $("tr").remove(".one");
  });
});  

//report 2019 in UAH button
function report() {
  var x = document.getElementById("report");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
}