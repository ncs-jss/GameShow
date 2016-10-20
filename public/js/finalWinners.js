$(document).ready(function() {
    $("#audio")[0].load();
    $("#audio")[0].play();
    $("#audio")[0].volume = 0.6;
    $.get("/leaderboard", function(data) {
      console.log(data);
      for (var i = 0; i < 3; i++) {
        var elem = ".winnerbox:eq("+i+")";
        $(elem + " img").attr("src", "/img/avatars/"+data[i].avatar+".png");
        $(elem + " h3").html(data[i].name);
        $(elem + " h5").html(data[i].email_ID);
      }
    });
});
function mute() {
    if ($('#audio')[0].muted) {
        $('#audio')[0].muted = false;
        $(".toggleAudio").attr("src", "/img/speaker.png");
    } else {
        $('#audio')[0].muted = true;
        $(".toggleAudio").attr("src", "/img/mute.png");
    }
}