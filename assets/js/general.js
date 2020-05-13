(function() {
    //modal
    const modalTriggers = document.querySelectorAll('#administration .popup-trigger');
    const bodyBlackout = document.querySelector('#administration .body-blackout');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const popupModal = document.querySelector("#modal-admin");

            //taille dynamique pour le masquage modal
            var height_blackout = document.querySelector("body").offsetHeight;
            document.querySelector("#administration .body-blackout").style.height = height_blackout+"px";

            popupModal.classList.add('is--visible');
            bodyBlackout.classList.add('is-blacked-out');

            popupModal.querySelector('#administration .popup-modal__close').addEventListener('click', () => {
                popupModal.classList.remove('is--visible');
                bodyBlackout.classList.remove('is-blacked-out')
            });

            bodyBlackout.addEventListener('click', () => {
                // TODO: Turn into a function to close modal
                popupModal.classList.remove('is--visible');
                bodyBlackout.classList.remove('is-blacked-out')
            });


            let action = trigger.dataset.action;

            let httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', "functions/admin.php" + "?action="+action);
            httpRequest.send(null);

            httpRequest.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    if (this.response){
                        document.querySelector("#modal-admin .data-modal").innerHTML = this.response;

                        document.querySelector("#administration-module button").addEventListener('click', (e)=>{
                            e.preventDefault();
                            if (action === "connexion"){
                                let inputs = document.querySelectorAll('#modal-admin input');

                                inputs.forEach((item, index) => {
                                    item.classList.remove("success");
                                });

                                let error = [];
                                let text_error = "";

                                let log_administration_module = document.querySelector("#log-administration-module");

                                let login = document.querySelector("#administration-module input[name='login']");
                                let login_value = login.value;
                                let password = document.querySelector("#administration-module input[name='password']");
                                let password_value = password.value;

                                if (!login_value || login_value.length === 0 || !login_value.trim()){
                                    login.classList.add("b-error");
                                    error.push("identifiant");
                                }
                                else{
                                    login.classList.add("b-success");
                                }

                                if (!password_value || password_value.length === 0 || !password_value.trim()){
                                    password.classList.add("b-error");
                                    error.push("mot de passe");
                                }
                                else{
                                    password.classList.add("b-success");
                                }


                                text_error = error.join(', ');
                                text_error = text_error.charAt(0).toUpperCase() + text_error.substring(1).toLowerCase();
                                text_error = text_error.replace(/, ([^, ]*)$/, ' et ' + '$1');

                                if (error.length > 0){
                                    text_error += " requis.";
                                }
                                log_administration_module.innerHTML = text_error;

                                if (error.length === 0){
                                    let httpRequest = new XMLHttpRequest();
                                    httpRequest.open('POST', "functions/admin-module.php");
                                    let formData = new FormData(document.querySelector('#form-administration-module'));

                                    httpRequest.onreadystatechange = function() {
                                        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                            let response = JSON.parse(this.response);
                                            if (response){
                                                log_administration_module.innerHTML = response.info;
                                                if (response.success){
                                                    log_administration_module.classList.add("success");
                                                    document.location.reload(true);
                                                }
                                            }
                                        }
                                    };
                                    httpRequest.send(formData);
                                }
                            }
                            else if(action === "deconnexion"){
                                let log_administration_module = document.querySelector("#log-administration-module");

                                let httpRequest = new XMLHttpRequest();
                                httpRequest.open('POST', "functions/admin-module.php");
                                let formData = new FormData(document.querySelector('#form-administration-module'));

                                httpRequest.onreadystatechange = function() {
                                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                        let response = JSON.parse(this.response);
                                        if (response){
                                            log_administration_module.innerHTML = response.info;
                                            if (response.success){
                                                log_administration_module.classList.add("success");
                                                document.location.reload(true);
                                            }
                                        }
                                    }
                                };
                                httpRequest.send(formData);
                            }
                        });
                    }
                }
            };
        })
    })
})();
