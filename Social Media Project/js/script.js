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
            if ($('.notification').parent().hasClass('active-nav-item')) {
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
        if ($('.notification').parent().hasClass('active-nav-item')) {
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

    $('#publish').keyup(function () {
        if ($(this).val() == "") {
            if ($('#publish-input').val() == "" && $('#link').val() == "") {
                $('.publish-button').attr("disabled", true);
                $('.publish-button').css('opacity', '0.4');
            }
        }
        else {
            $('.publish-button').removeAttr("disabled");
            $('.publish-button').css('opacity', '1');
        }
    });

    $('#link').keyup(function () {
        if ($(this).val() == "") {
            if ($('#publish-input').val() == "" && $('#publish').val() == "") {
                $('.publish-button').attr("disabled", true);
                $('.publish-button').css('opacity', '0.4');
            }
        }
        else {
            $('.publish-button').removeAttr("disabled");
            $('.publish-button').css('opacity', '1');
        }
    });

    $('#publish').focus(function () {
        $('.close-publish,.hidden-preview,.publish-wrapper').show();
        $('.app-overlay').addClass('overlay-active');
    });

    $('.compose-option').click(function () {
        $('.close-publish,.hidden-preview,.publish-wrapper').show();
        $('.app-overlay').addClass('overlay-active');
    });

    $('.location-option').click(function () {
        $('.close-publish,.hidden-preview,.publish-wrapper,.location-suboption').show();
        $('.app-overlay').addClass('overlay-active');
    });

    $('.location-suboption .location-wrapper .close-icon').click(function () {
        $('.location-suboption').hide();
    });

    $('.link-option').click(function () {
        $('.close-publish,.hidden-preview,.publish-wrapper,.link-suboption').show();
        $('.app-overlay').addClass('overlay-active');
    });

    $('.link-suboption .link-wrapper .close-icon').click(function () {
        $('.link-suboption').hide();
    });

    $('.tag-option').click(function () {
        $('.close-publish,.hidden-preview,.publish-wrapper,.tag-suboption').show();
        $('.app-overlay').addClass('overlay-active');
        $('.js-example-basic-multiple').select2({
            placeholder: '@ Tag your friends'
        });
    });

    $('.tag-suboption .tag-wrapper .close-icon').click(function () {
        $('.tag-suboption').hide();
    });

    $('.close-publish').click(function () {
        $('.close-publish,.hidden-preview,.publish-wrapper,.location-suboption,.link-suboption,.tag-suboption').hide();
        $('.app-overlay').removeClass('overlay-active');
    });

    $('.publish-owl-carousel').owlCarousel({
        items: 1,
        dots: true
    });

    $('#publish-input').change(function (ev) {
        let owlLength = $('.publish-owl-carousel .item').length;
        for (let i = 0; i < owlLength; i++) {
            $(".publish-owl-carousel").trigger('remove.owl.carousel', [i]).trigger('refresh.owl.carousel');
        }
        upload(ev.target.files);
        if ($(this).val() != "") {
            $('.preview-wrapper h6').hide();
            $('.hidden-preview .publish-remove').show();
            $('.publish-button').removeAttr("disabled");
            $('.publish-button').css('opacity', '1');
        }
        else {
            $('.preview-wrapper').show();
        }
    });

    $('.hidden-preview .publish-remove').click(function () {
        $('#publish-input').val(null);
        if ($('#publish').val() != "" || $('#link').val() != "") {
            $('.publish-button').removeAttr("disabled");
            $('.publish-button').css('opacity', '1');
        }
        if ($('#publish').val() == "" && $('#link').val() == "") {
            $('.publish-button').attr("disabled", true);
            $('.publish-button').css('opacity', '0.4');
        }
        let owlLength = $('.publish-owl-carousel .item').length;
        for (let i = 0; i < owlLength; i++) {
            $(".publish-owl-carousel").trigger('remove.owl.carousel', [i]).trigger('refresh.owl.carousel');
        }
        $(this).hide();
        $('.preview-wrapper h6').show();
    });

    function upload(files) {
        for (let file of files) {
            let reader = new FileReader();
            reader.onloadend = function (ev) {
                let owlItem = $("<div>").addClass('item');
                let imgPreview = $("<div>").addClass('image-preview');
                let img = $("<img>").attr("src", ev.target.result);
                imgPreview.append(img);
                owlItem.append(imgPreview);
                $('.publish-owl-carousel').trigger('add.owl.carousel', [owlItem]).trigger('refresh.owl.carousel');
            }
            reader.readAsDataURL(file);
        }
    }

    // posts

    $('.prelike,.prebookmark').click(function () {
        $(this).next().show();
        $(this).hide();
    });

    $('.liked, .bookmarked').click(function () {
        $(this).prev().show();
        $(this).hide();
    });

    $('.post-owl-carousel').owlCarousel({
        items: 1,
        dots: true
    });

    // login

    $('#login-password-input').keyup(function () {
        if ($(this).val().length > 0) {
            $('.vision-icon').fadeIn(100);
        }
        else {
            $('.vision-icon').fadeOut(100);
        }
    });

    $('#login-password-input').keypress(function () {
        if ($(this).val().length > 0) {
            $('.vision-icon').fadeIn(100);
        }
        else {
            $('.vision-icon').fadeOut(100);
        }
    });

    $('.vision-icon').click(function () {
        $(this).hide();
        $('.locked-icon').hide();
        $('.vision-on-icon, .unlocked-icon').show();
        $('#login-password-input').prop('type', 'text');
    });

    $('.vision-on-icon').click(function () {
        $(this).hide();
        $('.unlocked-icon').hide();
        $('.vision-icon, .locked-icon').show();
        $('#login-password-input').prop('type', 'password');
    });

    // register

    $('.progress-wrap .dot').on('click', function () {
        var $this = $(this);
        var stepValue = $this.attr('data-step');
        $this.closest('.progress-wrap').find('.bar').css('width', stepValue + '%');
        $this.siblings('.dot').removeClass('is-current');
        $this.addClass('is-active is-current');
        $this.prevAll('.dot').addClass('is-active');
        $this.nextAll('.dot').removeClass('is-active');
        $('.process-panel-wrap').removeClass('is-active');
        $('.step-title').removeClass('is-active');

        if (stepValue == '0') {
            $('#signup-panel-1, #step-title-1').addClass('is-active');
        } else if (stepValue == '100') {
            $('#signup-panel-2, #step-title-2').addClass('is-active');
        }
    });

    $('.process-button').on('click', function () {
        var $this = $(this);
        var targetStepDot = $this.attr('data-step');
        $('#' + targetStepDot).trigger('click');
    });

    $('#reg-password-input').keyup(function () {
        if ($(this).val().length > 0) {
            $('.reg-vision-icon').fadeIn(100);
        }
        else {
            $('.reg-vision-icon').fadeOut(100);
        }
    });

    $('#reg-password-input').keypress(function () {
        if ($(this).val().length > 0) {
            $('.reg-vision-icon').fadeIn(100);
        }
        else {
            $('.reg-vision-icon').fadeOut(100);
        }
    });

    $('.reg-vision-icon').click(function () {
        $(this).hide();
        $('.reg-vision-on-icon').show();
        $('#reg-password-input').prop('type', 'text');
    });

    $('.reg-vision-on-icon').click(function () {
        $(this).hide();
        $('.reg-vision-icon').show();
        $('#reg-password-input').prop('type', 'password');
    });

    $('#reg-confirm-pass,#set-confirm-pass').on("cut copy paste", function (e) {
        e.preventDefault();
    });

    // profile

    $('.pd-collapse-button').click(function () {
        $(this).next().toggleClass('pd-menu-active');
    });

    $('.post-dropdown .button').click(function () {
        $(this).next().toggleClass('post-dropdown-active');
    });

    $('.profile-dropdown .profile-dropdown-button').click(function () {
        $(this).next().toggleClass('profile-dropdown-active');
    });

    $('.comment-dropdown .comment-dropdown-button').click(function () {
        $(this).next().toggleClass('comment-dropdown-active');
    });

    // modals

    $('#comment-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        let commentId = button.data('commentid');
        let modal = $(this);
        modal.find('.cm-send').attr('data-commentid', commentId);
    });

    $('#post-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        let postId = button.data('postid');
        let modal = $(this);
        modal.find('.pm-send').attr('data-postid', postId);
    });

    $('#user-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        let userId = button.data('userid');
        let modal = $(this);
        modal.find('.um-send').attr('data-userid', userId);
    });

    // settings

    $('.cover-upload-trigger').click(function () {
        $('#cover-input').click();
    });   

    $('#cover-input').change(function (ev) {
        coverUpload(ev.target.files);
        $('#cover-modal').modal('hide');
    });

    function coverUpload(files) {
        for (let file of files) {
            let reader = new FileReader();
            reader.onloadend = function (ev) {
                let img = $("<img>").attr("src", ev.target.result);
                $('.settings-form-wrapper .profile-preview .profile-cover-wrapper').empty();
                $('.settings-form-wrapper .profile-preview .profile-cover-wrapper').append(img);
            }
            reader.readAsDataURL(file);
        }
    }

    $('.avatar-upload-trigger').click(function () {
        $('#avatar-input').click();
    });

    $('#avatar-input').change(function (ev) {
        avatarUpload(ev.target.files);
        $('#avatar-modal').modal('hide');
    });

    function avatarUpload(files) {
        for (let file of files) {
            let reader = new FileReader();
            reader.onloadend = function (ev) {
                let img = $("<img>").attr("src", ev.target.result);
                $('.settings-form-wrapper .profile-preview .avatar-wrapper').empty();
                $('.settings-form-wrapper .profile-preview .avatar-wrapper').append(img);
            }
            reader.readAsDataURL(file);
        }
    }
});