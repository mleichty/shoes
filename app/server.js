//turned server into a function
//executes itself by putting parentheses after
var SERVER = (function () {

    //create accessible variables
    var _allUsers = [];
    var _allSections = [];


    var _loadData = function (callback) {
        $.getJSON("data/data.json", function (data) {
            _allUsers = data.Users;
            _allSections = data.Sections;
            console.log("data");
            console.log(_allUsers);
            console.log(_allSections);
            //why is this a function? where is the string being passed to? app line 61
            return callback("success");
            //add comma to just show object info instead of concatonating
            // console.log("allSections ", _allUsers);
            // console.log("allSections ", _allSections);
        }).fail(function(error) {
            //how can I test this?
            console.log("Error:", error);
        });
    };

    //if want to access directly
    //this should be done in the app.js because this file shouldn't execute anything
    // _loadData();

    var _getSection = function (sectionYouWant) {
        let sec = {};
        $.each(_allSections, function (idx, section) {

            if (section.sectionName == sectionYouWant) {
                // console.log('section name', section.sectionName);
                sec = section.sectionContent;
            }
        });

        //need this outside loop
        return sec;
    };

    var _addUser = function() {
        let userObj = {
            "fName": $("#fName").val(),
            "lName": $("#lName").val(),
            "email": $("#email").val(),
            "twitter": $("#twitter").val()
        };

        // _allUsers.splice(0, 1);
        _allUsers.push(userObj);

        return userObj;
    };

    var _getAllUsers = function () {
        return _allUsers;
    };


    return {
        loadData: _loadData,
        getSection: _getSection,
        addUser: _addUser,
        getAllUsers: _getAllUsers
    }
})();