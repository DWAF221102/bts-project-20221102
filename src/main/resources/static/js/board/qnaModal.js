
const questionerModal = document.querySelector(".modal-user");  // 질문자 모달창
const answererModal = document.querySelector(".modal");         // 답변자 모달창
const reviewForm = document.querySelector("form");              // 별점
const uri = location.href;
const id = uri.substring(uri.lastIndexOf("/") + 1);

// 답변자 모달창 불러오기
loadAnswererModal();
answererModalReq();

function loadAnswererModal() {
    answererModal.innerHTML = `
    <div class="modal-body">
            <div class="modal-title">답변내용</div>
            <form name="answererForm" method="post" action="/api/qna/question/article/answerermodal">
                <input class="form-input" type="text" name="${id}" value="${id}">
                <div class="modal-box">
                    <div class="modal-detail">원인분석</div>
                    <textarea name="causerAnalysis" cols="30" rows="12" placeholder="내용을 입력해 주세요."
                        class="modal-textarea"></textarea>
                </div>
                <div class="modal-box">
                    <div class="modal-detail">해결방안</div>
                    <textarea name="solutionPlan" cols="30" rows="14" placeholder="내용을 입력해 주세요."
                        class="modal-textarea"></textarea>
                </div>

                <div class="modal-description">
                    *답변내용 미제출시 정산이 되지않음을 참고하시기 바랍니다.
                </div>
                <div class="modal-button">
                    <button class="save-button" type="button">save</button>
                </div>
            </form>
        </div>
    `
}

function answererModalReq() {
    const textarea = document.querySelectorAll(".modal-textarea");
    const answererForm = document.querySelector("form");
    const saveButton = document.querySelector(".save-button");

    saveButton.onclick = () => {
        alert(id)
        answererForm.submit();

        //     if (textarea.values == null) {
        //         alert("내용을 입력해주세요.")

        //     } else if (textarea.values != null) {
        //         answererForm.submit();
        //         location.reload();
        //         alert("폼데이터 전송 완료");
        //     }

    }
}



