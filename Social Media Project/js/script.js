$(document).ready(function () {

    // navbar stuff

    let activeNow = $('.active-nav-item');

    var tlm = new TimelineMax({ paused: true });
    tlm.to(".collapse-icon", { duration: 0.5, rotation: 90 });

    $('.nav-res-btn').click(function (e) {
        if ($(this).hasClass("unclickable")) {
            e.preventDefault();
        }
        else {
            $('.nav-res-btn').addClass("unclickable");
            if (tlm.progress() === 0) {
                tlm.play();
            }
            if (tlm.progress() === 1) {
                tlm.reverse();
            }
            $('.navigation').stop(true, true).slideToggle();
            setTimeout(function () {
                $('.nav-res-btn').removeClass("unclickable");
            }, 500);
        }
    });

    $(window).on('resize', function () {
        var win = $(this);
        if (win.width() > 500) {
            $('.navigation').css("display", "flex")
            if (tlm.progress() === 1) {
                tlm.reverse();
            }
        }
        else {
            $('.navigation,.notification-dropdown,.triangle').css("display", "none");
            if($('.notification').parent().hasClass('active-nav-item')){
                $('.notification').parent().removeClass('active-nav-item');
                activeNow.addClass('active-nav-item');
            }   
        }
    });

    // $('.search-bar .search-field-wrapper .search-results-list .search-results-item .result-wrapper .text .name').each(function(){
    //     if($(this).text().length>28){
    //         $(this).text($(this).text().substr(0,25)+"...");
    //     }
    // });

    $('#nav-search').keyup(function () {
        if ($(this).val().length > 0) {
            $('.clear-icon').fadeIn(100);
        }
        else {
            $('.clear-icon').fadeOut(100);
        }
    });

    $('#nav-search').focus(function () {
        if($('.notification').parent().hasClass('active-nav-item')){
            $('.notification-dropdown, .triangle').hide();
            $('.notification').parent().removeClass('active-nav-item');
            activeNow.addClass('active-nav-item');
        }   
    });

    $('#nav-search').keypress(function () {
        if ($(this).val().length > 0) {
            $('.clear-icon').fadeIn(100);
        }
        else {
            $('.clear-icon').fadeOut(100);
        }
    });

    $('.clear-icon').click(function () {
        $('#nav-search').val("");
        $('#nav-search').focusout();
        $(this).fadeOut(100);
    });

    let tll = new TimelineLite({
        paused: true
    });

    tll.from(".see-all-icon", { duration: 0.2, x: -8, opacity: 0 });

    $('.see-all').hover(function () {
        tll.play();
    }, function () {
        tll.reverse();
    });

    $('.notification').click(function (e) {
        if ($(window).width() > 500) {
            e.preventDefault();
            let parent = $(this).parent();
            if (!parent.hasClass('active-nav-item')) {
                activeNow.removeClass('active-nav-item');
                parent.addClass('active-nav-item');
                $('.notification-dropdown, .triangle').show();
            }
            else {
                activeNow.addClass('active-nav-item');
                parent.removeClass('active-nav-item');
                $('.notification-dropdown, .triangle').hide();
            }
        }
    });

    // main part

    // publish

    $('#publish').focus(function(){
        $('.close-publish,.hidden-preview,.publish-wrapper').show();
        $('.app-overlay').addClass('overlay-active');
    });

    $('.close-publish').click(function(){
        $('.close-publish,.hidden-preview,.publish-wrapper').hide();
        $('.app-overlay').removeClass('overlay-active');
    });
});