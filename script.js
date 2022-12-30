// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Set variable to displau the date and time.
var dispTime = $('#currentDay');

// Set which uses daysjs to extract the current date and time.
setInterval(function() {
  var now = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  dispTime.text(now);
  // Set interval to refresh the dayjs info every second.
}, 1000)

// function which wraps around everything to do what's asked of me in line 1.
$(document).ready (function() {

// Set stored variables
var currentHour = dayjs().format('HH');
var schedule = [];
var hour = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

// Set the selector variables for functions
var button = $(".btn");
var hourEl = $(".time-block");

// Set event listener to save entries once the button is clicked. 
button.on("click", function() {
  var saveBtnKey = $(this).parent().attr("id");
  var userTxt = $(this).siblings(".description").val();
  localStorage.setItem(saveBtnKey, JSON.stringify(userTxt));
});

// Set the for loop to capture the items in the schedule
for (i = 0; i < 9; i++) {
  schedule.push(JSON.parse(localStorage.getItem("hour-" + hour[i])));
}

// Set function to change the color of the schedule text area depending of the time of the day
$(hourEl).each (function() {
  var hourId = $(this).attr("id");
  var split = hourId.slice(-2);
  var content = JSON.parse(localStorage.getItem(hourId))
  if (content) {
    $(this).children(".description").html(content);
  } if (currentHour == split) {
    $(this).addClass("present")
  } if (currentHour < split) {
    $(this).addClass("future")
  } if (currentHour > split) {
    $(this).addClass("past")
  };
})
});