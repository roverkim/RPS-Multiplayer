console.log("Clock is running");
////////////////////////// MomentJS Logic //////////////////////////////////////

// Code for number clock
// Function to get Current Time
// function currentTime(){
//   //Grab the current TIME
//   let timeVariable = moment().format('MMMM Do YYYY, h:mm:ss a');
//   //Display current date and time on the document
//   let timeHTML = $("<div>").addClass("center");
//   timeHTML.html(timeVariable);
//   $(".time").html(timeHTML).css("color", "yellow");
// }

// Updates the time on HTML
// setInterval(currentTime, 1000);

// Code for analog clock
function time(){

  // Function for moving the hour, minute and second hand
  function updateClock(){
      // Get current time
      var now = moment();
          second = now.seconds() * 6;
          minute = now.minutes() * 6 + second / 60;
          hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

      $('#hour').css("transform", "rotate(" + hour + "deg)");
      $('#minute').css("transform", "rotate(" + minute + "deg)");
      $('#second').css("transform", "rotate(" + second + "deg)");
  }

 // Function calls updateClock every second
    setInterval(updateClock, 1000);
};

// Execute time function to display clock

  time();

//////////////////////// End of Moment JS ///////////////////////////////////////
