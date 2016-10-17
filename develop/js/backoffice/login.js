$(document).ready(function() {
    var login = {};
    $("#login").click(function() {
        // $("#userid").val("ncsncs12");
        // $("#pass").val("GameShow");
        login.id = $("#userid").val();
        login.password = $("#pass").val();
        console.log(login);
        $.post("/adminLogin", login, function(data, status) {
            console.log(data);
            if (typeof data.redirect === "string") {
                // $(".loginForm").find(".alert-success").removeClass("hidden");
                window.location = data.redirect;
            } else {
                // $(".loginForm").find(".alert-danger").removeClass("hidden");
            }
        });
    });
    $(document).keydown(function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $("#login").trigger('click');
        }
    });
});
