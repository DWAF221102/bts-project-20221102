export function questionerModal(answererData) {
    const body = document.querySelector("body");  // 질문자 모달창
    const uri = location.href;
    const id = uri.substring(uri.lastIndexOf("/") + 1);

    // 질문자 모달창 불러오기
    loadQuestionerModal(answererData);
    requestScore(answererData);

    function loadQuestionerModal(answererData) {
        body.innerHTML += `
            <div class="modal-area">
                <div class="modal-user-body">
                    <div class="modal-user-review">
                        답변 리뷰
                    </div>
                    <div class="modal-user-detail">
                        <div class="modal-user-title">
                            <div class="modal-titles">
                                답변자
                            </div>
                        </div>
                        <div class="modal-user-content">
                            ${answererData.nickName}
                        </div>
                    </div>
                    <div class="modal-user-detail">
                        <div class="modal-user-title">
                            <div class="modal-titles star-title">
                                별점
                            </div>
                        </div>
                        <div class="modal-star-area">
                            <div class="modal-star">
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
            </div>
        `
    }

    function requestScore(answererData) {
        const saveButton = document.querySelector(".save-button");
        console.log(answererData)
        console.log(answererData.userId)
        // 질문자 모달 데이터 전송
        saveButton.onclick = () => {

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
                        questionerId: principalUser.id,
                        answererId: answererData.userId,
                        score: score.value
                    };
                    $.ajax({
                        async: false,
                        type: "post",
                        url: "/api/qna/question/article/questionermodal",
                        data: modlaData,
                        dataType: "json",
                        success: (Response) => {
                            location.reload();
                            alert("완료 버튼을 클릭해주세요.")

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
}
