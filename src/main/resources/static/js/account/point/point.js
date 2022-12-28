const paymentBtn = document.querySelector(".payment-button");
let url = location.href;
let userId = url.substring(url.lastIndexOf("/") + 1);

function requestUserId(userId) {
    $({
        async: false,
        type: "get",
        url: "/point/" + userId,
        success: (response) => {
            console.log(response);
        },
        error: (error)
    })
}

paymentBtn.onclick = () => {
    console.log("클릭함");
    // 포인트 값과 구매자의 이름, 이메일
    const pointAmount = document.querySelector("input[name='radio-input']:checked").value;
    // const pointBuyerEmail;


    const IMP = window.IMP;
    IMP.init("TC0ONETIME");
    requestPay();
    function requestPay() {
        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay({  // param
            pg: "kakao",
            pay_method: "card",
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: "포인트 충전",
            amount: pointAmount,
            // buyer_email: pointBuyerEmail
        }, function (rsp) {
            console.log(rsp);
            if (rsp.success) {  // 결제 성공
                const msg = "결제가 완료되었습니다.";
                alert(msg);

                chargePoint.submit();
            } else {  // 결제 실패
                const msg = "결제에 실패하였습니다.";
                console.log(rsp.error_msg);
                alert(msg);

                // if(){
                //    결제 실패시 리다이렉트 주소
                // }
            }
        });


    }

}