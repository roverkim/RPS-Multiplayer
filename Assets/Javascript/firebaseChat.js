$(document).ready(function() {
  console.log("Firebase Chat is running");
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

});
