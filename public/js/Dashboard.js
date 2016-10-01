$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
    $.get("/getQuestion",function(data){
        console.log(data);
        new Circlebar({
            element: "#circle-1",
            type: "progress",
            maxValue: "72"
        });
        $(".ques").html();
    });
    $(".submit_btn").click(function(){
        $.post("/checkAnswer",{},function(){

        })
    });

});
