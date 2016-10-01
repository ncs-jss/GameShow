$(document).ready(function() {
    $('.dropdown-toggle').dropdown()
    new Circlebar({
        element: "#circle-1",
        type: "progress",
        maxValue: "72"
    });
});
