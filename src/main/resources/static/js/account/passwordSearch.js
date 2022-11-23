const submitBtn = document.querySelector(".change-password-button");
const pwdInputs = document.querySelectorAll(".input-password-input");

for(let i = 0; i < pwdInputs.length; i++) {
    pwdInputs[i].onkeyup = () => {
        if (window.event.keyCode === 13) {
            if (i != 1) {
                pwdInputs[i + 1].focus();
            } else {
                submitBtn.click();
            }
        }
    }
}

submitBtn.onclick = () => {
    const idStartIndex = location.href.lastIndexOf("id=") + 3;
    const idEndIndex = location.href.lastIndexOf("&accessKey=");
    const accessKeyStartIndex = location.href.lastIndexOf("accessKey=") + 10;
    const id = location.href.substring(idStartIndex, idEndIndex);
    const accessKey = location.href.substring(accessKeyStartIndex);
    
    let passwordInfo = {
        "id": id,
        "accessKey": accessKey,
        "newPw": pwdInputs[0].value,
        "checkNewPw": pwdInputs[1].value
    };

    $.ajax({
        async: false,
        type: "put",
        url: "/api/account/forgot/password",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(passwordInfo),
        success: (response) => {
            alert("비밀번호 변경 완료");
            location.replace("/login");
        },
        error: (error) => {
            console.log(error);
            validationError(error.responseJSON.data);

        }
    });
}

function validationError(error) {
    const errorMsg = document.querySelector(".error-msg");

    const errorValues = Object.values(error);

    errorMsg.innerHTML = "";

    errorValues.forEach((value) => {
        errorMsg.innerHTML += `
                ${value}
        `;
    });

    errorMsg.classList.remove("error-invisible")
}