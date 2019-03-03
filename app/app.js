var appUsers = {};

function showUsers() {
    $(".wrapper").html("");
    $.each(appUsers, function (idx, user) {
        $(".wrapper").append(`<div>
        <p>Thanks for registering!</p>
        <p>Here is your info:</p>
        <p>First Name: ${user.fName}</p>
        <p>Last Name: ${user.lName}</p>
        <p>Email: ${user.email}</p>
        <p>Twitter: ${user.twitter}</p>
        </div>`)
    })
}

function initListeners() {

    $("#submit").click(function (e) {
        //need to prevent the button from reloading page
        e.preventDefault();
        // console.log('success');

        //    need to make sure data is structured the same as json before pushing
        if ($("#fName").val() == "" || $("#lName").val() == "" || $("#email").val() == "" || $("#twitter").val() == "") {
            $(".wrapper").html("Please fill out all fields.");
        } else {
            let userObj = {
                "fName": $("#fName").val(),
                "lName": $("#lName").val(),
                "email": $("#email").val(),
                "twitter": $("#twitter").val()
            };

            appUsers.splice(0,1);
            appUsers.push(userObj);
            showUsers();
        }

    });

    $("#submit").attr("disabled", false);
}

function loadData() {
    $.getJSON('data/data.json', function (data) {
        console.log(data);
        appUsers = data.Users;
        initListeners();
    });
}

$(document).ready(function () {
    loadData();
});

// {
//     "fName": "Maria",
//     "lName": "Leichty",
//     "email": "ts@ts.com",
//     "twitter": "@Leichty4"
// }