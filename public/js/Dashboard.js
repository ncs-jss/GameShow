$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
    $.get("/getQuestion", function(data) {
        if (data.redirect) {
            window.location = data.redirect;
        }

        setTimeout(function() {
            $(".ques p").addClass("animated");
            $(".ques p").addClass("fadeIn");
            $(".ques p").html(data.question);

        }, 600);

        $.get("/user", function(data) {
            console.log(data);
            new Circlebar({
                element: "#circle-1",
                type: "progress",
                maxValue: parseInt(data.score / 2)
            });
            $(".userName").html(data.name.split(" ")[0] + "'s DashBoard");
            $(".levelText h1 strong").html(data.level);
        });
    });
    $(".submit_btn").click(function() {
        $.post("/checkAnswer", { answer: $(".ans input").val() }, function(data) {
            console.log(data);
            if (data.valid) {
                $("#loginmodal").find(".notifBox .notif-correct").removeClass("hidden");
                setTimeout(function() {
                    window.location = data.redirect;
                }, 1000);
            } else {
                $("#loginmodal").find(".notifBox .notif-error").removeClass("hidden");
            }
        });
    });
    $(document).keydown(function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $(".submit_btn").trigger("click");
        }
    });

});
