const questionerModal = document.querySelector(".modal-user");  // 질문자 모달창
const answererModal = document.querySelector(".modal");         // 답변자 모달창
const reviewForm = document.querySelector("form");              // 별점
const saveButton = document.querySelector(".save-button");      // 저장 버튼




// 질문자 모달창 불러오기
// function loadQuestionerModal() {
//     questionerModal.innerHTML = `
//       <div class="modal-user-body">
//         <div class="modal-user-review">답변 리뷰</div>
//         <div class="modal-user-detail">
//             <div class="modal-user-title">
//                 <div class="modal-titles">
//                     답변자
//                 </div>
//             </div>
//             <div class="modal-user-content">

//             </div>
//         </div>
//         <div class="modal-user-detail">
//             <div class="modal-user-title">
//                 <div class="modal-titles star-title">
//                     별점
//                 </div>
//             </div>
//             <div class="modal-star-area">
//                 <div class="modal-star">
//                     <form class="reviwe-form" name="myform" id="myform"> 
//                         <fieldset>
//                             <input type="radio" class="reviewStar-input" name="reviewStar" value="1" id="rate1"><label
//                                 class="reviewStar-label" for="rate1">★</label>
//                             <input type="radio" class="reviewStar-input" name="reviewStar" value="2" id="rate2"><label
//                                 class="reviewStar-label" for="rate2">★</label>
//                             <input type="radio" class="reviewStar-input" name="reviewStar" value="3" id="rate3"><label
//                                 class="reviewStar-label" for="rate3">★</label>
//                             <input type="radio" class="reviewStar-input" name="reviewStar" value="4" id="rate4"><label
//                                 class="reviewStar-label" for="rate4">★</label>
//                             <input type="radio" class="reviewStar-input" name="reviewStar" value="5" id="rate5"><label
//                                 class="reviewStar-label" for="rate5">★</label>
//                         </fieldset>
//                     </form>
//                 </div>
//                 <div class="modal-user-description">
//                     <p>별점의 갯수에 따라 지급액 산정이 달라집니다.</p>
//                     <p>- 5개: 100%지급 -4개:80%지급 - 3개: 60%지급</p>
//                     <p>- 2개: 40%지급 - 1개:20%지급</p>
//                 </div>
//             </div>
//         </div>
//         <div class="modal-user-detail">
//             <div class="modal-user-title">
//                 <div class="modal-titles">후기</div>
//             </div>
//             <textarea name="" id="" cols="50" rows="10" placeholder="후기를 작성해 주세요." class="user-textarea"></textarea>
//         </div>
//         <div class="modal-button">
//             <button class="modal-button-left">save</button>
//             <button class="modal-button-right">cancel</button>
//         </div>

//     </div>
//     `
// }






// 질문자 모달 데이터 전송
saveButton.onclick = () => {
    // 별점 정보 전송
    reviewForm.submit();
    console.log("폼 전송");
    console.log(reviewForm);

    // 후기 정보 전송
    // $.ajax({
    //     async: false,
    //     type: "post",
    //     url: "",
    //     data: ,
    //     dataType: "json",
    //     success: (Response) => {
    //         console.log("후기 정보 전송 성공");
    //         console.log(Response.data);
    //     },
    //     error: (error) => {
    //         console.log("후기 정보 전송 실패");
    //         console.log(error);
    //     }
    // });
}







// 답변자 모달창 불러오기
// function loadAnswererModal() {
//     answererModal.innerHTML = `
//     <div class="modal-body">
//         <div class="modal-title">답변내용</div>
//         <div>
//             <div class="modal-detail">원인분석</div>
//             <textarea name="" id="" cols="30" rows="12" placeholder="내용을 입력해 주세요." class="modal-textarea"></textarea>
//         </div>
//         <div>
//             <div class="modal-detail">해결방안</div>
//             <textarea name="" id="" cols="30" rows="14" placeholder="내용을 입력해 주세요." class="modal-textarea"></textarea>
//         </div>
//         <div class="modal-description">
//             *답변내용 미제출시 정산이 되지않음을 참고하시기 바랍니다.
//         </div>
//         <div class="modal-button">
//             <button class="modal-button-left">save</button>
//             <button class="modal-button-right">cancel</button>
//         </div>
//     </div>
//     `
// }


