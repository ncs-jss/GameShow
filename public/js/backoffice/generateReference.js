$(document).ready(function() {
    $('.genBtn').click(function(){
        $.get("/generateReference", function(data) {
            $('.referenceId').html(data.id);
        });
    });
});
