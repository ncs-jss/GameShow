$(document).ready(function() {
    $.get("http://localhost:8080/getAllQuestion", function(data) {
        console.log(data);
        var openHtml = '<tr>';
        var closeHtml = '<td><div class="btn-group btn-justified pull-right"><button class="btn btn-success">Edit</button><button class="btn btn-danger deleteQuesBtn">Delete</button></div></td></tr>';
        var allHtml;
        for (var i = 0, l = data.length; i < l; i++) {
            allHtml = '';
            $.each(data[i], function(key, value) {
                if (key != "id") {
                    allHtml += '<td>' + value + '</td>\n';
                }
            });
            allHtml = openHtml + allHtml + closeHtml;
            $(".questionList").append(allHtml);
        }
    });
    // Delete feature
    $('.deleteQuesBtn').click(function() {
        var question_ID = $(this).
        $.post("http://localhost:8080/removeQuestion", question_ID, function(data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        });
    });
});
