$(document).ready(function() {
    var ques = {};
    $('.addQuesBtn').click(function() {
        ques.question = $(".question").val();
        ques.level = $(".level").val();
        ques.techAnswer = $(".techAnswer").val();
        ques.nonTechAnswer = $(".nonTechAnswer").val();
        ques.hint = $(".hint").val();
        $.post("/addQuestion", ques, function(data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            if(data === "data saved"){
                $(".alertBox .alert-success").removeClass("hidden");
                location.reload();                
            }else{
                $(".alertBox .alert-danger").removeClass("hidden");
            }
        });
    });
    $(document).keydown(function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $(".addQuesBtn").trigger("click");
        }
    });
});
