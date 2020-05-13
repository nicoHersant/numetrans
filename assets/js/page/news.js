(function() {
    //slider news
    var ob = activateSlider("slider-news", true);

    var icon_sliders_prev = document.querySelectorAll("#new-news .slider-prev");
    icon_sliders_prev.forEach((item, index) => {
        item.addEventListener("click", function(e){
            e.preventDefault();
            ob.prev();
        });
    });

    var icon_sliders_next = document.querySelectorAll("#new-news .slider-next");
    icon_sliders_next.forEach((item, index) => {
        item.addEventListener("click", function(e){
            e.preventDefault();
            ob.next();
        });
    });

    //slider news
    var ob2 = activateSlider("slider-archived-news", true);

    var icon_sliders_archived_prev = document.querySelectorAll("#archived-news .slider-prev");
    icon_sliders_archived_prev.forEach((item, index) => {
        item.addEventListener("click", function(e){
            e.preventDefault();
            ob2.prev();
        });
    });

    var icon_sliders_archived_next = document.querySelectorAll("#archived-news .slider-next");
    icon_sliders_archived_next.forEach((item, index) => {
        item.addEventListener("click", function(e){
            e.preventDefault();
            ob2.next();
        });
    });

    //modal
    const modalTriggers = document.querySelectorAll('.popup-trigger');
    const bodyBlackout = document.querySelector('.body-blackout');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const popupModal = document.querySelector("#modal");

            //taille dynamique pour le masquage modal
            var height_blackout = document.querySelector("body").offsetHeight;
            document.querySelector(".body-blackout").style.height = height_blackout+"px";

            popupModal.classList.add('is--visible');
            bodyBlackout.classList.add('is-blacked-out');

            popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
                popupModal.classList.remove('is--visible');
                bodyBlackout.classList.remove('is-blacked-out')
            });

            bodyBlackout.addEventListener('click', () => {
                // TODO: Turn into a function to close modal
                popupModal.classList.remove('is--visible');
                bodyBlackout.classList.remove('is-blacked-out')
            });


            let id_news = trigger.dataset.id;
            let action = trigger.dataset.action;

            let httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', "block/news-module.php" + "?id-news="+id_news+"&action="+action);
            httpRequest.send(null);

            httpRequest.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    if (this.response){
                        document.querySelector("#data-modal").innerHTML = this.response;
                        //
                        if (action !== "archive" && action !== "reactivate"){
                            var news_module = document.querySelectorAll(".image-placement");
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
                                let placement_value = document.querySelector("input[name='image-placement']").value;
                                let text = document.querySelector("textarea[name='description']");
                                let text_value = text.value;

                                let error = [];
                                let text_error = "";
                                let image_error = [];
                                let image_text_error = "";

                                log_news_module.innerHTML = "";
                                log_news_module.classList.remove("success");
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

                                if ((!image_value || image_value.length === 0 || !image_value.trim()) && (!action || action === "edit")){
                                    error.push("image");
                                }
                                else if(action !== null){
                                    image = [];
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
                                    let httpRequest = new XMLHttpRequest();
                                    httpRequest.open('POST', "ajax/news-module.php");
                                    let formData = new FormData(document.querySelector('#form-news-module'));

                                    httpRequest.onreadystatechange = function() {
                                        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                            let response = JSON.parse(this.response);
                                            if (response){
                                                log_news_module.innerHTML = response.info;
                                                if (response.success){
                                                    log_news_module.classList.add("success");
                                                    document.location.reload(true);
                                                }
                                            }
                                        }
                                    };
                                    httpRequest.send(formData);
                                }
                            });

                        }
                        else{
                            document.querySelector("#button-news-module").addEventListener('click', function(e){
                                e.preventDefault();
                                let log_news_module = document.querySelector("#log-news-module");

                                let httpRequest = new XMLHttpRequest();
                                httpRequest.open('POST', "ajax/news-module.php");
                                let formData = new FormData(document.querySelector('#form-news-module'));

                                httpRequest.onreadystatechange = function() {
                                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                        let response = JSON.parse(this.response);
                                        if (response){
                                            log_news_module.innerHTML = response.info;
                                            if (response.success){
                                                log_news_module.classList.add("success");
                                                document.location.reload(true);
                                            }
                                        }
                                    }
                                };
                                httpRequest.send(formData);
                            });
                        }


                        //
                    }
                }
            };
        })
    })

})();
