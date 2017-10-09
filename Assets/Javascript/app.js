$(document).ready(function() {

////////////////////////// MomentJS Logic //////////////////////////////////////
// Function to get Current Time
function currentTime(){
  //Grab the current TIME
  let timeVariable = moment().format('MMMM Do YYYY, h:mm:ss a');
  //Display current date and time on the document
  let timeHTML = $("<div>").addClass("center");
  timeHTML.html(timeVariable);
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

// Global Variables

let currentUser = "";
let currentKey;
let chatKey = "";
let fireChat;
let fireKey;
let numberOfUsers;
let userConnectionKey;
// Initalize Firebase with stored settings
firebase.initializeApp(config);

// Store Firebase reference into a databse Variable
let database = firebase.database();

// Variable to Store Firebase Connection reference.
let connection = database.ref("/userConnections");
let userConnection = database.ref("/userConnections/user");
let chatConnection = database.ref("/userConnections/chat");

// Firebase location that tracks users. Returns a boolean value
let connectedRef = database.ref(".info/connected");




///////////// Track User Connections Functionality //////////////////////////


// Clicking the Start Button to Add a user to Firebase
$("#add_Name").on("click", function(){
  // Retrieve name of user
  currentUser = $("#name_Input").val();
  // When the client's connection state changes
  connectedRef.on("value", function(fireUser) {
    console.log("status of user: " +fireUser.val());

    // If connected = True
    if (fireUser.val()) {
      console.log("User Input has been stored:" + currentUser);
      // Add user to the connections list.
      userConnection.push({user: currentUser});
      // Clears user input box
      $("#name_Input").val("");
      // Display the name of the user
      displayName();
      // Tracks the current key of the user
      database.ref("/userConnections/user").on("child_added",function(value){
        userConnectionKey= value.key;
      });
      // Tracks the number of users currently present
      database.ref("/userConnections/user").on("value",function(value){
        // Store number of users
        numberOfUsers = value.numChildren();
        // Pass number of users into function that determines the player's position
        playerPosition(numberOfUsers);
      });

      // Display Disconnected message
      database.ref("/userConnections/user/").on("child_removed",function(value){

        let user = value.val().user
        $("#messages").append(user+" has disconnected </br>")
      });
    };// End if

  database.ref("/userConnections/user/"+userConnectionKey).onDisconnect().remove();


    // $("#messages").append("has disconnected </br>");


  chatConnection.onDisconnect().remove();
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
   let messages = $("#messages")
   messages.append(name+ ": "+ currentMessage + "</br>");

   // Auto Scroll Chat
   var isScrolledToBottom = messages.scrollHeight - messages.clientHeight <= messages.scrollTop + 1;
   if (isScrolledToBottom) {
   messages.scrollTop = messages.scrollHeight - messages.clientHeight;;
    }
  });


// // When user gets disconnected
// database.ref("userConnections").on('child_removed', function(childSnapshot) {
//
//
//
//   $("#messages").append("has disconnected </br>")
//
// });







///////////////////// End of Chat Functionality ///////////////////




//////////////////////////// Functions ////////////////////////////
// Function to display current user's name
let displayName = () => $(".top_Message").html("Welcome " + currentUser + "." + " Please wait for another player to connect.");


// Function to determine player's position
function playerPosition (numberOfUsers){
  switch(numberOfUsers){
  case 1:
    console.log("you are player one");
    break;

  case 2:
    console.log("you are player two");
    break;
  }
};




// End of Document Ready()
});
