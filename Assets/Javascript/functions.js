
console.log("Functions are running");

//////////////////////////// Functions ////////////////////////////

//////////////// Function to display current user's name//////////////////

displayName = (playerNumber) => $(".top_Message").html("Welcome " + currentUser + "." + " You are Player "+ playerNumber);

/////////////// Function for handling add player ////////////////////

function addPlayer(){
  // Retrieve name of user
  currentUser = $("#name_Input").val();
  // Clears user input box
  $("#name_Input").val("");
  // Hide Input box and button for Add player
  $("#name_Form").html("Please wait for the other player to begin").css("color", "white");

  nameConnection.push({
    user: currentUser
  });

}; // End function

/////////////// Function to Start the Game /////////////////////////////

function startGame(playerNumber){
  // Assign user's name to variable name
  let name = $("<div>").css({"text-align": "center", "padding-top": "25px"}).text(currentUser);;
  // Create Rock Paper Scissors Choices
  let rockPaperScissor = $("<div>").addClass("row center").css("width", "100%");
  let rock = $("<i>").addClass("col-xs-4 fa fa-hand-rock-o").attr("data-choice", "rock");
  let paper = $("<i>").addClass("col-xs-4 fa fa-hand-paper-o").attr("data-choice", "paper");
  let scissors = $("<i>").addClass("col-xs-4 fa fa-hand-scissors-o").attr("data-choice", "scissors");
  rockPaperScissor.append(rock, paper, scissors);

  database.ref("Choice").update({
    playerOneChoice: "false",
    playerTwoChoice: "false",
  });


  // Condition to determine which playNumber code to execute
  switch (playerNumber) {
    // Display player one info and choices
    case 1:
      // Add player's one name and choices to DOM
      $(".player_One_Choice").html(name);
      $(".player_One > .waiting").html(rockPaperScissor);
      // Event listner for player one pick
      $("[data-choice]").on('click', function(){
        console.log($(this).attr("data-choice"));

        // Store the player's current choice in local variable
        let playerChoice = $(this).attr("data-choice");

        if(playerChoice == rock.attr("data-choice")){

          $(".player_One > .waiting").html(rock).addClass("center").css("width", "100%");

        } else if(playerChoice == paper.attr("data-choice")){
                    $(".player_One > .waiting").html(paper).addClass("center").css("width", "100%");

        } else if(playerChoice == scissors.attr("data-choice")){
                    $(".player_One > .waiting").html(scissors).addClass("center").css("width", "100%");


        }


        // set the player's choice onto firebase
        database.ref("Choice").update({
          playerOneChoice: playerChoice
        });

        // Call function for retriving choices
        retriveChoices();
      });
      break;
    // Display player two info and choices
    case 2:
      // Add player's 2 name and choices to DOM
      $(".player_Two_Choice").html(name);
      $(".player_Two > .waiting").html(rockPaperScissor);
      // Event listner for player two pick
      $("[data-choice]").on('click', function(){
        console.log($(this).attr("data-choice"));
        // Store the player's current choice in local variable
        let playerChoice = $(this).attr("data-choice");

        if(playerChoice == rock.attr("data-choice")){

          $(".player_Two > .waiting").html(rock).addClass("center").css("width", "100%");

        } else if(playerChoice == paper.attr("data-choice")){
                    $(".player_Two > .waiting").html(paper).addClass("center").css("width", "100%");

        } else if(playerChoice == scissors.attr("data-choice")){
                    $(".player_Two > .waiting").html(scissors).addClass("center").css("width", "100%");


        }

        // set the player's choice onto firebase
        database.ref("Choice").update({
          playerTwoChoice: playerChoice
        });

        // Call function for retriving choices
        retriveChoices();

      });
      break;
      // If there are more than two player's currently playing
    default:
      $("#name_Form").html("There are currently 2 players playing. Please wait for them to finish playing before joining.");
  }// End Switch Statement

  // Remove Choices on disconnect
  // choiceConnection.onDisconnect().remove();

}; // End Function

//////////////////////// Function to Diplay Scores ////////////////////////

function displayScores(){
  // Player one score
  let playerOneScore = $("<div>").html("Wins: "+ playerOneWin +" Losses: "+ playerOneLose + " Tie: "+ playerOneTie);
  // Player Two score
  let playerTwoScore = $("<div>").html("Wins: "+ playerTwoWin +" Losses: "+ playerTwoLose + " Tie: "+ playerTwoTie);

  // Display player one and two Scores
  $(".player_One_Score").html(playerOneScore).css("text-align", "center");
  $(".player_Two_Score").html(playerTwoScore).css("text-align", "center");
  database.ref("Choice").update({
    playerOneChoice: "false",
    playerTwoChoice: "false"
  });

  } // End Function

//////////////////////// Evaluation Game Logic //////////////////////////

function evaluateChoices(playerOneChoice, playerTwoChoice) {
    playerOneChoice = choices.indexOf(playerOneChoice);
    playerTwoChoice = choices.indexOf(playerTwoChoice);
    if (playerOneChoice == playerTwoChoice) {
        playerOneTie++;
        playerTwoTie++;
        return "Tie";
    }
    if (playerOneChoice == choices.length - 1 && playerTwoChoice == 0) {
        playerTwoWin++;
        playerOneLose++;
        return "Player 2 wins";
    }
    if (playerTwoChoice == choices.length - 1 && playerOneChoice == 0) {
        playerOneWin++;
        playerTwoLose++;
        return "Player 1 wins";
    }
    if (playerOneChoice > playerTwoChoice) {
        playerOneWin++;
        playerTwoLose++;
        return "Player 1 wins";
    } else {
        playerTwoWin++;
        playerOneLose++;
        return "Player 2 wins";
    }; // End of conditions
}; // End Function


////////////// Function to display disconnected message //////////////////


function userDisconnect(){

  nameConnection.on("child_added",function(value){
    userConnectionKey= value.key;
  });

  // Display Disconnected message
  nameConnection.on("child_removed",function(value){
    let user = value.val().user
    $("#messages").append(user+" has disconnected </br>")

    nameConnection.on("value", function(value){
      exists = JSON.stringify(value.val());
    });
    console.log("esss is " +exists);
    if (exists){
      connection.push(true);
    }
    resetGame();

  });


  database.ref("user/"+userConnectionKey).onDisconnect().remove();

}


/////////////// Function to Reset the Match ///////////////////////////

function resetMatch(){

  let playerOneWin = 0;
  let playerOneLose = 0;
  let playerOneTie = 0;
  let playerTwoWin = 0;
  let playerTwoLose = 0;
  let playerTwoTie = 0;
  console.log("playernumberis" +playerNumber);

  //Clear Display
  $(".fight").html("");
  // Clear
  database.ref("Choice").update({
    playerOneChoice: "false",
    playerTwoChoice: "false"
  });

startGame(playerNumber)


} // End Function

function resetGame(){


    let playerOneWin = 0;
    let playerOneLose = 0;
    let playerOneTie = 0;
    let playerTwoWin = 0;
    let playerTwoLose = 0;
    let playerTwoTie = 0;
    console.log("playernumberis" +playerNumber);
    playerNumber = 0;
    //Clear Display
    $(".fight").html("");
    // Clear
    database.ref("Choice").update({
      playerOneChoice: "false",
      playerTwoChoice: "false"
    });


    startGame(playerNumber)


}
