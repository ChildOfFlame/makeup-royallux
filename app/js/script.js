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
});