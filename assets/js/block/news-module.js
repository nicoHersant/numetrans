(function() {
    const news_module = document.querySelectorAll(".image-placement");
    var image_news = document.querySelector("input[name='image-placement']:checked").value;

    news_module.forEach((item, index) => {
        item.addEventListener("click", function(){
            let value = this.getAttribute("data-value");
            if (image_news !== value){
                document.querySelector("input[name='image-placement'][value='"+value+"']").click();
                this.classList.add("selected");
                document.querySelector(".image-placement[data-value='"+image_news+"']").classList.remove("selected");
                image_news = value;
            }
        });
    });

    document.querySelector("#button-news-module").addEventListener('click', function(e){
        e.preventDefault();
        let log_news_module = document.querySelector("#log-news-module");

        let title = document.querySelector("input[name='title']");
        let title_value = title.value;
        let image = document.querySelector("input[name='image']");
        let image_value = image.value;
        let text = document.querySelector("textarea[name='description']");
        let text_value = text.value;

        let error = [];
        let text_error = "";
        let image_error = [];
        let image_text_error = "";

        log_news_module.innerHTML = "";
        title.classList.remove("b-success");
        text.classList.remove("b-success");
        title.classList.remove("b-error");
        text.classList.remove("b-error");

        if (!title_value || title_value.length === 0 || !title_value.trim()){
            title.classList.add("b-error");
            error.push("titre");
        }
        else{
            title.classList.add("b-success");
        }

        if (!image_value || image_value.length === 0 || !image_value.trim()){
            error.push("image");
        }
        else{
            let image_size = image.files[0].size/1000000; //mo
            let image_type = image.files[0].type;

            if (image_size > 2){
                image_error.push("l'image ne doit pas excéder 2mo");
            }
            if (image_type !== "image/jpeg" && image_type !== "image/jpg" && image_type !== "image/png"){
                image_error.push("uniquement les fichiers jpeg/jpg/png sont acceptés");
            }

            image_text_error = image_error.join(', ');
            image_text_error = image_text_error.charAt(0).toUpperCase() + image_text_error.substring(1).toLowerCase();
            image_text_error = image_text_error.replace(/, ([^, ]*)$/, ' et ' + '$1');
        }

        if (!text_value || text_value.length === 0 || !text_value.trim()){
            text.classList.add("b-error");
            error.push("texte");
        }
        else{
            text.classList.add("b-success");
        }

        text_error = error.join(', ');
        text_error = text_error.charAt(0).toUpperCase() + text_error.substring(1).toLowerCase();
        text_error = text_error.replace(/, ([^, ]*)$/, ' et ' + '$1');

        if (error.length > 0){
            text_error += " requis.";
        }

        if (image_text_error !== ""){
            text_error += " " + image_text_error +".";
        }

        log_news_module.innerHTML = text_error;

        if (error.length === 0){
            document.querySelector("#form-news-module").submit();
        }
    });
})();
