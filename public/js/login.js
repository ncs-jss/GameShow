$(document).ready(function() {
    var signup = {};
    var login = {};
    $("#submit").click(function() {
        signup.name = $("#name").val();
        signup.email = $("#email").val();
        signup.mob = $("#mob").val();
        signup.referenceNo = $("#referenceNo").val();
        signup.password = $("#password").val();
        var cpassword = $("#cpassword").val();
        signup.course = $("#course").val();
        signup.year = $("#year").val();
        // console.log(signup);
        if (cpassword === signup.password) {
            $.post("http://localhost:8080/register", signup,
                function(data, status) {
                    console.log("Data: " + data + "\nStatus: " + status);
                });
        }
    });
    $("#login").click(function() {
        login.email = $("#email").val();
        login.password = $("#password").val();
        $.post("http://localhost:8080/login", login,
            function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
            });
    });
});
