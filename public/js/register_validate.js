var valName = 1;
var valEmail = 1;
var valUser = 1;
var valMob = 1;
var valpassword = 1;
var valcpassword = 1;
var valyear = 1;
var signup = {};

function initRegister() {
    name();
    email();
    referenceNo();
    mob();
    passwordRegister();
    passwordConfirm();
    year();
}

// Name validation

$("#name").blur(function() {
    name();
});

// Email validation

$("#email").keyup(function() {
    email();
});

$("#email").blur(function() {
    email();
});


// referenceNo validation

$("#referenceNo").blur(function() {
    referenceNo();
});

// Mobile validation

$("#mob").blur(function() {
    mob();
});

//Password validation

$("#password").blur(function() {
    passwordRegister();

});

$("#cpassword").blur(function() {
    passwordConfirm();
});

$("#year").blur(function() {
    year();
})

$("#submit").click(function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var referenceNo = $("#referenceNo").val();
    var mob = $("#mob").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    var year = $("#year").val();

    initRegister();

    if (valName == 0 && valEmail == 0 && valUser == 0 && valMob == 0 && valpassword == 0 && valcpassword == 0 && valyear == 0) {
        signup.email = email;
        signup.mobileNumber = mob;
        signup.password = password;
        signup.avatar = parseInt($(".avatarContainer input:checked").val());
        signup.name = name;
        signup.year = year;
        signup.referenceNo = referenceNo;
        // console.log(signup);

        $.post("/register", signup,
            function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                console.log(data.comment);
                if (data.valid == 1) {
                    $("#signupmodal").find(".notifBox .notif-error").addClass("hidden");
                    $("#signupmodal").find(".notifBox .notif-correct").removeClass("hidden");
                    window.location = data.redirect;
                } else {
                    showError($("#signupmodal"),data.comment);
                }
            });
    } else {
        showError($("#signupmodal"),"Please Corrrect The Errors");
    }
});

function showNameError(txt) {
    $("#nameLabel span").remove("span");
    $("#name").css({ "outline": "none", "border-color": "red" });
    var txt1 = $("<span></span>").text(txt).css({ 'font-size': '8px', 'color': 'red', 'display': 'inline-block', "padding": "5px" });
    $("#nameLabel").append(txt1);
}

function showEmailError(txt) {
    $("#emailLabel span").remove("span");
    $("#email").css({ "outline": "none", "border-color": "red" });
    var txt1 = $("<span></span>").text(txt).css({ 'font-size': '8px', 'color': 'red', 'display': 'inline-block', "padding": "5px" });
    $("#emailLabel").append(txt1);
}

function showReferenceError(txt) {
    $("#referenceLabel span").remove("span");
    $("#referenceNo").css({ "outline": "none", "border-color": "red" });
    var txt1 = $("<span></span>").text(txt).css({ 'font-size': '8px', 'color': 'red', 'display': 'inline-block', "padding": "5px" });
    $("#referenceLabel").append(txt1);
}

function showMobError(txt) {
    $("#mobLabel span").remove("span");
    $("#mob").css({ "outline": "none", "border-color": "red" });
    var txt1 = $("<span></span>").text(txt).css({ 'font-size': '8px', 'color': 'red', 'display': 'inline-block', "padding": "5px" });
    $("#mobLabel").append(txt1);
}

function showPassErrorRegister(txt) {
    $("#passLabelRegister span").remove("span");
    $("#password").css({ "outline": "none", "border-color": "red" });
    var txt1 = $("<span></span>").text(txt).css({ 'font-size': '8px', 'color': 'red', 'display': 'inline-block', "padding": "5px" });
    $("#passLabelRegister").append(txt1);
}

function showPassErrorConfirm(txt) {
    $("#passLabelConfirm span").remove("span");
    $("#cpassword").css({ "outline": "none", "border-color": "red" });
    var txt1 = $("<span></span>").text(txt).css({ 'font-size': '8px', 'color': 'red', 'display': 'inline-block', "padding": "5px" });
    $("#passLabelConfirm").append(txt1);
}

function showYearError(txt) {
    $("#yearLabel span").remove("span");
    $("#year").css({ "outline": "none", "border-color": "red" });
    var txt1 = $("<span></span>").text(txt).css({ 'font-size': '8px', 'color': 'red', 'display': 'inline-block', "padding": "5px" });
    $("#yearLabel").append(txt1);
}


function name() {
    var name = $("#name").val();
    $("#nameLabel span").remove("span");
    if (name == "") {
        valName = 1;
        showNameError(" *Please input your name");
    } else {
        $("#name").css({ "outline": "none", "border-color": "white" });
        valName = 0;
    }
}

function email() {
    var val = $("#email").val();
    var ret = validate_email(val);
    $("#emailLabel span").remove("span");
    if (val == "") {
        valEmail = 1;
        showEmailError(" *Enter Your email address");
    } else if (!ret) {
        valEmail = 1;
        showEmailError(" *Invalid Email");
    } else {
        $("#email").css({ "outline": "none", "border-color": "white" });
        valEmail = 0;
    }
}

function referenceNo() {
    var val = $("#referenceNo").val();
    var re = /^\S+@/;

    $("#referenceLabel span").remove("span");
    if (val == "") {
        valUser = 1;
        showReferenceError(" *Enter Your referenceNo");
    } else if (re.test(val)) {
        valUser = 1;
        showReferenceError(" *Invalid referenceNo");
    } else {
        $("#referenceNo").css({ "outline": "none", "border-color": "white" });
        valUser = 0;
    }
}

function mob() {
    var mob = $("#mob").val();
    var re = /^[0-9]{10}$/;
    $("#mobLabel span").remove("span");
    if (mob == "") {
        valMob = 1;
        showMobError(" *Enter your mobile no.");
    } else if (!re.test(mob)) {
        valMob = 1;
        showMobError(" *Enter 10 digit mobile no.");
    } else {
        $("#mob").css({ "outline": "none", "border-color": "white" });
        valMob = 0;
    }
}

function passwordRegister() {
    var pass = $("#password").val();
    $("#passLabelRegister span").remove("span");
    if (pass == "") {
        valpassword = 1;
        showPassErrorRegister(" *Enter your password");
    } else {
        $("#password").css({ "outline": "none", "border-color": "white" });
        valpassword = 0;
    }
    passwordConfirm();
}

function passwordConfirm() {
    var pass = $("#password").val();
    var cpass = $("#cpassword").val();
    $("#passLabelConfirm span").remove("span");
    if (cpass == "") {
        valcpassword = 1;
        showPassErrorConfirm(" *Enter your confirm password");
    } else if (cpass != pass) {
        valcpassword = 1;
        showPassErrorConfirm(" *Password is not matched");
    } else {
        $("#cpassword").css({ "outline": "none", "border-color": "white" });
        valcpassword = 0;
    }
}

function year() {
    var year = $("#year").val();
    $("#yearLabel span").remove("span");
    if (year == "") {
        valyear = 1;
        showYearError(" *Please input your year");
    }
    else if(year <= 4 && year >=1 && year.indexOf(".")==-1) {
        $("#year").css({ "outline": "none", "border-color": "white" });
        valyear = 0;
    }
    else {
        valyear=1;
        showYearError(" *Please input correct year");
    }

}

function validate_email(val) {
    var re = /^\S+@\w+\.\w+$/;
    return re.test(val);
}