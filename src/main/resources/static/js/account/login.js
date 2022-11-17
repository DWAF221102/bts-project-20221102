const loginButton = document.querySelector(".general-login-button");

loginButton.onclick = () => {
    const loginForm = document.querySelector("form");
    loginForm.submit();
    console.log("로그인 폼 전송");
}

