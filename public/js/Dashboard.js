$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
    $.get("/getQuestion", function(data) {
        if (data.valid == 0) {
            window.location = data.redirect;
        } else {
            setTimeout(function() {
                $(".ques p").addClass("animated fadeIn");
                $(".ques p").html(data.question);

            }, 600);

            $.get("/user", function(data) {
                console.log(data);
                localStorage.setItem('data',JSON.stringify(data));
                new Circlebar({
                    element: "#circle-1",
                    type: "progress",
                    maxValue: parseInt(data.score / 2)
                });
                $(".userName").html(data.name.split(" ")[0] + "'s DashBoard");
                $(".levelText h1 strong").html(data.level);
                $(".avatarBox input").val(data.avatar);
            });
        }
    });
    $(".submit_btn button").click(function() {
        $.post("/checkAnswer", { answer: $(".ans input").val() }, function(data) {
            console.log(data);
            if (data.valid == 1) {
                console.log('test');
                $(".notifBox").find(".notif-correct").removeClass("hidden");
                setTimeout(function() {
                    window.location = data.redirect;
                }, 1000);
            } else {
                console.log('testi');
                console.log($(".notifBox").find(".notif-error"));
                $(".notifBox").find(".notif-error").removeClass("hidden");
                setTimeout(function() {
                    $(".notifBox").find(".notif-error").addClass("animated fadeIn");
                    $(".notifBox").find(".notif-error").addClass("hidden");
                }, 1000);
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
