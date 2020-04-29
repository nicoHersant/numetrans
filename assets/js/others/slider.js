function activateSlider(name, nb_slides, auto = false, start = 0){
    if (auto == false){
        auto = 7000
    }
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
