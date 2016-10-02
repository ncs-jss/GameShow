$(document).ready(function() {
    console.log('test');
    $.get("/getAllQuestion", function(data) {
        console.log(data);
        var openHtml = '<tr>';
        var closeHtml = '<td><div class="pull-right"><button class="btn btn-danger deleteQuesBtn">Delete</button></div></td></tr>';
        // var closeHtml = '<td><div class="btn-group btn-justified pull-right"><button class="btn btn-success">Edit</button><button class="btn btn-danger deleteQuesBtn">Delete</button></div></td></tr>';
        var allHtml;
        var j;
        for (var i = 0, l = data.length; i < l; i++) {
            j = i + 1;
            allHtml = '';
            allHtml += '<td>' + j + '</td>\n';
            allHtml += '<td>' + data[i].question + '</td>\n';
            allHtml += '<td>' + data[i].technicalAnswer + '</td>\n';
            allHtml += '<td>' + data[i].nonTechnicalAnswer + '</td>\n';
            allHtml += '<td>' + data[i].hint + '</td>\n';
            allHtml += '<td>' + data[i].level + '</td>\n';

            allHtml = openHtml + allHtml + closeHtml;
            $(".questionList").append(allHtml);
            document.querySelectorAll(".questionList .deleteQuesBtn")[i].dataset.id = data[i]._id;
        }

        // Delete feature
        $('.deleteQuesBtn').click(function() {
            var question_ID = $(this)[0].dataset.id;
            console.log(question_ID);
            $.post("/removeQuestion", { question_ID: question_ID }, function(data, status) {
                location.reload();
            });
        });
    });
});
