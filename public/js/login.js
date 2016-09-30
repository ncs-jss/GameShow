$(document).ready(function() {
    var signup = {};
    var login = {};
    /*Testing code
    $.get("http://localhost:8080/generateReference", function(data) {
        $("#referenceNo").val(data.id);
    });
    $.get("http://localhost:8080/getAllQuestion", function(data) {
        console.log(data);
    });
    */
    $("#submit").click(function() {
        signup.email = $("#email").val();
        signup.mobileNumber = $("#mob").val();
        signup.password = $("#password").val();
        signup.avatar = "";
        signup.name = $("#name").val();
        signup.year = $("#year").val();
        signup.referenceNo = $("#referenceNo").val();
        var cpassword = $("#cpassword").val();
        // console.log(signup);
        if (cpassword === signup.password) {
            $.post("/register", signup,
                function(data, status) {
                    console.log("Data: " + data + "\nStatus: " + status);
                    if (typeof data.redirect === "string") {
                        $("#signupmodal").find(".notifBox .notif-correct").removeClass("hidden");
                        window.location = data.redirect;
                    } else {
                        $("#signupmodal").find(".notifBox .notif-error").removeClass("hidden");
                    }

                });
        }
    });
    $("#login").click(function() {
        login.emailOrNumber = $("#emailOrNumber").val();
        login.password = $("#pass").val();
        console.log(login);
        $.post("/login", login,
            function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                if (typeof data.redirect === "string") {
                    $("#loginmodal").find(".notifBox .notif-correct").removeClass("hidden");
                    window.location = data.redirect;
                } else {
                    $("#loginmodal").find(".notifBox .notif-error").removeClass("hidden");
                }
            });
    });
});
