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
    });

    var PartnersSwiper = new Swiper('.producer-slider', {
        slidesPerView:6,
        spaceBetween:30,
        navigation: {
            nextEl: '.producer-slider-next',
            prevEl: '.producer-slider-prev',
        },
        pagination: {
            el: '.producer-slider-scrollbar',
        },
    });

    var PartnersSwiper = new Swiper('.detail-slider__swiper', {
        navigation: {
            nextEl: '.detail-slider__next',
            prevEl: '.detail-slider__prev',
        },
        pagination: {
            el: '.detail-slider__pagination',
        },
    });

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
});