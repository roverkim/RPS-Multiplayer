console.log("Firebase Game is running");

function retriveChoices() {

  // Listen for changes to choices on firebase
  choiceConnection.on("value", (choices) => {

    playerOneChoice = choices.val().playerOneChoice;
    playerTwoChoice = choices.val().playerTwoChoice;

    // Condition for calling evaluate choices function
    if (playerOneChoice !== "false" && playerTwoChoice !== "false") {

      choiceConnection.once("value", (choices) => {
        choiceConnection.off();
        // Evaluates who won the game
        matchOutcome = evaluateChoices(playerOneChoice, playerTwoChoice);

        let result = $("<div>").html(matchOutcome);

        // Display on players screen who won the matchOutcome
        $(".fight").html(result).css({"text-align": "center", "verticle-align": "center"}).addClass("center");
        displayScores();

        // Function call to reset the match after 2 seconds
        setTimeout(resetMatch, 2000);
      });
    }; // End of condition

  }); // End of Event Listner
}; // End Function
