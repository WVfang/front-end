$(document).ready(function () {
    $("#btn-to-top").click(function() {
        $("body, html").animate({scrollTop: 0}, 1100);
    })

    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $("#btn-to-top").fadeIn();   
        } else {
            console.log("scrolling-detected");
            $("#btn-to-top").fadeOut();
        }
    }); 

    $("a").click(function () {
        var elementClick = $(this).attr("href");
        var coordinates = $(elementClick).offset();
        var destination = $(elementClick).offset().top - $(elementClick).height()/2;
        
        $("body, html").animate({ scrollTop: destination }, 1100);
        
        return false; 
    }); 
});

