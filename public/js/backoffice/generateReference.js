$(document).ready(function() {
    $('.genBtn').click(function() {
        console.log('test');
        $.post("/generateReference", { email_ID: $(".emailId").val() }, function(data) {
            console.log(data);
            if (data.id) {
                $('.referenceId').html(data.id);
            } else {
                $('.referenceId').html("Email Already Registered");
            }
        });
    });
});
