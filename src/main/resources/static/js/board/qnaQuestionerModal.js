const questionerModal = document.querySelector(".questione-modal");  // 질문자 모달창
const reviewForm = document.querySelector("form");              // 별점
const uri = location.href;
const id = uri.substring(uri.lastIndexOf("/") + 1);

// 질문자 모달창 불러오기
loadQuestionerModal();
function loadQuestionerModal() {
    questionerModal.innerHTML = `
     <div class="modal-user-body">
            <!-- 헤더 영역 -->
            <div class="modal-user-review">답변 리뷰</div>

            답변자 닉네임 영역
            <div class="modal-user-detail">
                <div class="modal-user-title">
                    <div class="modal-titles">
                        답변자
                    </div>
                </div>
                <div class="modal-user-content">
                    답변자 닉네임
                </div>
            </div>

            <!-- 별점 영역 -->
            <div class="modal-user-detail">
                <div class="modal-user-title">
                    <div class="modal-titles star-title">
                        별점
                    </div>
                </div>
                <div class="modal-star-area">
                    <div class="modal-star">
                        
                            <!-- name: form의 이름. 서버로 제출된 폼 데이터를 참조하기 위해 사용  -->

                           
                            <div class="fieldset">
                                <input type="radio" class="reviewStar-input" name="score" value="5" id="score1">
                                <label class="reviewStar-label" for="score1">★</label>

                                <input type="radio" class="reviewStar-input" name="score" value="4" id="score2">
                                <label class="reviewStar-label" for="score2">★</label>

                                <input type="radio" class="reviewStar-input" name="score" value="3" id="score3">
                                <label class="reviewStar-label" for="score3">★</label>

                                <input type="radio" class="reviewStar-input" name="score" value="2" id="score4">
                                <label class="reviewStar-label" for="score4">★</label>

                                <input type="radio" class="reviewStar-input" name="score" value="1" id="score5">
                                <label class="reviewStar-label" for="score5">★</label>
                            </div>
                       
                    </div>
                    <div class="modal-user-description">
                        <p>별점의 갯수에 따라 지급액 산정이 달라집니다.</p>
                        <p>- 5개: 100%지급 -4개:80%지급 - 3개: 60%지급</p>
                        <p>- 2개: 40%지급 - 1개:20%지급</p>
                    </div>
                </div>
            </div>
            <div class="modal-user-button">
                <button class="save-button" type="button">save</button>
            </div>
        </div>
    `
}

requestScore();
function requestScore() {
    const saveButton = document.querySelector(".save-button");

    // 질문자 모달 데이터 전송
    saveButton.onclick = () => {
        // const questionerId = 
        // const anwererId
        const score = document.querySelector("input[name='score']:checked");
        let msg = null;

        msg = confirm("내용을 저장 하시겠습니까?");

        if (msg == true) {
            if (score == null) {
                alert("최소한 별점 하나라도 선택해주세요.");
            }
            else {
                let modlaData = {
                    boardId: id,
                    score: score.value
                };
                $.ajax({
                    async: false,
                    type: "post",
                    url: "/api/qna/question/article/questionermodal",
                    data: modlaData,
                    dataType: "json",
                    success: (Response) => {
                        console.log("별점 정보 전송 성공");
                        // 질문자 별점 완료 되면
                        // 게시물 완료로 location이 됨.
                    },
                    error: (error) => {
                        alert("후기 정보 전송 실패");
                        console.log(error);
                    }
                });
                alert("답변 해주셔서 감사합니다.");
            }
        }
    }


}



