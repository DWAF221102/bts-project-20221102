window.onload = () => {
    getList();
    // answerCheckService();
    // loadAnswer();
}

// 게시글 정보 요청
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
            // loadAnswer(response.data);
            // answerCheckService(response.data);
            // getRequestUserList(response.data);
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

    if (data.status == "대기중") {
        let requestUser = getRequestUserList(data);

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
            `;
            if (requestUser != null) {
                selectAnswer(data.id, requestUser);
            }

            // 클릭시 업데이트 날라가야하는 부분 -> 함수로 처리 -> selectedUser()

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
            requestTitleBtn.onclick = () => {
                let requestUserInfo = {
                    qnaBoardId: data.id,
                    userId: principalUser.id
                }

                $.ajax({
                    async: false,
                    type: "post",
                    url: "/api/qna/request/user/save",
                    contentType: "application/json",
                    data: JSON.stringify(requestUserInfo),
                    dataType: "json",
                    success: (response) => {
                        console.log(response.data);
                        alert("답변요청 완료.");
                        location.reload();
                    },
                    error: (error) => {
                        console.log(error);
                        alert(error.responseJSON.data.requestUser);
                    }
                });
            }
        }
    } else if (data.status == "진행중") {
        let user = loadAnswerApi(data.id);

        const requestTitle = document.querySelector(".qna-board-req-title");
        const requestUser = document.querySelector(".qna-board-req-lists");

        requestTitle.innerHTML = `
            선택된 답변자
        `

        requestUser.innerHTML = `
            <div class="qna-profile-img qna-board-req-list">
                <img src="/image/user/${user.userImg}">
            </div>
            <div>
                <div>닉네임: <a href="/myactivity/${user.userId}">${user.nickName}</a></div>
                <div>별점: ${user.scoreAvg}</div>
                <div>스택: ${user.skill}</div>
            </div>
        `

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
                <button type="button" class="request-ok-button request-button">
                    <div>
                        <span class="request-choise">답변 완료(끝내기)</span>
                    </div>
                    <div>
                        <span class="request-time">${time}</span>
                    </div>
                </button>
            `

            const requestOkBtn = document.querySelector(".request-ok-button");

            requestOkBtn.onclick = () => {
                updateStatus(data);
            }
        }
        // 나중에 else if를 통해서 선택된 답변자 id와 id를 비교해서 띄워야함.
        // else는 그 외 웹 사용자들에게 띄워 줄 답변중... 대기중... 등으로 변경
        else {
            requestButtonArea.innerHTML = `
                <button type="button" class="request-answer-button request-button">
                    <div>
                        <span class="request-choise">답변하기</span>
                    </div>
                    <div>
                        <span class="request-time">${time}</span>
                    </div>
                </button>
            `
        }
    } else if (data.status == "답변완료") {
        // 덕현이형 작업한 부분 불러와야함.
        let user = loadAnswerApi(data.id);

        const requestTitle = document.querySelector(".qna-board-req-title");
        const requestUser = document.querySelector(".qna-board-req-lists");

        requestTitle.innerHTML = `
            선택된 답변자
        `

        requestUser.innerHTML = `
            <div class="qna-profile-img qna-board-req-list">
                <img src="/image/user/${user.userImg}">
            </div>
            <div>
                <div>닉네임: <a href="/myactivity/${user.userId}">${user.nickName}</a></div>
                <div>별점: ${user.scoreAvg}</div>
                <div>스택: ${user.skill}</div>
            </div>
        `

        requestButtonArea.innerHTML = `
                <button type="button" class="request-ok-button request-button">
                    <div>
                        <span class="request-choise">답변 완료된 게시물</span>
                    </div>
                    <div>
                        <span class="request-time">${time}</span>
                    </div>
                </button>
        `
    } else {
        console.log(data.status);
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

// 답변자 체크 이미지 클릭 이벤트, 재효
function answerCheckService(data) {
    const hoverAreaes = document.querySelectorAll(".hover-area");
    const imgs = document.querySelectorAll(".qna-board-req-list");
    const checkAreas = document.querySelectorAll(".check-area");

    let userId = null;
    if (principalUser != null) {
        userId = principalUser.id;
    }

    if (userId == data.userId) {
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

}

// 답변 완료 후 답변 추가 페이지
function selectAnswer(id, data) {
    const requestButton = document.querySelector(".request-choise-button");

    requestButton.onclick = () => {
        const check = document.querySelector(".check");

        if (check != null) {
            const reqList = document.querySelectorAll(".qna-board-req-list");
            for (let i = 0; i < reqList.length; i++) {
                if (reqList[i].classList.contains("check")) {
                    let nickname = data[i].nickName;

                    if (confirm(nickname + "님을 선택하시겠습니까?")) {
                        selectAnswerApi(id, data[i].userId);
                        selectedUser(data[i]);
                    }
                }
            }
        } else {
            alert("답변자를 선택해 주세요");

        }

    }
}


function selectedUser(data) {
    const requestTitle = document.querySelector(".qna-board-req-title");
    const requestUser = document.querySelector(".qna-board-req-lists");

    requestTitle.innerHTML = `
        선택된 답변자
    `

    requestUser.innerHTML = `
        <div class="qna-profile-img qna-board-req-list">
            <img src="/image/user/${data.userImg}">
        </div>
        <div>
            <div>닉네임: <a href="/myactivity/${data.userId}">${data.nickName}</a></div>
            <div>별점: ${data.scoreAvg}</div>
            <div>스택: ${data.skill}</div>
        </div>
    `;
}

function selectAnswerApi(id, userId) {
    let data = {
        "id": id,
        "userId": userId
    }

    $.ajax({
        async: false,
        type: "put",
        url: "/api/qna/question/article/answer/select",
        data: data,
        dataType: "json",
        success: (response) => {
            console.log(response);
            alert("선택완료");
        },
        error: (error) => {
            console.log(error);
            console.log("답변자 선택 실패");
        }
    })
}

// qna 답변자 목록 부르기
function getRequestUserList(data) {
    let qnaBoardId = data.id;
    let responseData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/qna/request/user/list/" + qnaBoardId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadRequestUserList(responseData);
            answerCheckService(data);
            console.log(responseData);

        },
        error: (error) => {
            console.log(error);
        }
    });

    return responseData;
}

