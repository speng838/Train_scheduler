var config = {
    apiKey: "AIzaSyB7dY0EtexmSDTyfY2UuemlZ8rozJWr62Q",
    authDomain: "homework7-ceda3.firebaseapp.com",
    databaseURL: "https://homework7-ceda3.firebaseio.com",
    projectId: "homework7-ceda3",
    storageBucket: "homework7-ceda3.appspot.com",
    messagingSenderId: "647666376719"
  };

firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var trainDestination;
var trainFirstTrainTime;
var trainFrequency
$("#add-train-btn").on("click", function(event){
event.preventDefault();

trainName = $("#train-name-input").val().trim();
trainDestination = $("#destination-input").val().trim();
trainFirstTrainTime = $("#first-train-time-input").val().trim();
trainFrequency = $("#frequency-input").val().trim();


var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainFirstTrainTime,
    frequency: trainFrequency

};

database.ref().push(newTrain);

alert("Train schedule successfully added");

$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-time-input").val("");
$("#frequency-input").val("");

});

var firstTime;
var firstFormat
var convertedTime;
var minutesAway
var currentTime;
//var diffTime;
var tRemainder;
var tMinutesTillTrain;
var nextTrain;
var newRow

database.ref().on("child_added", function(childSnapshot) {

trainName  = childSnapshot.val().name;
trainDestination = childSnapshot.val().destination;
trainFirstTrainTime = childSnapshot.val().time;
trainFrequency = childSnapshot.val().frequency;



firstTime = trainFirstTrainTime;
firstFormat = "hh:mm";
firstTimeConverted = moment(firstTime,firstFormat).subtract(1, "years");


currentTime = moment();

var diffTime = moment().diff(moment(firstTimeConverted),"minutes");


tRemainder = diffTime % trainFrequency;

tMinutesTillTrain = trainFrequency - tRemainder;

nextTrain = moment().add(tMinutesTillTrain, "minutes");

newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(tMinutesTillTrain)
  );

  $("#train-table > tbody").append(newRow);

});
