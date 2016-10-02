$(document).ready(function() {
    $.get("/leaderboard", function(data) {
        console.log(data);
        var openHtml = '<tr>';
        var closeHtml = '</tr>';
        var allHtml;
        var j;
        for (var i = 0, l = data.length; i < l; i++) {
            j = i + 1;
            allHtml = '';
            allHtml += '<td class="table-img"><img src="img/' + data[i].avatar + '.png"></td>\n';
            allHtml += '<td class="pad"><span class="table-name text-right">' + data[i].name + '</span><br><span class="table-id text-right">' + data[i].email_ID + '</span></td>';

            allHtml += '<td class="table-score"><span>' + data[i].score + '</span></td>\n';
            allHtml = openHtml + allHtml + closeHtml;
            $(".userList").append(allHtml);
        }
    });
});
