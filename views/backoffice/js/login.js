// Admin Login
$(document).ready(function() {
    var login = {};
    $("#login").click(function() {
        login.email = $("#email").val();
        login.password = $("#pass").val();
        $.post("http://localhost:8080/login", login,function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
        });
    });
});