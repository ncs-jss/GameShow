$(document).ready(function() {
    $.get("/getAllQuestion", function(data) {
        console.log(data);
        var openHtml = '<tr>';
        var closeHtml = '<td><div class="btn-group btn-justified pull-right"><button class="btn btn-success">Edit</button><button class="btn btn-danger deleteQuesBtn">Delete</button></div></td></tr>';
        var allHtml;
        for (var i = 0, l = data.length; i < l; i++) {
            allHtml = '<td>' + i + '</td>\n';
            allHtml += '<td>' + data[i].question + '</td>\n';
            allHtml += '<td>' + data[i].technicalAnswer + '</td>\n';
            allHtml += '<td>' + data[i].nonTechnicalAnswer + '</td>\n';
            allHtml = openHtml + allHtml + closeHtml;
            $(".questionList").append(allHtml);
        }
    });
    // Delete feature
    $('.deleteQuesBtn').click(function() {
        var question_ID = $(this).
        $.post("/removeQuestion", question_ID, function(data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        });
    });
});
