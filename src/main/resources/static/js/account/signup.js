const signupButton = document.querySelector(".general-signup-button");
const signupInput = document.querySelectorAll(".general-signup-input");

// let randomKey = self.crypto.randomUUID().toString().replaceAll("-", "");

for(let i = 0; i < signupInput.length; i++) {
    signupInput[i].onkeyup = () => {
        if(window.event.keyCode === 13) {
            if(i != 4) {
                signupInput[i + 1].focus();
            } else {
                signupButton.click();
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
            emailSend();
            alert("회원가입 완료. 이메일을 확인해주세요.");
            location.replace("/index");
        },
        error: (error) => {
            console.log(error);
            validationError(error.responseJSON.data);
        }
    });

}

function validationError(error) {
    let errorMap = new Map(Object.entries(error));

    const errorMsg = document.querySelectorAll(".error-msg");
    errorMsg[0].textContent = errorMap.get("username");
    errorMsg[1].textContent = errorMap.get("password");
    errorMsg[2].textContent = errorMap.get("name");
    errorMsg[3].textContent = errorMap.get("phone");
    errorMsg[4].textContent = errorMap.get("nickName");
}


/* 이메일 인증*/
function emailSend() {
    let params = {
        "email": signupInput[0].value
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/email/signup",
        contentType: "application/json",
        data: JSON.stringify(params),
        dataType: "json",
        success : (response) => {
            location.replace("/index");
        },
        error: (error) => {
            console.log(error);
        }
    });
}