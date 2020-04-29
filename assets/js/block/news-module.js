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

    document.querySelector("#button-news-module").addEventListener('click', function(){
        let log_news_module = document.querySelector("#log-news-module");

        let title = document.querySelector("input[name='title']");
        let title_value = title.value;
        let text = document.querySelector("textarea[name='text-news']");
        let text_value = text.value;

        let error = 0;

        log_news_module.innerHTML = "";
        title.classList.remove("b-success");
        text.classList.remove("b-success");
        title.classList.remove("b-error");
        text.classList.remove("b-error");

        if ((!title_value || title_value.length === 0 || !title_value.trim()) && (!text_value || text_value.length === 0 || !text_value.trim())){

        }
        if (!title_value || title_value.length === 0 || !title_value.trim()){
            error++;
        }
        if (!text_value || text_value.length === 0 || !text_value.trim()){
            error = error + 2;
        }

        if (error === 1){
            log_news_module.innerHTML = "Titre manquant.";
            title.classList.add("b-error");
            text.classList.add("b-success");
        }
        else if(error === 2){
            log_news_module.innerHTML = "Texte manquant.";
            title.classList.add("b-success");
            text.classList.add("b-error");
        }
        else if(error === 3){
            log_news_module.innerHTML = "Titre et texte manquants.";
            title.classList.add("b-error");
            text.classList.add("b-error");
        }
        else{
            title.classList.add("b-success");
            text.classList.add("b-success");
        }
    });
})();
