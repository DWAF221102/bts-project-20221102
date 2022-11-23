const cancelButton = document.querySelector(".cancel-button");
const findButton = document.querySelector(".find-account-button");
const emailInput = document.querySelector(".input-info-input");

cancelButton.onclick = () => {
    location.replace("/login");
}

emailInput.onkeyup = () => {
    if (window.event.keyCode === 13) {
        findButton.click();    
    }
}

findButton.onclick = () => {
    emailSend();
}

function emailSend() {
    let params = {
        "email": emailInput.value
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/email/forgot",
        contentType: "application/json",
        data: JSON.stringify(params),
        dataType: "json",
        success : (response) => {
            alert("이메일 전송완료.")
        },
        error: (error) => {
            alert("존재하지 않는 이메일입니다.")
            console.log(error);
        }
    });
}