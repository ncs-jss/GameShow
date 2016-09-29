$(document).ready(function() {
    $('.genBtn').click(function(){
        $.get("http://localhost:8080/generateReference", function(data) {
            $('.referenceId').html(data.id);
        });
    });
});
