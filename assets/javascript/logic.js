
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC57wb14iCyvJH0-Vv1dVbu_rfLI8PpAS4",
    authDomain: "my-cool-project-fe0c8.firebaseapp.com",
    databaseURL: "https://my-cool-project-fe0c8.firebaseio.com",
    projectId: "my-cool-project-fe0c8",
    storageBucket: "my-cool-project-fe0c8.appspot.com",
    messagingSenderId: "847247850535"
  };
  firebase.initializeApp(config);

const database = firebase.database();


// on button click
$(".addTrainBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs fields input
  var trainNumber = $(".train-name").val().trim();
  var trainDestination = $(".destination").val().trim();
  var trainFirstDeparture = $(".firstDeparture").val();
  var trainFrequency = $(".frequency").val().trim();
  

  // local object to hold data

  var trainObject = {
  trainNumber: trainNumber,
  trainDestination: trainDestination,
  trainFrequency: trainFrequency,
  trainFirstDeparture: trainFirstDeparture

  };

  // uploads train info to database

  database.ref().push(trainObject);

  console.log(trainObject.trainNumber);
  console.log(trainObject.trainDestination);
  console.log(trainObject.trainFrequency);
  console.log(trainObject.trainFirstDeparture);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $(".train-name").val("");
  $(".destination").val("");
  $(".firstDeparture").val("");
  $(".frequency").val("");

});

database.ref().on("child_added", function (childSnapshot, prevChildKey){

	var trainNumber = childSnapshot.val().trainNumber;
  var trainDestination = childSnapshot.val().trainDestination;
  var trainFrequency = childSnapshot.val().trainFrequency;
  var trainFirstDeparture = childSnapshot.val().trainFirstDeparture;

  var timeAfterFirstDeparture = moment().diff(moment(trainFirstDeparture, "X"), "minutes");
  console.log(timeAfterFirstDeparture);
  var remainder = timeAfterFirstDeparture%trainFrequency;
  var minutesAway = trainFrequency - remainder;
  console.log(minutesAway);


  $(".train-schedule > tbody").append("<tr><td>" + trainNumber + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainFirstDeparture + "</td><td>" + minutesAway + "</td>");

});