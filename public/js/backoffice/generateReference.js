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
    function showReceipts(receiptData){
        if(receiptData.valid == 1){
            $.each(receiptData.data,function(key,value){
                console.log(value); 
            });
        }
        $(".receipt-container").removeClass("hidden");
    }
    function fetchId(data){
        data = JSON.stringify(data);
        console.log(data);
        $.post("/generateMultipleReference", { users: data }, function(receiptData) {
            console.log(receiptData);
            showReceipts(receiptData);
        });
    }
    JsonObj = null

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
    /*
        $('.jsonFile').change(function(){
            console.log('test');
            handleFileSelect();   
        });
    */
});