function loadRequestUserList(responseData) {
    const reqUserLists = document.querySelector(".qna-board-req-lists");

    reqUserLists.innerHTML = "";

    responseData.forEach(data => {
        let scoreAvg = parseFloat(data.scoreAvg).toFixed(1);

        reqUserLists.innerHTML += `
            <div class="hover-area">
                <div class="qna-profile-img qna-board-req-list">
                    <img src="/image/user/${data.userImg}">
                </div>
                <div class="hover-profile hover-togle">
                    <div>닉네임: <a href="/myactivity/${data.userId}">${data.nickName}</a></div>
                    <div>별점: ${scoreAvg}</div>
                    <div>스택: ${data.skill}</div>
                </div>
                <div class="check-area none">
                    <img src="/static/images/pngwing.com.png" alt="">
                </div>
            </div>
        `
    })
}

// 답변자 데이터 가져오기, 재효
function loadAnswerApi(id) {
    let user = null;
    $.ajax({
        async: false,
        type: "get",
        url: "/api/qna/load/answer/selected/" + id,
        dataType: "json",
        success: (response) => {
            console.log(response);
            user = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    })
    return user;
}

// qna status 값 업데이트 
function updateStatus(data) {
    let statusIdChange = 0;

    if (data.status == '대기중') {
        statusIdChange = 2
    } else if (data.status == '진행중') {
        statusIdChange = 3
    }

    let statusInfo = {
        boardId: data.id,
        statusId: statusIdChange
    };

    $.ajax({
        async: false,
        type: "put",
        url: "/api/qna/status/update",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(statusInfo),
        success: (response) => {
            console.log("status변경완료");
            location.reload();
        },
        error: (error) => {
            console.log(error);
        }
    })
}


// 답변 완료 후 답변 내용 - 하덕현
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