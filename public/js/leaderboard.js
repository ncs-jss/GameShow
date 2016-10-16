$(document).ready(function() {
    $.get("/leaderboard", function(data) {
        console.log(data);
        $.get("/user", function(userdata) {
            $(".userName").html(userdata.name);
            $(".avatarBox input").val(userdata.avatar);
            var allHtml;
            for (var i = 0, l = data.length; i < l; i++) {
                allHtml = '';
                allHtml += '<td class="table-img"><img src="img/avatars/' + data[i].avatar + '.png"></td>\n';
                allHtml += '<td class="pad"><span class="table-name text-right">' + data[i].name + '</span><br><span class="table-id text-right">' + data[i].email_ID + '</span></td>';
                allHtml += '<td class="table-score"><span>' + data[i].score + '</span></td>\n';
                allHtml = '<tr>' + allHtml + '</tr>';
                $(".userList").append(allHtml);
            }
        });
    });
});

// content: '<span><img src="img/badges/' + badges[i].avatar + '.png" > <img src="img/avatars/' + data[i].avatar + '.png"></span>'


/*
var badges = userdata.badges;
var imgpath = "";
var elem = "";
badges.sort(function(a, b) {
    if (a.level > b.level) {
        return -1;
    }
    if (a.level < b.level) {
        return +1;
    }
    // a must be equal to b
    return 0;
});
var badgeHtml = '';
$.each(badges, function(key, value) {
    badgeHtml += '<img src="/img/badges/' + value.name + '.png">';
});
$(".userList tr:eq(" + i + ")").popover({
    placement: 'bottom',
    trigger: 'hover',
    html: true,
    content: '<span>' + badgeHtml + '</span>'
});
*/
