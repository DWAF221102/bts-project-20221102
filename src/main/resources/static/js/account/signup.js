const signupButton = document.querySelector(".general-signup-button");

signupButton.onclick = () => {
    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/signup",
        contentType: "application/json",
        data: JSON.stringify,
        dataType: "json",
        success: (response) => {
            location.replace("/account/login");
        },
        error: (error) => {
            console.log(error);
//            validationError(error.responseJSON.data);
        }
    });
}

