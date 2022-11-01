//creation of calendar variable
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var startYear = 2000;
var endYear = 2020;
var month = 0;
var year = 0;
var day = document.getElementsByClassName('day')
var savebtn = document.getElementById('btnSave');
var arr = [];
// this function loads calendar months
function loadCalendarMonths() {
    for (var i = 0; i < months.length; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = months[i];
        doc.classList.add("dropdown-item");
        doc.onclick = (function () {
            var selectedMonth = i;
            return function () {
                month = selectedMonth;
                document.getElementById("curMonth").innerHTML = months[month];
                loadCalendarDays();
                return month;
            }
        })();

        document.getElementById("months").appendChild(doc);
    }
}
//modal is created to add new project data
var openModal = function(event) {
    console.log(event,'event')
    var day = event.target.innerHTML;
    var date = day + "-" + document.getElementById("curMonth").innerHTML + "-" + document.getElementById("curYear").innerHTML;
    document.getElementById('selectDate').value = date;
    $('#planModal').modal('show');
};
// this function is used for fill data
savebtn.onclick = function(){
     var selectDate = document.getElementById('selectDate').value;
     var projectName = document.getElementById('projectName').value;
     var description = document.getElementById('description').value;
     var estimate = document.getElementById('estimate').value;
     var obj = {};
    if(selectDate !== ""  && projectName !== "" && estimate !== ""){
        obj.projectName=projectName;
        obj.selectDate=selectDate;
        obj.description=description;
        obj.estimate=estimate;
        var txt = "";
        arr.push(obj);
        for(var i=0;i<arr.length;i++){
                txt += "<tr><td>"+arr[i].projectName+"</td><td>"+arr[i].description+"</td>"+ "<td>"+arr[i].estimate+"</td></tr>";
        }
         $("#planTable tbody").append(txt);
         $('#planModal').modal('hide');
        alert("Project details submitted successfully !");
        document.getElementById('projectName').value="";
        document.getElementById('description').value="";
        document.getElementById('estimate').value="";
    }else {
        alert('Please fill the required fields !');
    }
}

// this function loads calendar years
function loadCalendarYears() {
    document.getElementById("years").innerHTML = "";

    for (var i = startYear; i <= endYear; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedYear = i;
            return function () {
                year = selectedYear;
                document.getElementById("curYear").innerHTML = year;
                loadCalendarDays();
                return year;
            }
        })();

        document.getElementById("years").appendChild(doc);
    }
}
// this function loads calendar days
function loadCalendarDays() {
    document.getElementById("calendarDays").innerHTML = "";

    var tmpDate = new Date(year, month, 0);
    var num = daysInMonth(month, year);
    var dayofweek = tmpDate.getDay();       // find where to start calendar day of week

    for (var i = 0; i <= dayofweek; i++) {
        var d = document.createElement("div");
        d.classList.add("day");
        d.classList.add("blank");
        document.getElementById("calendarDays").appendChild(d);
    }

    for (var i = 0; i < num; i++) {
        var tmp = i + 1;
        var d = document.createElement("div");
        d.id = "calendarday_" + i;
        d.className = "day";
        d.addEventListener('click', openModal, false);
        d.innerHTML = tmp;

        document.getElementById("calendarDays").appendChild(d);
    }

    var clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calendarDays").appendChild(clear);
}

function daysInMonth(month, year)
{
    var d = new Date(year, month+1, 0);
    return d.getDate();
}

window.addEventListener('load', function () {
    var date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
   
    document.getElementById("curMonth").innerHTML = months[month];
    document.getElementById("curYear").innerHTML = year;
    loadCalendarMonths();
    loadCalendarYears();
    loadCalendarDays();

});