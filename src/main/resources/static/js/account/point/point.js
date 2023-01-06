const paymentBtn = document.querySelector(".payment-button");
const radioInput = document.querySelectorAll(".radio-input");
const pointAmount = document.querySelector(".point-amount");
const email = document.querySelector(".email");
let url = location.href;
let userId = url.substring(url.lastIndexOf("/") + 1);

for (let i = 0; i < radioInput.length; i++) {
    radioInput[i].onclick = () => {
        pointAmount.innerHTML = `
            ${radioInput[i].value}
        `
    }
}

//구매자 이메일 불러오기
loadUsername();
function loadUsername() {
    email.innerHTML = `
        <span class="notice-payment">결제 알림 메일</span>
        <span class="notice-payment-email">${principalUser.username}</span>
    `
}

// ??
// requestUserId(userId);
// function requestUserId(userId) {
//     let data = null;
//     $.ajax({
//         async: false,
//         type: "get",
//         url: "/api/account/myactivity/point/" + userId,
//         dataType: "json",
//         success: (response) => {
//             console.log(response);

//             console.log(userId);
//         },
//         error: (error) => {
//             console.log(error);
//         }
//     });
// }

// 결제
paymentBtn.onclick = () => {

    // 포인트 값과 구매자의 이름, 이메일
    const point = document.querySelector("input[name='radio-input']:checked").value;
    console.log(userId);
    const IMP = window.IMP;
    IMP.init("imp37835071");
    requestPay();

    function requestPay() {
        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay({
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: "포인트 충전",
            amount: point,
            buyer_email: principalUser.username,
        }, function (rsp) {
            console.log(rsp);
            if (rsp.success) {  // 결제 성공
                $.ajax({
                    async: false,
                    type: "post",
                    url: "/api/account/point/charge",
                    data: {
                        "point": point,
                        "userId": userId
                    },
                    success: (response) => {
                        console.log(response);
                        console.log("전송 성공");
                    },
                    error: (error) => {
                        console.log(data);
                        console.log(error);
                        console.log("전송 실패");
                    }
                });
                alert("결제가 완료되었습니다.");
            } else {  // 결제 실패
                console.log(rsp.error_msg);
                alert("결제에 실패하였습니다.");

                // if(){
                //    결제 실패시 리다이렉트 주소
                // }
            }
        });
    }
}