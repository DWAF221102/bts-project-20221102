const answererModal = document.querySelector(".answere-modal");         // 답변자 모달창
const uri = location.href;
const id = uri.substring(uri.lastIndexOf("/") + 1);


// 답변자 모달창 불러오기
loadAnswererModal();
function loadAnswererModal() {
    answererModal.innerHTML = `
    <div class="modal-body">
            <div class="modal-title">답변내용</div>
           
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
            
        </div>
    `
}

// 답변자 모달 정보 전송
answererModalReq();
function answererModalReq() {
    const textarea = document.querySelectorAll(".modal-textarea");
    const saveButton = document.querySelector(".save-button");

    saveButton.onclick = () => {
        let answererData = {
            id: id,
            causerAnalysis: textarea[0].value,
            solutionPlan: textarea[1].value
        };
        let msg = null;

        msg = confirm("내용을 저장 하시겠습니까?");

        if (msg == true) {
            if (textarea[0].value == "" || textarea[1].value == "") {
                alert("내용을 입력해주세요.")
            } else {
                $.ajax({
                    async: false,
                    type: "post",
                    url: "/api/qna/question/article/answerermodal",
                    data: answererData,
                    dataType: "json",
                    success: (Response) => {
                        console.log("답변자 정보 전송 성공");
                        // location.href = "";

                        // 질문자 별점 완료 되면 
                        // 게시물 완료로 location이 됨.
                        // 이걸 flag로 만들어 답변자랑 질문자 모두
                        //flag가 1이 되도록 해야함

                    },
                    error: (error) => {
                        alert("답변자 정보 전송 실패");
                        console.log(error);
                    }
                });
                alert("답변 해주셔서 감사합니다.");
            }
        }

    }
}




/////////////////////////////////////////////////////
const causerAnalysis = document.querySelector(".causer-analysis-content");
const solutionPlan = document.querySelector(".solution-plan-content");

causerAnalysis.innerHTML = `

`

solutionPlan.innerHTML = `

`








