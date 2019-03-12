var config = {
    apiKey: "AIzaSyDNg9ZwaGyq8njjRhSZagIxbSuPGOCAxwE",
    authDomain: "train-schedule-5b23b.firebaseapp.com",
    databaseURL: "https://train-schedule-5b23b.firebaseio.com",
    projectId: "train-schedule-5b23b",
    storageBucket: "train-schedule-5b23b.appspot.com",
    messagingSenderId: "134825147307"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment().format();
	console.log("Current Time: " + currentTime);
$("#click-button").on("click", function() {
       event.preventDefault(); 
	  var trainNameForm = $("#trainNameForm").val().trim();
	  var destinationForm = $("#destinationForm").val().trim();
	  var trainTimeForm = moment($("#trainTimeForm").val().trim(), "HH:mm").format("HH:mm");
    var frequencyForm = $("#frequencyForm").val().trim();

	  var newTrain = {
		train: trainNameForm,
		destination: destinationForm,
		first: trainTimeForm,
		frequency: frequencyForm
    };

	database.ref().push(newTrain);
	console.log(newTrain.train);
  console.log(newTrain.destination);
	console.log(newTrain.first);
	console.log(newTrain.frequency);
	
	//Clearing the inputs
	 $("#trainNameForm").val("");
  	 $("#destinationForm").val("");
	 $("#trainTimeForm").val("");
	 $("#frequencyForm").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
	
  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;
  
  //Variable to figure out the converted train time
  var trainTimeConverted = moment(trainTime, "HH:mm");
	
  //Declaring a time difference variable
  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
	console.log(timeDifference);
	
  var frequencyMinutes = childSnapshot.val().frequency;
	console.log("Frequency Minutes: " + frequencyMinutes);
  
  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  	console.log("Minutes Away: " + minutesAway);
  
  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
	console.log("Next Arrival: " + nextArrival);
	
	
  //Adding into the table
  $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});