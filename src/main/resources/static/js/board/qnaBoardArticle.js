window.onload = () => {
    getList();
    answerCheckService();
    loadAnswer();
}

function getList() {
    const uri = location.href;
    const id = uri.substring(uri.lastIndexOf("/") + 1);

    $.ajax({
        async: false,
        type: "get",
        url: "/api/qna/qnaLists/" + id,
        dataType: "json",
        success: (response) => {
            console.log(response);
            img(response.data);
            writer(response.data);
            titleCreate(response.data);
            boardInfo(response.data);
            boardDetails(response.data);
            writer(response.data);
            requestButton(response.data);
            setUpdateButton(response.data);
            loadAnswer(response.data);

        },
        error: (error) => {
            console.log(error);
        }

    });

}

function img(data) {
    const qnaImg = document.querySelector(".qna-board-img")
    let qnaImgFiles = data.qnaImgFiles;
    articleImgList = new Array();

    let k = 0;
    if (qnaImgFiles.length != 0) {
        qnaImg.innerHTML = `
        <div class="img-box">
            <i class="fa-shrap fa-solid fa-angle-left"></i>
            <i class="fa-shrap fa-solid fa-angle-right"></i>
            <img class="img-content" src="/image/qna/${data.qnaImgFiles[k].temp_name}">
        </div>
        `;

        for (let i = 0; i < qnaImgFiles.length; i++) {
            articleImgList.push(data.qnaImgFiles[i].temp_name);
            console.log(articleImgList);

        };

        const rightButton = document.querySelector(".fa-angle-right");
        rightButton.onclick = () => {
            if (k < qnaImgFiles.length - 1) {
                const imgContent = document.querySelector(".img-content");
                k++;
                imgContent.src = `/image/qna/${articleImgList[k]}`;
                console.log([k])
            }

        }

        const leftButton = document.querySelector(".fa-angle-left");
        leftButton.onclick = () => {
            if (k < qnaImgFiles.length && k >= 1) {
                const imgContent = document.querySelector(".img-content");
                k--;
                imgContent.src = `/image/qna/${articleImgList[k]}`;
                console.log([k])
            }

        }
    } else {
        qnaImg.innerHTML = `
        <div class="img-box">
            
            <img class="img-content" src="/image/qna/no_image.png">
        </div>
        `;
    }

}

function addCreate(qnaLists) {
    const listBody = document.querySelector(".list-body");

    listBody.innerHTML = "";

    qnaLists.forEach((qna) => {
        listBody.innerHTML += `
    <tr>
        <td class="user-id">${qna.nickname}</td>
        <td>${qna.subcategoryName}</td>
        <td>${qna.title}</td>
        <td>${qna.status}</td>
        <td><button type="button" class="detail-button">상세보기</button></td>
        <td><button type="button" class="delete-button">삭제</button></td>
    </tr>
    <tr class="detail-invisible qna-detail">
        <td colspan="6">
            <textarea class="detail-box" disabled>그냥 모르겠습니다.</textarea>
        </td>
    </tr>
        `;
    });
}
// <img src="/image/user/${data.userImg}" alt="">

function writer(data) {
    const qnaWriter = document.querySelector(".qna-board-profile-flex");
    qnaWriter.innerHTML = `
    <div class= "qna-profile-img">
    <a href="">
        <img src="/image/user/${data.userImg}" alt="">
    </a>
    </div>
    <div class="qna-board-profile-details">
        <a href="" class="qna-profile-name">${data.nickname}</a>
        <div class="qna-profile-text">
            <span>좋아요</span>
            <span> </span>
            <span>시간</span>
            <span> </span>
            <span>뷰</span>
        </div>
    </div>
    `;
}

function titleCreate(data) {

    const qnaTitle = document.querySelector(".qna-board-top");
    qnaTitle.innerHTML = `
        <div>
            <div class="qna-board-category">
                ${data.categoryName}
            </div>
            <p class="qna-content-name">
                ${data.title}
            </p>
        </div>
    `;

}

function boardInfo(data) {
    const boardInfos = document.querySelector(".board-info");
    boardInfos.innerHTML = `
    <div class="qna-board-info-category">
        <div class="qna-board-info-category-left">
            프로그램/버전
        </div>
        <div class="qna-board-info-category-right">
            ${data.subcategoryName}
        </div>

    </div>

    <div class="qna-board-price">
        <div class="qna-board-price-left">
            질문금액
        </div>
        <div class="qna-board-price-right">
            ${data.price} p
        </div>
    </div>
    `

}

function requestButton(data) {
    const requestButtonArea = document.querySelector(".request-answer")
    let time = TimeService.getInstance().setTime(data.createDate);

    if (principalUser == null) {
        requestButtonArea.innerHTML = `
            <button type="button" class="request-pass-button request-button">
                <div>
                    <span class="request-pass">로그인을 하세요.</span>
                </div>
            </button>    
        `
        const requestPassBtn = document.querySelector(".request-pass-button");

        requestPassBtn.onclick = () => {
            alert("로그인을 하세요.");
            location.replace("/login");
        }

    } else if (principalUser.id == data.userId) {
        requestButtonArea.innerHTML = `
            <button type="button" class="request-choise-button request-button">
                <div>
                    <span class="request-choise">답변자 선택</span>
                </div>
                <div>
                    <span class="request-time">${time}</span>
                </div>
            </button>
        `
        const requestChoiseBtn = document.querySelector(".request-choise-button");

        // 클릭시 업데이트 날라가야하는 부분
        // requestChoiseBtn.onclick = () => {
        //     // 업데이트 날려야함.
        // }

    } else {
        requestButtonArea.innerHTML = `
            <button type="button" class="request-title-button request-button">
                <div>
                    <span class="request-title">답변권한요청</span>
                </div>
                <div>
                    <span class="request-time">${time}</span>
                </div>
            </button>    
        `

        const requestTitleBtn = document.querySelector(".request-title-button");

        // 클릭시 유저 인설트 되야하는 부분
        // requestTitleBtn.onclick = () => {
        //     // 인설트 되야함.
        // }
    }
}

