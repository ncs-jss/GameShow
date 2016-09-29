$(document).ready(function() {
    $.get("http://localhost:8080/leaderboard", function(data) {
        console.log(data);
        var openHtml = '<tr>';
        var closeHtml = '<td><div class="btn-group btn-justified pull-right"><button class="btn btn-success">View</button><button class="btn btn-danger">Delete</button></div></td></tr>';
        for (var i = 0,
                var l = data.length; i < l; i++) {
            // var allHtml = $(".questionList").html();
            var allHtml = '';
            $.each(data[i], function(key, value) {
                allHtml += '<td>' + value + '</td>';
            });
            allHtml = openHtml + allHtml + closeHtml;
            $(".questionList").append(allHtml);
        }
    });
    // $('.addQuesBtn').click(function() {
    //     ques.question = $(".question").val();
    // });
})
