const changeButton = document.querySelector(".change-password-button");
const passwordInput = document.querySelectorAll(".password-input");

changeButton.onclick = () => {
    let passwordInfo = {
        currentPw: passwordInput[0].value,
        newPw: passwordInput[1].value,
        checkNewPw: passwordInput[2].value
    };

    $.ajax({
        async: false,
        type: "put",
<<<<<<< HEAD
        url: "/api/account/forgot/password",
=======
        url: "/api/account/myprofile/password",
>>>>>>> origin/duckhyeon
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(passwordInfo),
        success: (response) => {
            alert("비밀번호 변경 완료");
            location.replace("/");
        },
        error: (error) => {
            console.log(error);
            // alert();

        }
    })



}