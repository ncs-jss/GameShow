$(document).ready(function() {
    $('.genBtn').click(function(){
        $.post("/generateReference",{email_ID : $(".emailId").val()}, function(data) {
            $('.referenceId').html(data.id);
        });
    });
});
