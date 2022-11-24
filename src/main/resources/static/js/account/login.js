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

    loginForm.submit();
    console.log("로그인 폼 전송");



}

