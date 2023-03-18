const paymentBtn = document.querySelector(".payment-button");
const radioInput = document.querySelectorAll(".radio-input");
const pointAmount = document.querySelector(".point-amount");
const email = document.querySelector(".email");

let url = location.href;
let userId = url.substring(url.lastIndexOf("/") + 1);

loadUsername();
loadPoint();
payment();

// 선택한 포인트
function loadPoint() {
    for (let i = 0; i < radioInput.length; i++) {
        radioInput[i].onclick = () => {
            pointAmount.innerHTML = `
            ${radioInput[i].value}
        `
        }
    }
}

// 구매자 이메일 불러오기
function loadUsername() {
    email.innerHTML = `
        <span class="notice-payment">결제 알림 메일</span>
        <span class="notice-payment-email">${principalUser.username}</span>
    `
}

// 결제
function payment() {
    const point = document.querySelector("input[name='radio-input']:checked").value;
    const paymentCheckbox = document.querySelector(".payment-checkbox");
    const agreeCheckBox = document.querySelector(".input-checkbox");

    agreeCheckBox.addEventListener("change", () => {
        console.log(paymentCheckbox.checked)
        if (agreeCheckBox.checked) {
            if (paymentCheckbox.checked) {
                paymentBtn.onclick = () => {
                    const IMP = window.IMP;
                    IMP.init("imp37835071");
                    requestPay();

                    function requestPay() {
                        IMP.request_pay({
                            pg: "kakaopay",
                            pay_method: "card",
                            merchant_uid: 'merchant_' + new Date().getTime(),
                            name: "포인트 충전",
                            amount: point,
                            buyer_email: principalUser.username,
                        }, function (rsp) {
                            console.log(rsp);
                            if (rsp.success) {
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
                            } else {
                                console.log(rsp.error_msg);
                                alert("결제에 실패하였습니다.");
                            }
                        });
                    }
                }
            } else if (paymentCheckbox.checked == false) {
                paymentBtn.onclick = () => {
                    alert("결제수단을 선택해주세요.");
                }
            }
        } else if (agreeCheckBox.checked == false) {
            paymentBtn.onclick = () => {
                alert("동의 및 결제 전 주의사항을 확인해주세요.");
            };
        }
    });
}

// css 디자인
$(document).ready(function () {
    $(".payment-point-price").click(function () {
        $(".payment-point-price:nth-child(1)").css({
            "border": "1px solid #bebebe",
            "background-color": "#f3f3f3"
        });

        $(".payment-point-price").removeClass("active");
        $(this).addClass("active");

        $(".payment-point-price .price").removeClass("active");
        $(this).find(".price").addClass("active");

        $(".payment-point-price.active:nth-child(1)").css({
            "border": "3px solid #ff8000",
            "background-color": "#ff8000"
        });
    });
});




