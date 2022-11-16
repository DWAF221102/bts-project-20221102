const signupButton = document.querySelector(".general-signup-button");
const signupInput = document.querySelectorAll(".general-signup-input");

for(let i = 0; i < signupInput.length; i++) {
    signupInput[i].onkeyup = () => {
        if(window.event.keyCode === 13) {
            if(i != 4) {
                signupInput[i + 1].focus();
            } else {
                signupInput.click();
            }
        }
    }
}

signupButton.onclick = () => {

    let signupInfo = {
        username: signupInput[0].value,
        password: signupInput[1].value,
        name: signupInput[2].value,
        phone: signupInput[3].value,
        nickName: signupInput[4].value
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/signup",
        contentType: "application/json",
        data: JSON.stringify(signupInfo),
        dataType: "json",
        success: (response) => {
            location.replace("/login");
        },
        error: (error) => {
            console.log(error);
            validationError(error.responseJSON.data);
        }
    });
}

function validationError(error) {
    const errorMsg = document.querySelectorAll(".error-msg");
    const errorValues = Object.keys();

    for(let i = 0; i < errorMsg.length; i++) {
        errorMsg[i].innerHTML = "";
        console.log(errorValues[i])
    }


    errorMsg.classList.remove("error-invisible");
}

