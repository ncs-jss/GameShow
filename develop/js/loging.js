$(document).ready(function() {
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
    var signup = {};
    var login = {};
    var modal = "";
    var toggled = false;
    $(".visibilityToggle").click(function() {
        var input = $(this).prev();
        if (!toggled) {
            input.attr('type', 'text');
            $(this).find(".fa-eye").addClass("hidden");
            $(this).find(".fa-eye-slash").removeClass("hidden");
            toggled = true;
        } else {
            input.attr('type', 'password');
            $(this).find(".fa-eye-slash").addClass("hidden");
            $(this).find(".fa-eye").removeClass("hidden");
            toggled = false;
        }
        input.trigger("focus");

    })

    function showError(elem) {
        var elem = elem.find(".notifBox .notif-error");
        elem.removeClass("hidden");
        elem.addClass("animated fadeOut");
        setTimeout(function() {
            elem.addClass("hidden");
        }, 1500);
    }
    $("#submit").click(function() {
        signup.email = $("#email").val();
        var remail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            rmobileNumber = new RegExp(/^[0-9]{1,10}$/),
            rreferenceNo = new RegExp(/^[a-z0-9]+$/i);
        signup.mobileNumber = $("#mob").val();
        signup.password = $("#password").val();
        signup.avatar = parseInt($(".avatarContainer input:checked").val());
        signup.name = $("#name").val();
        signup.year = $("#year").val();
        signup.referenceNo = $("#referenceNo").val();
        var cpassword = $("#cpassword").val();
        if (cpassword === signup.password && signup.email.match(remail) && signup.mobileNumber.match(rmobileNumber) && signup.referenceNo.match(rreferenceNo)) {
            $.post("/register", signup, function(data, status) {
                if (typeof data.redirect === "string") {
                    $("#signupmodal").find(".notifBox .notif-correct").removeClass("hidden");
                    window.location = data.redirect;
                } else {
                    showError($("#signupmodal"));
                }

            });
        } else {
            showError($("#signupmodal"));
        }
        /*
        var error = false;
        if (cpassword != signup.password || !cpassword || !signup.password) {
            error = "<strong>Passwords </strong>don't match";
        }
        else if (!signup.email.match(remail)) {
            error = "<strong>Email </strong>is incorrect";
        } 
        else {
            console.log('test');
            $.post("/register", signup, function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                if (typeof data.redirect === "string") {
                    $("#signupmodal").find(".notifBox .notif-correct").removeClass("hidden");
                    window.location = data.redirect;
                } else {
                    showError($("#signupmodal"));
                }
            });
        }
        if (error === false) {
            showError($("#signupmodal"), error);
        }
        */
    });
    $("#login").click(function() {
        $("#emailOrNumber").val("9911502984");
        $("#pass").val("a");
        login.emailOrNumber = $("#emailOrNumber").val();
        login.password = $("#pass").val();
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
    $(".checkModal1").click(function() {
        modal = $("#submit");
    });
    $(".checkModal2").click(function() {
        modal = $("#login");
    });
    $(document).keydown(function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            if (modal) {
                modal.trigger('click');
            }
        }
    });
});
