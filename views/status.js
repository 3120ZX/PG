var empty = 3;
var searching = 2;
var occupied = 2;
var distancestatus1 = "green";
var distancestatus2 = "red";
var distancestatus3 = "green";
var distancestatus4 = "green";
var distancestatus5 = "red";
var status = "<%= status%>";

$(document).ready(function() {
    //distance Number
    $(".empty").text(empty);
    $(".searching").text(searching);
    $(".occupied").text(occupied);

    //Parking Spot
    if (distancestatus1 == "green") {
        $("#spot1").html("<img src='Resources/green.png' width='100%' height='100%'>");
    } else {
        $("#spot1").html("<img src='Resources/red.png' width='100%' height='100%'>");
    }

    if (distancestatus2 == "green") {
        $("#spot2").html("<img src='Resources/green.png' width='100%' height='100%'>");
    } else {
        $("#spot2").html("<img src='Resources/red.png' width='100%' height='100%'>");
    }

    if (distancestatus3 == "green") {
        $("#spot3").html("<img src='Resources/green.png' width='100%' height='100%'>");
    } else {
        $("#spot3").html("<img src='Resources/red.png' width='100%' height='100%'>");
    }

    if (distancestatus4 == "green") {
        $("#spot4").html("<img src='Resources/green.png' width='100%' height='100%'>");
    } else {
        $("#spot4").html("<img src='Resources/red.png' width='100%' height='100%'>");
    }

    if (distancestatus5 == "green") {
        $("#spot5").html("<img src='Resources/green.png' width='100%' height='100%'>");
    } else {
        $("#spot5").html("<img src='Resources/red.png' width='100%' height='100%'>");
    }
});
