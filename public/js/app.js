$(function () {
    $("#btn-close-send-message").on("click", function () {
        $("#btn-close-send-message").hide("slow");
    });

    $(".send-message-close").on("click", function () {
        $("#btn-close-send-message").show("slow");
        $("#exampleModal .msg").val();
        $("#exampleModal .inputEmail").val();
    });

    $(".rounded-circle").on("click", function () {
        if ($(".about").hasClass('d-none')) {
            $(".about").removeClass('d-none');
        } else {
            $(".about").addClass('d-none');
        }
    });

    $(".language .form-select").on('change', (event) => {
        const value = event.target.value;

        if (value == 2 || value == "2") {
            $('.en-us').removeClass('d-none');
            $('.pt-br').addClass('d-none');
        } else {
            $('.en-us').addClass('d-none');
            $('.pt-br').removeClass('d-none');
        }
    });

    $(".toaster").on("click", function () {
        const loader = document.querySelector("#loading");
        const loaderSpan = document.querySelector("#loadingSpan");
        const select = document.querySelector(".form-select");
        const selectedLanguage = select.options[select.selectedIndex].value;

        function displayLoading() {
            loader.classList.add("display");
            loaderSpan.classList.add("display");
        }

        function hideLoading() {
            loader.classList.remove("display");
            loaderSpan.classList.remove("display");
        }

        toastr.options.positionClass = "toast-bottom-right";

        const value = $(".language .form-select").val();
        let inputEmail = "";
        let msg = "";

        if (value == 1 || value == '1') {
            inputEmail = $("#brInputEmail").val();
            msg = $("#brMsg").val();
        } else {
            inputEmail = $("#usInputEmail").val();
            msg = $("#usMsg").val();
        }

        var validEmail = validateEmail(inputEmail);

        if (msg == "" || inputEmail == "") {
            toastr.clear();
            toastr.error(`${selectedLanguage == 2 || selectedLanguage == "2" ? "Please type your email and message" : "Por favor digite seu email e mensagem"}`)
        } else if (validEmail == false) {
            toastr.clear();
            toastr.error(`${selectedLanguage == 2 || selectedLanguage == "2" ? "Please type a valid email address" : "Por favor digite um email válido"}`)
        } else {
            let data = {
                inputEmail: inputEmail,
                msg: msg,
            };

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (this.readyState !== 4 && this.status !== 200) {
                    displayLoading();
                }
            };

            xhr.open("POST", "/");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.onload = function () {
                if (xhr.responseText) {
                    console.log(xhr.responseText);
                    hideLoading();
                    toastr.clear();
                    toastr.success(`${selectedLanguage == 2 || selectedLanguage == "2" ? "Email sent successfully!" : "Email enviado com sucesso!"}`);
                    $("#exampleModal .modal-body input").val("");
                    $("#exampleModal .modal-body textarea").val("");
                } else {
                    toastr.clear();
                    toastr.error("Bad response! Please try again later.");
                    hideLoading();
                }
            };
            xhr.send(JSON.stringify(data));
        }
    });
});

function upperCase(element) {
    element.style.fontSize = "25px";
}

function lowerCase(element) {
    element.style.fontSize = "20px";
}

function validateEmail(email) {
    var re = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return re.test(email);
}