function boardDetails(data) {
    const boardDetails = document.querySelector(".qna-error")
    boardDetails.innerHTML = `
    <div class="qna-error">
    <div class="qna-error-title">
        문제설명
    </div>
    <div class="qna-error-description">
        <p class="error-details">${data.info}</p>

    </div>

    <div class="qna-error-title">
        희망결과
    </div>
    <div class="qna-error-description">
        <p class="error-details">${data.wantInfo}</p>

    </div>
</div>
    `
}

class TimeService {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new TimeService();
        }
        return this.#instance;
    }

    setTime(creatDate) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        console.log(date);

        let cYear = Number(creatDate.substring(0, creatDate.indexOf("년")));
        let cMonth = Number(creatDate.substring(creatDate.indexOf("년") + 1, creatDate.indexOf("월")));
        let cDay = Number(creatDate.substring(creatDate.indexOf("월") + 1, creatDate.indexOf("일")));
        let cHour = Number(creatDate.substring(creatDate.indexOf("일") + 1, creatDate.indexOf("시")));
        let cMinute = Number(creatDate.substring(creatDate.indexOf("시") + 1, creatDate.indexOf("분")));

        if (year != cYear) {
            return (year - cYear) + "년 경과";
        } else {
            if (month != cMonth) {
                return (month - cMonth) + "개월 경과";
            } else {
                if (day != cDay) {
                    return (day - cDay) + "일 경과";
                } else {
                    if (hour != cHour) {
                        return (hour - cHour) + "시간 경과";
                    } else {
                        if (minute != cMinute) {
                            return (minute - cMinute) + "분 경과";
                        } else {
                            return "1분 미만 경과";
                        }
                    }
                }
            }
        }
    }
}

function setUpdateButton(responseData) {
    let userId = 0;
    if (principalUser != null) {
        userId = principalUser.id;
    }
    if (userId != 0) {
        if (userId == responseData.userId) {
            const articleInfo = document.querySelector(".article-update-button");

            articleInfo.innerHTML += `
                <div>
                    <button type="button" class="update-button">
                        <i class="fa-regular fa-pen-to-square"></i>수정하기
                    </button>
                </div>
            `;

            const updateButton = document.querySelector(".update-button");

            updateButton.onclick = () => {
                if (confirm("게시물을 수정하시겠습니까?")) {
                    location.href = "/qna/update/" + responseData.id;
                }
            }
        }

    }
}

function answerCheckService() {
    const hoverAreaes = document.querySelectorAll(".hover-area");
    const imgs = document.querySelectorAll(".qna-board-req-list");
    const checkAreas = document.querySelectorAll(".check-area");

    for (let i = 0; i < hoverAreaes.length; i++) {
        hoverAreaes[i].onclick = () => {
            const classes = imgs[i].classList;
            if (classes.contains("check")) {
                imgs[i].classList.remove("check");
                checkAreas[i].classList.add("none");
            } else {
                imgs.forEach(img => {
                    img.classList.remove("check");
                })
                checkAreas.forEach(checkArea => {
                    checkArea.classList.add("none");
                })
                imgs[i].classList.add("check");
                checkAreas[i].classList.remove("none");
            }
        }
    }

}

// 답변 완료 후 답변 추가 페이지
function loadAnswer(data) {

    const answerArea = document.querySelector(".answer-area");
    const uri = location.href;
    const id = uri.substring(uri.lastIndexOf("/") + 1);
    const causerAnalysis = data.causerAnalysis;
    const solutionPlan = data.solutionPlan;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/qna/question/article/answer/" + id,
        dataType: "json",
        success: (response) => {
            console.log(response);

        },
        error: (error) => {
            console.log(error);
            alert("전송 실패");
        }
    })

    if (causerAnalysis != null && solutionPlan != null) {
        answerArea.innerHTML = `
         <div class="answer-title">
                            <span>답변</span>
                        </div>
                        <!-- 답변자 프로필 영역 -->
                        <div class="answer-profile">

                            <div class="answer-img-area">
                                <a href="" class="answer-img">
                                    <img src="/static/images/profile-icon_34378.png" alt="answer-profile-image">
                                </a>
                            </div>

                            <div class="answer-nickname-area">
                                <a href="" class="answer-nickname">하덕현HDH123</a>
                            </div>
                        </div>

                        <!-- 답변 내용 영역 -->
                        <!-- 원인 분석 영역 -->
                        <div class="causer-analysis-area">
                            <div class="causer-analysis-title">
                                <span>${data.causerAnalysis}</span>
                            </div>
                            <div class="causer-analysis-content">

                            </div>
                        </div>
                        <!-- 해결 방안 영역 -->
                        <div class="solution-plan-area">
                            <div class="solution-plan-title">
                                <span>${data.solutionPlan}</span>
                            </div>
                            <div class="solution-plan-content">

                            </div>
                        </div>
        `
    }



}