(function() {
    const news_module = document.querySelectorAll(".image-news");
    var image_news = document.querySelector("input[name='image-news']:checked").value;

    news_module.forEach((item, index) => {
        item.addEventListener("click", function(){
            let value = this.getAttribute("data-value");
            if (image_news !== value){
                document.querySelector("input[name='image-news'][value='"+value+"']").click();
                this.classList.add("selected");
                document.querySelector(".image-news[data-value='"+image_news+"']").classList.remove("selected");
                image_news = value;
            }
        });
    });
})();
