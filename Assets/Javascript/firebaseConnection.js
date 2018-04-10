$(document).ready(function() {

  console.log("Firebase Connections are running")

  ///////////// Track User Connections Functionality ////////////////////////

  // Clicking the Start Button to Add a user to Firebase
  $("#add_Name").on("click", function() {

    // call addPlayer function to display player name
    addPlayer();

    // Call function to display current scores
    displayScores()

    // Check to see if client is connected
    connectedRef.on("value", function(fireUser) {
      // If user is connected, push True to database
      if (fireUser.val()) {
        connection.push(true);
        userDisconnect()
      }

    }); // End of connectedRef

    connection.on("value", function(fireUser) {
      // Tracks the amount of players after connectedRef pushes True
      let userConnections = fireUser.numChildren();
      // console.log("Number of current users: " + userConnections);

      // Conditions to assign player number / position
      if (userConnections == 1) {
        playerNumber = 1;
        console.log("I am player number " + playerNumber);
        displayName(playerNumber);
      }

      if (userConnections == 2 & playerNumber == 0) {
        playerNumber = 2;
        console.log("I am player number " + playerNumber);
        displayName(playerNumber);
      }

      if (userConnections == 2 & playerNumber != 0) {

        // Condition to start the game
        console.log("Game has Started");
        console.log("Player " + playerNumber + " has started");
        startGame(playerNumber);

      }
    }); // End of Connection

  }) // End of button click add name

}); // End of $(document).ready()
