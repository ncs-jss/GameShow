$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $.get("/getQuestion", function(data) {
        if (data.valid == 0) {
            window.location = data.redirect;
        } else {
            setTimeout(function() {
                $(".ques p").addClass("animated fadeIn");
                $(".ques p").html(data.question);

            }, 600);




            $.get("/user", function(data) {
                localStorage.setItem('userdata', JSON.stringify(data));
                console.log(data);

                $.get("/totalLevel", function(maxLevel) {
                    localStorage.setItem('totalLevel', JSON.stringify(maxLevel));
                    console.log(data);
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
                console.log(badges);
                // badges = [2,3];
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
                console.log(badges);
                $.each(badges, function(key, value) {
                    console.log(value);
                    key += 1;
                    imgpath = "/img/badges/" + value.name + ".png";
                    elem = ".badges:nth-child(" + key + ")";
                    console.log(elem);
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
            $("#world").removeClass("hidden");
            if (data.valid == 1) {
                $(".notifBox").find(".notif-correct").removeClass("hidden");
                // $("#world").removeClass("hidden");
                setTimeout(function() {
                    window.location = data.redirect;
                }, 3000);
            } else {
                console.log($(".notifBox").find(".notif-error"));
                $(".notifBox").find(".notif-error").removeClass("hidden");
                setTimeout(function() {
                    $(".notifBox").find(".notif-error").addClass("animated fadeOut");
                    $(".notifBox").find(".notif-error").addClass("hidden");
                }, 2500);
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
