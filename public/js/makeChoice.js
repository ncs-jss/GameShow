$(document).ready(function() {
    $("a").click(function() {
        $.post("/makeChoice", function(data) {
            if (data.valid == 1) {
                window.location = data.redirect;
            }
        });
    });
});
