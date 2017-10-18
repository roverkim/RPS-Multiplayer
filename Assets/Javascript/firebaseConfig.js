console.log("Firebase has been set up");

///////////////////////// Firebase Setup //////////////////////////////////////////

// Store firebase config settings
let config = {
  apiKey: "AIzaSyCiI0B9k-Cnm32e8pKWS-BwttZwDcDuPqY",
  authDomain: "rps-multiplayer-14f2b.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-14f2b.firebaseio.com",
  projectId: "rps-multiplayer-14f2b",
  storageBucket: "",
  messagingSenderId: "763608117588"
};

// Initalize Firebase with stored settings
firebase.initializeApp(config);

// Store Firebase reference into a databse variable for easy reference
let database = firebase.database();

// variable to Store Firebase Connection references.
let connection = database.ref("userConnections");
let choiceConnection =  database.ref("Choice");
let chatConnection = database.ref("admin/chat");
let nameConnection = database.ref("user");
let userConnectionKey;

// Firebase location that tracks users. Returns a boolean value
let connectedRef = database.ref(".info/connected");

// Remove connections when a user discconnects
connection.onDisconnect().remove();
chatConnection.onDisconnect().remove();
choiceConnection.onDisconnect().remove();




////////////////////// End of Firebase Setup ///////////////////////////////////
