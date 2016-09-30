$(document).ready(function() {
    var login = {};
    $("#login").click(function() {
        login.id = $("#userid").val();
        login.password = $("#pass").val();
        console.log(login);
        $.post("/adminLogin", login,
            function(data, status) {
                console.log(data);
                if (typeof data.redirect === "string") {
                    // $(".loginForm").find(".alert-success").removeClass("hidden");
                    window.location = data.redirect;
                } else {
                    // $(".loginForm").find(".alert-danger").removeClass("hidden");
                }
            });
    });
});
