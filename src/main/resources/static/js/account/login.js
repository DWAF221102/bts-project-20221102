const loginButton = document.querySelector(".general-login-button");
const loginInput = document.querySelectorAll(".general-login-input");


// Enter 로직
for (let i = 0; i < loginInput.length; i++) {
    loginInput[i].onkeyup = () => {
        if (window.event.keyCode === 13) {
            if (i != 4) {
                loginInput[i + 1].focus();
            } else {
                loginButton.click();
            }
        }
    }
}

loginButton.onclick = () => {
    const loginForm = document.querySelector("form");

    //    로그인 유효성 검사
    // let loginInfo = {
    //     username: loginInput[0].value,
    //     password: loginInput[1].value
    // }

    // $.ajax({
    //     async: false,
    //     type: "get",
    //     url: "/api/account/login",
    //     contentType: "application/json",
    //     data: JSON.stringify(loginInfo),
    //     dataType: "json",
    //     success: (response) => {
    //         console.log("성공");
    //     },
    //     error: (error) => {
    //         console.log(error);
    //         validationError(error.responseJSON.data);
    //     }
    // });

    loginForm.submit();
    console.log("로그인 폼 전송");



}



    //    로그인 유효성 검사
// function validationError(error) {
//     let errorMap = new Map(Object.entries(error));

//     const errorMsg = document.querySelectorAll(".error-msg");
//     errorMsg[0].textContent = errorMap.get("username");
//     errorMsg[1].textContent = errorMap.get("password");
// }