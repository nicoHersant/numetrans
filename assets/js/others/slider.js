function activateSlider(name, auto = 7000, start = 0){

    ob = new Swipe(document.getElementById(name), {
        startSlide: start,
        speed: 800,
        auto: auto,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem){},
        transitionEnd: function(index, elem){}
    });
}
