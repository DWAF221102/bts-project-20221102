const loginButton = document.querySelector(".general-login-button");
const loginInput = document.querySelectorAll(".general-login-input");
const kakaoLogin = document.querySelector(".kakao-btn");


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

// kakaoLogin.onclick = () => {
//     location.replace(encodeURI("kauth.kakao.com/oauth/authorize?client_id=b83d0f41c645f00cbb4cd4b5224865b8&redirect_uri=http://localhost:8000/login/oauth2/code/kakao&response_type=code"))
// }

loginButton.onclick = () => {
    const loginForm = document.querySelector("form");

    loginForm.submit();
    console.log("로그인 폼 전송");
}

