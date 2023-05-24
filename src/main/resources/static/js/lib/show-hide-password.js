$(document).ready(function() {
    $("#showHidePassword button").on('click', function(event) {
        if($('#showHidePassword input').attr("type") === "text"){
            $('#showHidePassword input').attr('type', 'password');
            $('#showHidePassword i').addClass( "fa-eye-slash" );
            $('#showHidePassword i').removeClass( "fa-eye" );
        }else if($('#showHidePassword input').attr("type") === "password"){
            $('#showHidePassword input').attr('type', 'text');
            $('#showHidePassword i').removeClass( "fa-eye-slash" );
            $('#showHidePassword i').addClass( "fa-eye" );
        }
    });
});
