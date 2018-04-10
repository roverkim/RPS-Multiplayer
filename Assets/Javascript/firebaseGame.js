console.log("Firebase Game is running");

function retriveChoices(playerNumber, rock, paper, scissors) {

  // Listen for changes to choices on firebase
  choiceConnection.on("value", (choices) => {

    playerOneChoice = choices.val().playerOneChoice;
    playerTwoChoice = choices.val().playerTwoChoice;

    // Condition for calling evaluate choices function
    if (playerOneChoice !== "false" && playerTwoChoice !== "false") {

      choiceConnection.once("value", (choices) => {
        choiceConnection.off();

        switch (playerNumber){
          case 1:

            if(playerTwoChoice == 'rock'){
              $(".player_Two > .waiting").html('<p> Player Chose: </p> </br>').append(rock).addClass("center").css("width", "100%");
            } else if (playerTwoChoice == 'paper') {
              $(".player_Two > .waiting").html('<p> Player Chose: </p> </br>').append(rock).addClass("center").css("width", "100%");
            } else if (playerTwoChoice == 'scissors') {
              $(".player_Two > .waiting").html('<p> Player Chose: </p> </br>').append(rock).addClass("center").css("width", "100%");
            };
            break;
          case 2:
            if(playerOneChoice == 'rock'){
              $(".player_One > .waiting").html('<p> Player Chose: </p> </br>').append(rock).addClass("center").css("width", "100%");
            } else if (playerOneChoice == 'paper') {
              $(".player_One > .waiting").html('<p> Player Chose: </p> </br>').append(rock).addClass("center").css("width", "100%");
            } else if (playerOneChoice == 'scissors') {
              $(".player_One > .waiting").html('<p> Player Chose: </p> </br>').append(rock).addClass("center").css("width", "100%");
            };
            break;
          default:
            break;
        }

        // Evaluates who won the game
        matchOutcome = evaluateChoices(playerOneChoice, playerTwoChoice);

        // Retrieve Choices and Diplay Animations
        // Diplay the Opponent's Choices


        let result = $("<div>").html(matchOutcome);

        // Display on players screen who won the matchOutcome
        $(".fight").html(result).css({"text-align": "center", "verticle-align": "center"}).addClass("center");
        displayScores();
        // Function call to reset the match after 2 seconds
        setTimeout(()=> {
          resetMatch();
        }, 2000);
      });
    }; // End of condition

  }); // End of Event Listner
}; // End Function
