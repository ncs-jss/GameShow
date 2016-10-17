$(document).ready(function() {
    /*
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
    */
    function showReceipts(receiptData) {
        if (receiptData.valid == 1) {
            $.each(receiptData.data, function(key, value) {
                var html = '<div class="i-card"><div class="content"><p>Trek-Reg-ID : <strong>'+ value.trekreg_ID+'</strong></p><p>Email : <strong>'+ value.email_ID+'</strong></p><p>Reference Id : <strong>'+ value.referenceNumber+'</strong></p></div><div class="logo"><img src="/img/ttlogo_new.png"><p style="flex-basis:100%;font-size:9px;margin:5px 0"><strong>NCS</strong><br>techtrek.hackncs.com</p><p>Fee : <strong>Rs. 20/- Paid.</strong></p></div></div>';
                $(".receipt-container").append(html);
            });
        }
        $(".receipt-container").removeClass("hidden");
        window.print();
    }

    function fetchId(data) {
        data = JSON.stringify(data);
        console.log("this is happening1");
        $.post("/generateMultipleReference", { "users" : data }, function(receiptData) {
            console.log(receiptData);
            showReceipts(receiptData);
        });
    }
    JsonObj = null;

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        f = files[0];
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                JsonObj = JSON.parse(e.target.result);
                fetchId(JsonObj);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
    document.querySelector('.jsonFile').addEventListener('change', handleFileSelect, false);
});
