$(document).ready(function () {
    $("#btn-to-top").click(function() {
        $("body, html").animate({scrollTop: 0}, 1100);
    })

    $("a").click(function () {
        var elementClick = $(this).attr("href");
        var coordinates = $(elementClick).offset();
        var destination = $(elementClick).offset().top - $(elementClick).height()/2;
        
        $("body, html").animate({ scrollTop: destination }, 1100);
        
        return false; 
    });

    $(window).scroll(function() {
        if($(this).scrollTop() > 250) {
            $("#btn-to-top").fadeIn();      
        } else {
            $("#btn-to-top").fadeOut();
        }
    });

    $("#btn-to-top").hover(
        function() {
            $(this)
                .css("background-color", "rgba(255,255,255,0.25)")
                .css("transition", "1s");
        },
        function() {
            $(this)
                .css("background-color", "transparent")
                .css("transition", "1s");
        }, 
    );
});



//   position: fixed;     cursor: pointer;