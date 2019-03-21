function initlisteners() {
    $("#home").click(function () {
        var sectionContent = SERVER.getSection("home");
        $('.wrapper').html(sectionContent);
        sectionListeners();
    });

    $("#about").click(function () {
        var sectionContent = SERVER.getSection("about");
        $('.wrapper').html(sectionContent);
    });

    $("#register").click(function () {
        var sectionContent = SERVER.getSection("register");
        $('.wrapper').html(sectionContent);
        sectionListeners();
    });

    $("#users").click(function () {
        $('.wrapper').html("<h1 style='text-align: center; padding-top: 120px;'>Here are the current users and their information:</h1>");

        var allUsers = SERVER.getAllUsers();

        $.each(allUsers, function (idx, user) {
            $(".wrapper").append(`<div style="text-align: center; padding-top: 20px;">
            <p>First Name: ${user.fName}</p>
            <p>Last Name: ${user.lName}</p>
            <p>Email: ${user.email}</p>
            <p>Twitter: ${user.twitter}</p>
            <p></p>
            </div>`)
        });
    });
}

function sectionListeners() {
    $("#loginbody").click(function () {
        var sectionContent = SERVER.getSection("register");
        $('.wrapper').html(sectionContent);
        sectionListeners();
    });

    $("#submit").attr("disabled", false);

    $("#submit").click(function (e) {
        e.preventDefault();
        // console.log('success');

        if ($("#fName").val() == "" || $("#lName").val() == "" || $("#email").val() == "" || $("#twitter").val() == "") {
            $(".wrapper").append("<h3 style='text-align: center;'>Please fill out all fields.</h3>");
        } else {
            showModal();
            var userObj = SERVER.addUser();
            var message = "<h1 style='text-align: center; padding-top: 120px;'>Thanks for registering, " + userObj.fName + ".</h1>";
            $('.wrapper').html(message);
            // console.log(userObj);
            // would I need to do a callback here?
            hideModal();
        }
    });
}

function serverCallBack(result) {
    console.log(result);
    var sectionData = SERVER.getSection("home");
    $('.wrapper').html(sectionData);
    console.log("After Data");
    //need to put initlisteners after load data which was in server
    initlisteners();
    //need to add this so 'sign up' button works on home page
    sectionListeners();
    //once have listeners then can hide load screen
    hideModal();
}

function showModal() {
    $('.modal').removeClass("toggle");
    $('.modal').html("Please wait while we get you registered.");
}

function hideModal(){
    $('.modal').addClass("toggle");
}

$(document).ready(function () {
    console.log("Before Data");
    SERVER.loadData(serverCallBack);
});