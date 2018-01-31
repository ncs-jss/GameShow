$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    var wrongNotifs = [
        "Your key didn't open the door!",
        "Be like Bill and just do it!",
        "Server says... it's wrong.",
        "Use the force! Luke. ",
        "Boom!.. But incorrect :P",
        "Our Alien couldn't digest your answer.",
        "Remember.. Google is there for help.",
        "Sorry dude...",
        "Keep trying. You can do it!!",
        "Just don't bang your head on wall :P",
        "C'mon let's give it another shot",
        "String didn't match.",
        "Whoops! couldn't launch the next question.",
        "Sherlock ignored your answer",
        "Still waiting to say hurray!!",
        "Mayday! Mayday! Unknown response!!",
        "Are you still knocking at the door? ",
        "Ahoy!! but you still missed it."
    ]
    $.get("/getQuestion", function(data) {
        if (data.valid == 0) {
            window.location = data.redirect;
        } else {
            setTimeout(function() {
                $(".ques p").addClass("animated fadeIn");
                $(".ques p").html(data.question);

            }, 600);

            $.get("/user", function(data) {
                $.get("/totalLevel", function(maxLevel) {
                    new Circlebar({
                        element: "#circle-1",
                        type: "progress",
                        maxValue: parseInt(((data.level - 1) * 100) / (maxLevel.maxLevel))
                    });
                });
                $("#circle-1 .text").html(data.score);
                $(".userName").html(data.name.split(" ")[0] + "'s DashBoard");
                $(".levelText .level strong").html(data.level);
                $(".levelText .score strong").html(data.score);
                $(".avatarBox input").val(data.avatar);
                var badges = data.badges;
                var imgpath = "";
                var elem = "";
                badges.sort(function(a, b) {
                    return b.level - a.level;
                });
                $.each(badges, function(key, value) {
                    imgpath = "/img/badges/" + value.name + ".png";
                    elem = ".badges:eq(" + key + ")";
                    $(elem + " img").attr("src", imgpath);
                    $(elem).tooltip().attr("data-original-title", value.name);
                    $(elem + " p").html("Level " + value.level);
                });
            });
        }
    });
    $(".submit_btn button").click(function() {
        $(".submit_btn button").prop("disabled", true);
        $.post("/checkAnswer", { answer: $(".ans input").val() }, function(data) {
            $(".ans input").trigger("blur");
            $(".submit_btn button").prop("disabled", false);
            if (data.valid == 1) {
                $(".notifBox").find(".notif-correct").removeClass("hidden");
                $("#world").removeClass("hidden");
                $('#correct')[0].play();
                navigator.vibrate([1000, 500, 500]);
                setTimeout(function() {
                    window.location = data.redirect;
                }, 3000);
            } else {
                $(".notifBox").find(".notif-error").html(wrongNotifs[Math.random() * wrongNotifs.length >> 0]).removeClass("hidden");
                setTimeout(function() {
                    $(".notifBox").find(".notif-error").addClass("hidden");
                }, 3500);
            }
        });
    });
    $(document).keydown(function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $(".submit_btn button").trigger("click");
        }
    });
});
