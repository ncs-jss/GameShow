$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    var wrongNotifs = [
        "Your key didn't opened the door!",
        "Be like Bill and just do it!",
        "Server says... it's wrong.",
        "Use the force! Luke. ",
        "Boom!.. But incorrect :P",
        "Our Alien couldn't digest your answer.",
        "Remember.. google is there for help.",
        "Sorry dude...",
        "Keep trying. You can do it!!",
        "Just don't bang your head on wall :P",
        "Cmon' let's give it another shot",
        "String didn't matched.",
        "Whoops! couldn't launch the next question."
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
                $("#circle-1").removeClass("hidden");
                $("#circle-1 .text").html(data.score);
                $(".userName").html(data.name.split(" ")[0] + "'s DashBoard");
                $(".levelText .level strong").html(data.level);
                $(".levelText .score strong").html(data.score);
                $(".avatarBox input").val(data.avatar);
                var badges = data.badges;
                console.log(badges);
                var imgpath = "";
                var elem = "";
                badges.sort(function(a, b) {
                    if (a.level > b.level) {
                        return -1;
                    }
                    if (a.level < b.level) {
                        return +1;
                    }
                    // a must be equal to b
                    return 0;
                });
                $.each(badges, function(key, value) {
                    // key += 1;
                    imgpath = "/img/badges/" + value.name + ".png";
                    // elem = ".badges:nth-child(" + key + ")";
                    elem = ".badges:eq(" + key + ")";
                    console.log($(elem));
                    $(elem + " img").attr("src", imgpath);
                    $(elem).tooltip().attr("data-original-title", value.name);
                    $(elem + " p").html("Level " + value.level);
                });
            });
        }
    });
    $(".submit_btn button").click(function() {
        $.post("/checkAnswer", { answer: $(".ans input").val() }, function(data) {
            console.log(data);
            if (data.valid == 1) {
                $(".notifBox").find(".notif-correct").removeClass("hidden");
                $("#world").removeClass("hidden");
                $('#correct')[0].play();
                navigator.vibrate([1000, 500, 500]);
                setTimeout(function() {
                    window.location = data.redirect;
                }, 3000);
            } else {
                $(".notifBox").find(".notif-error").html(wrongNotifs[Math.random()*wrongNotifs.length >> 0]).removeClass("hidden");
                setTimeout(function() {
                    // $(".notifBox").find(".notif-error").addClass("animated fadeOut");
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


/*
["Your key didn't opened the door!",
"Be like Bill and just do it!",
"Server says... it's wrong.",
"Use the force! Luke. ",
"Boom!.. But incorrect :P",
"Don't worry.. keep trying and you can do it!",
"Our Alien couldn't digest your answer.",
"Remember.. google is there for help.",
"Sorry dude...",
"Keep trying. You can do it!!",
"Try try try..",
"Just don't bang your head on wall :P",
"Cmon' let's give another shot",
"String didn't matched.",
"Woops. couldn't launch the next question."]
*/
