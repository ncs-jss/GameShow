$(document).ready(function() {
    $.get( "http://localhost:8080/", function( data ) {
      $( ".result" ).html( data );
      alert( "Load was performed." );
    });
    // $('.addQuesBtn').click(function() {
    //     ques.question = $(".question").val();
    // });
})
