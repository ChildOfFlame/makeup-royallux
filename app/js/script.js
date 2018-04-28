$(document).ready(function(){
    var mainSwiper = new Swiper('.mainSlider__slider', {
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.mainSlider__slider-next',
            prevEl: '.mainSlider__slider-prev',
        },
    });
    var listSwiper = new Swiper('.list-slider', {
        slidesPerView:4,
        spaceBetween:30,
        navigation: {
            nextEl: '.list-slider-next',
            prevEl: '.list-slider-prev',
        },
        pagination: {
            el: '.list-slider-scrollbar',
        },
        breakpoints: {
            650: {
              slidesPerView: 1
            },
            950: {
              slidesPerView: 2
            },
            1280: {
              slidesPerView: 3
            }
        }
    });

    var partnersSwiper = new Swiper('.producer-slider', {
        slidesPerView:6,
        spaceBetween:30,
        navigation: {
            nextEl: '.producer-slider-next',
            prevEl: '.producer-slider-prev',
        },
        pagination: {
            el: '.producer-slider-scrollbar',
        },
        breakpoints: {
            350: {
              slidesPerView: 1
            },
            500: {
              slidesPerView: 2
            },
            700: {
              slidesPerView: 3
            },
            900: {
              slidesPerView: 4
            },
            1100: {
              slidesPerView: 5
            }
        }
    });

    var thumbSwiper = new Swiper('.detail-slider__thumb', {
        slidesPerView: 3,
        spaceBetween: 15,
        centeredSlides: true,
        slideToClickedSlide: true,
        loop: true,
        direction: 'vertical'
    });

    var detailSwiper = new Swiper('.detail-slider__swiper', {
        slidesPerView: 'auto',
        loop: true,
        navigation: {
            nextEl: '.detail-slider__next',
            prevEl: '.detail-slider__prev',
        },
        pagination: {
            el: '.detail-slider__pagination',
        }
    });

    if (detailSwiper.controller != undefined) {
        detailSwiper.controller.control = thumbSwiper;
        thumbSwiper.controller.control = detailSwiper;
    }


    $(document).on("click",".js-dropdown-left-menu",function(){
        $(this).parent()
               .toggleClass("open")
               .siblings(".left-sub-menu")
               .slideToggle();
        return false;
    });

    $(document).on("click",".js-filter-open",function(){
        $(this).toggleClass("open").siblings(".filter__parameters-box__block").slideToggle();
    });

    $( ".slide-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
        if(ui.handleIndex===0){
            $(".price-block__left__input").val(ui.values[ 0 ]);
        }
        else{
            $(".price-block__right__input").val(ui.values[ 1 ]);
        }
    }
    });
    $(".price-block__left__input").keyup(function(){
        $( ".slide-range" ).slider( "values", 0, $(this).val());
    });
    $(".price-block__right__input").keyup(function(){
        $( ".slide-range" ).slider( "values", 1, $(this).val());
    });
    $(document).on("click",".js-tab",function(){
        $(this).addClass("active")
               .siblings()
               .removeClass("active");
        $("."+$(this).attr("data-target")).addClass("active")
                                          .siblings()
                                          .removeClass("active");
    });

    $('.js-menu-btn').on('click', function() {
        $('.js-menu').slideToggle();
    });

    $('.js-mobile-filter').on('click', function() {
        $('body').css({'position' : 'fixed'});
        $('.js-mobile-filter').css({'border-top' : 'none'});

        $('.js-filter').animate({
            bottom: '0',
            height: '100%'
        }, {
            complete: function() {
                $('.js-mobile-filter__close').css({'display' : 'block'});
            }
        });
    });
    $('.js-mobile-filter__close').on('click', function(e) {
        e.stopPropagation();
        $('.js-filter').animate({
            bottom: '-35px',
            height: '78px'
        }, {
            complete: function() {
                $('body').css({'position' : 'static'});
                $('.js-mobile-filter__close').css({'display' : 'none'});
                $('.js-mobile-filter').css({'border-top' : '1px dotted #4d4697'});
            }
        });
    });
});