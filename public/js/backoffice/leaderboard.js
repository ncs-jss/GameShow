$(document).ready(function() {
    $.get("/leaderBoard", function(data) {
        console.log(data);
        var openHtml = '<tr>';
        var closeHtml = '<td><div class="btn-group btn-justified pull-right"><button class="btn btn-success">Edit</button><button class="btn btn-danger deleteQuesBtn">Delete</button></div></td></tr>';
        var allHtml;
        var j;
        for (var i = 0, l = data.length; i < l; i++) {
            j = i + 1;
            allHtml = '';
            allHtml += '<td>' + j + '</td>\n';
            allHtml += '<td>' + data[i].name + '</td>\n';
            allHtml += '<td>' + data[i].score + '</td>\n';
            allHtml += '<td>' + data[i].level + '</td>\n';
            allHtml += '<td>' + data[i].year + '</td>\n';

            allHtml = openHtml + allHtml + closeHtml;
            $(".userList").append(allHtml);
            document.querySelectorAll(".userList .deleteQuesBtn")[i].dataset.id = data[i]._id;
        }
        // Delete feature
        $('.deleteQuesBtn').click(function() {
            var user_ID = $(this)[0].dataset.id;
            console.log(user_ID);
            $.post("/removeQuestion", { user_ID: user_ID }, function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                location.reload();
            });
        });
    });
});
