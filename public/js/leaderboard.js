$(document).ready(function() {
    $.get("/leaderboard", function(data) {
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
                var badges = data[i].badges;
                var imgpath = "";
                var elem = "";
                if(badges.length > 0){
                   badges.sort(function(a, b) {
                       return b.level - a.level;
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
                }
            }
        });
    });
});