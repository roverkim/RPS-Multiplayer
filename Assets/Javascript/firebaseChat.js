$(document).ready(function() {
  // Store's the player's Name on the database

  (function(){

    let messages = $("#messages")
    messages.append("Admin: Please Enter Your Name to Begin </br>");

  }());

  console.log("Firebase Chat is running");
  // //////////////// Chat Functionality //////////////////////////////
  // CLicking the Send Button //
  $("#add_Message").on("click", function(){
    // Retrive message from input
    let currentChat = $("#message_Input").val();
    // Push chat value and name of user into database
    database.ref("/admin/chat").push({
      user: currentUser,
      message: currentChat
    });

    // Clear the chat box
    $("#message_Input").val("");

  });

  // Retrieve Message from database
   database.ref("/admin/chat").on("child_added", function(response){
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

});
