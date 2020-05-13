function activateSlider(name){
    ob = new Swipe(document.getElementById(name), {
        startSlide: 0,
        speed: 800,
        auto: 7000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem){},
        transitionEnd: function(index, elem){}
    });

    return ob;
}
