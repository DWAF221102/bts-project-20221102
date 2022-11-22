const changeButton = document.querySelector(".change-password-button");
const passwordInput = document.querySelectorAll(".password-input");

changeButton.onclick = () => {

    let passwordInfo = {
        currentPassword: passwordInput[0].value,
        newPassword: passwordInput[1].value,
        checkNewPassword: passwordInput[2]
    };

    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/forgot/password-change",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(passwordInfo),
        success: (response) => {
            alert("비밀번호 변경 완료");
            console.log(data);
            location.replace("/");
        },
        error: (error) => {
            console.log(error);
            alert("전송 실패");
        }
    })



}