function activeSlider(name, auto = false){
    let timing = 0;
    if (auto){
        timing = 7000
    }

    ob = new Swipe(document.getElementById(name), {
        startSlide: 0,
        speed: 800,
        auto: timing,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem){},
        transitionEnd: function(index, elem){}
    });

    return ob;
}