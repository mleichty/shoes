//turned server into a function
//executes itself by putting parentheses after
var SERVER = (function () {

    //create accessible variables
    var _allUsers = [];
    var _allSections = [];


    var _loadData = function () {
        $.getJSON("data/data.json", function (data) {
            _allUsers = data.Users;
            _allSections = data.Sections;

            //add comma to just show object info instead of concatonating
            // console.log("allSections ", _allUsers);
            // console.log("allSections ", _allSections);
        });
    };

    //if want to access directly
    _loadData();

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
        getSection: _getSection,
        addUser: _addUser,
        getAllUsers: _getAllUsers
    }
})();