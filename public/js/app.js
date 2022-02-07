$(function () {
    $(".toaster").on("click", function () {
        let inputEmail = $("#inputEmail").val();
        let msg = $("#msg").val();

        toastr.options.positionClass = "toast-bottom-right";

        if (msg == "" || inputEmail == "") {
            toastr.clear();
            toastr.error("Please type your email and message");
        } else {
            let data = {
                inputEmail: inputEmail,
                msg: msg,
            };

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.onload = function () {
                // console.log(xhr.responseText);
                if (xhr.responseText) {
                    toastr.clear();
                    toastr.success("Email sent successfully!");
                    $("#msg").val("");
                    $("#inputEmail").val("");
                } else {
                  toastr.clear();
                  toastr.error("Bad response! Pleasae try again later.");
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
