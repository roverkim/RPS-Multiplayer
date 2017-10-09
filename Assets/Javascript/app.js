$(document).ready(function() {

////////////////////////// MomentJS Logic //////////////////////////////////////
// Function to get Current Time
function currentTime(){
  //Grab the current TIME
  let timeletiable = moment().format('MMMM Do YYYY, h:mm:ss a');
  //Display current date and time on the document
  let timeHTML = $("<div>").addClass("center");
  timeHTML.html(timeletiable);
  $(".time").html(timeHTML).css("color", "yellow");
}

// Updates the time on HTML
setInterval(currentTime, 1000);
//////////////////////// End of Moment JS ///////////////////////////////////////

////////////////////// Firebase Logiv //////////////////////////////////////////
// Store firebase config settings
let config = {
  apiKey: "AIzaSyCiI0B9k-Cnm32e8pKWS-BwttZwDcDuPqY",
  authDomain: "rps-multiplayer-14f2b.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-14f2b.firebaseio.com",
  projectId: "rps-multiplayer-14f2b",
  storageBucket: "",
  messagingSenderId: "763608117588"
};

// Global letiables

let currentUser = "";
let currentKey;
let chatKey = "";
let player_One;
let player_Two;
let fireChat;
let fireKey;
// Initalize Firebase with stored settings
firebase.initializeApp(config);

// Store Firebase reference into a databse letiable
let database = firebase.database();

// letiable to Store Firebase Connection reference.
let connection = database.ref("/userConnections");
let userConnection = database.ref("/userConnections/user");
let chatConnection = database.ref("/userConnections/chat");

// Firebase location that tracks users. Returns a boolean value
let connectedRef = database.ref(".info/connected");


///////////// Track User Connections Functionality //////////////////////////


// Clicking the Start Button to Add a user to Firebase
$("#add_Name").on("click", function(){
  currentUser = $("#name_Input").val();
  connectedRef.on("value", function(fireUser) {
    // If connected = True
    if (fireUser.val()) {
      console.log("User Input has been stored:" + currentUser);
      // Add user to the connections list.
      userConnection.push({user: currentUser});
      // Remove user from the connection list when they disconnect.
      connection.onDisconnect().remove();
      // Clears user input box
      $("#name_Input").val("");
      displayName();
    }
  })
});

// //////////////// Chat Functionality //////////////////////////////
// CLicking the Send Button //
$("#add_Message").on("click", function(){
  // Retrive message from input
  let currentChat = $("#message_Input").val();
  // Push chat value and name of user into database
  database.ref("/userConnections/chat").push({
    user: currentUser,
    message: currentChat
  });

  $("#message_Input").val("");

});


// Retrieve Message from database
 database.ref("/userConnections/chat").on("child_added", function(response){
   let currentMessage = response.val().message;
   let name = response.val().user;
   //Prints name and message on screen
   $("#messages").append(name+ ": "+ currentMessage + "</br>");

 });



///////////////////// End of Chat Functionality ///////////////////




//////////////////////////// Functions ////////////////////////////

let displayName = () => $(".top_Message").html("Welcome " + currentUser + "." + " Please wait for another player to connect.");






// End of Document Ready()
});
