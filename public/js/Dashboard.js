$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
    $.get("/getQuestion", function(data) {
        $(".ques").html(data.question);

        $.get("/User", function(data) {
            new Circlebar({
                element: "#circle-1",
                type: "progress",
                maxValue: Math.floor(data.score/2)
            });
            $(".userName").html(data.name);
            $(".levelText h1 strong").html(data.level);
        });
    });
    $(".submit_btn").click(function() {
        $.post("/checkAnswer", { answer: $(".ans input").val() }, function(data) {
            console.log(data);
            if (data.valid) {
                $("#loginmodal").find(".notifBox .notif-correct").removeClass("hidden");
                location.reload();
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
