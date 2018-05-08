var initiated = false;

function init() {
    window.addEventListener('scroll', function (e) {
        if (initiated && $(window).scrollTop() <= -600) {
            $('.top-message').removeClass('hide');
            enableScroll(false, initialMove);
            console.log('aaa');
            initiated = false;
        } else if (0 < $(window).scrollTop() <= 100) {
            $('.top-message').addClass('hide');
        }
    });
    setTimeout(function () {
        $('.top-message').addClass('hide');
    }, 700)
    enableScroll(false, initialMove);
}

// show each message in 1200ms basis
var imgsL = ['./assets/img/imhealth.png', './assets/img/fg_mind_wshadow.png', './assets/img/fg_mind_wshadow.png', './assets/img/fg_mind_wshadow.png'];
var imgsR = ['./assets/img/imtech.png', './assets/img/fg_tech_wshadow.png', './assets/img/fg_care_wshadow.png', './assets/img/fg_isle_wshadow.png'];
var start = 0;
var initialMove = function () {
    if (!initiated) {
        initiated = true;
        if ($(window).scrollTop() < 100) {
            message = setInterval(function () {
                start++;
                $(".img-left").attr("src", imgsL[start]);
                $(".img-right").attr("src", imgsR[start]);
                if (start === 4) {
                    var logoTop = $('#mindisle-top').offset().top;
                    $('html,body').animate({ scrollTop: logoTop }, 1000, 'swing');
                    initiated = false;
                    clearInterval(message);
                    setTimeout(function () {
                        enableScroll(true);
                    }, 2200);
                }
            }, 1200)
        }
    }
}

// toggle enable or unenable scroll
function enableScroll(f, c) {
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    if (!f) {
        $(document).on(scroll_event, function (e) { e.preventDefault(); if (c) c(); });
        $(document).on('touchmove.noScroll', function (e) { e.preventDefault(); if (c) c(); });
    } else {
        $(document).off(scroll_event);
        $(document).off('.noScroll');
    }
}

$(function () {
    // force scroll Top
    setTimeout(function () {
        if ($(window).scrollTop() > 0) {
            $('html,body').animate({ scrollTop: $('#mindisle-top').offset().top }, '1');
            enableScroll(true);
        }
    }, 600);

    // smooth scroll in page link
    $('a[href^="#"]').click(function () {
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, 500, "swing");
        return false;
    });

    // get feedes from wantedly
    var feeds = [];
    $.post('https://wantedly-scraper.herokuapp.com/feeds/nmfiuh8fh2qblfiu20hfbwlnafan3ihvsn', null)
        .done(function (data) {
            feeds = data.feed;
            for (var i = 0; i < 4; i++) {
                $(`.article-link-${i}`).attr('href', feeds[i].link);
                $(`.article-img-${i}`).attr('src', feeds[i].cover);
                $(`.article-title-${i}`).html(feeds[i].title);
            }

        })
        .fail(function (err) {
            console.log(err);
        })

    $(window).scroll(function () {
        var docHeight = $(document).innerHeight();
        var windowHeight = $(window).innerHeight();
        var otherProjectTop = $('.other-project-page').offset().top;
        var scroll = $(window).scrollTop();
        if (scroll > otherProjectTop - 50) {
            enableScroll(false, hideOtherProjectTitle);
        } else if (scroll <= otherProjectTop) {
            $('.other-project-title').removeClass('hide');
            $('.other-project-cover').css('opacity', '0.5');
        }

        function hideOtherProjectTitle() {
            $('.other-project-title').addClass('hide');
            $('.other-project-cover').css('opacity', '0');
            setTimeout(function () { enableScroll(true) }, 1800);
        }

        // fade up each element
        $('.fade-up').each(function () {
            var POS = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();

            if (scroll > POS - windowHeight) {
                $(this).removeClass('true');
            } else {
                $(this).addClass('true');
            }
        });

        // fade right each element
        $('.fade-right').each(function () {
            var POS = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();

            if (scroll > POS - windowHeight) {
                $(this).removeClass('true');
                $('.fade-right.bottom').removeClass('true');
            } else {
                $(this).addClass('true');
                $('.fade-right.bottom').addClass('true');
            }
        });

        // fade left each element
        $('.fade-left').each(function () {
            var POS = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();

            if (scroll > POS - windowHeight - 500) {
                $(this).removeClass('true');
                $('.fade-right.bottom').removeClass('true');
            } else {
                $(this).addClass('true');
                $('.fade-right.bottom').addClass('true');
            }
        });

        //ウィンドウの一番下までスクロールした時にfooterを表示
        pageBottom = docHeight - windowHeight;
        if (pageBottom <= $(window).scrollTop()) {
            $('.footer').css('visibility', 'visible');
        } else {
            $('.footer').css('visibility', 'hidden');
        }
    });
});

function onClickJoinBtn() {
    $('.joinus-page').css('display', 'block');
    $('.contact-page').css('display', 'none');
    var juTop = $('.joinus-page').offset().top;
    $('html,body').animate({ scrollTop: juTop }, 500, 'swing');
}

function onClickContactBtn() {
    $('.contact-page').css('display', 'block');
    $('.joinus-page').css('display', 'none');
    var ctctTop = $('.contact-page').offset().top;
    $('html,body').animate({ scrollTop: ctctTop }, 500, 'swing');
}

function onClickSendBtn() {
    $('.form').css('display', 'none');
    $('.sent-message').css('display', 'block');
}

window.onload = init();
