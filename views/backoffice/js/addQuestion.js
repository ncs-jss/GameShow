$(document).ready(function() {
    var ques = {};
    $('.addQuesBtn').click(function() {
        ques.question = $(".question").val();
        ques.level = $(".level").val();
        ques.techAnswer = $(".techAnswer").val();
        ques.nonTechAnswer = $(".nonTechAnswer").val();
        ques.hint = $(".hint").val();

        $.post("http://localhost:8080/addQuestion", ques,
            function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
            });
    });
});
