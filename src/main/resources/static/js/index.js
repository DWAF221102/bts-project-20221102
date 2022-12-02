let menuId = null;

for(let i = 1; i < 4; i++) {
    menuId = Number(i + 1);
    const fiveBoardList = document.querySelectorAll(".five-boardlist")[i-1];
    loadBoardListRequest(fiveBoardList, menuId);
}

loadQnAListRequest();

//////////////////////////////////////////////////////////////////////////////
function loadBoardListRequest(fiveBoardList, menuId) { 
    let responseData= null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/index/board",
        data: {
            "menuId" : menuId
        },
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadBoardList(fiveBoardList, responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadBoardList(fiveBoardlist, responseData) {
    
    fiveBoardlist.innerHTML = "";
    
    responseData.forEach(data => {
        let totalCommentCount = data.commentCount + data.recommentCount;
        let time = setTime(data.createDate);

        fiveBoardlist.innerHTML += `
            <li>
                <div class="board-list-top">
                    <div class="board-profile">
                        <a href=""><img src="/image/user/${data.userImg}"></a>
                        <a href="" class="board-profile-nick">${data.nickname}</a>
                        <span>·</span>
                        <span>${time}</span>
                    </div>
                    <div class="recommendation-icon">
                        <div>
                            <i class="fa-regular fa-thumbs-up"></i>
                        </div>
                        <span>${data.likeCount}</span>
                        <div>
                            <i class="fa-regular fa-comment-dots"></i>
                        </div>
                        <span>${totalCommentCount}</span>
                    </div>
                </div>
                <div class="board-list-bottom">
                    <a href="#">${data.title}</a>
                </div>
            </li>
        `;
    });
}


//////////////////////////////////////////////////////////////////////////////

function loadQnAListRequest() {
    let responseData= null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/index/qna",
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadQnAList(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadQnAList(responseData) {
    const qnaUl = document.querySelector(".qna-list-ul");
    
    qnaUl.innerHTML = "";
    
    responseData.forEach(data => {
        let time = setTime(data.createDate);

        qnaUl.innerHTML += `
        <li>
            <div class="board-list-top">
                <div class="board-profile">
                    <a href="#"><img src="/image/user/${data.userImg}"></a>
                    <a href="#" class="board-profile-nick">${data.nickname}</a>
                    <span>·</span>
                    <span>${time}</span>
                </div>
                <div class="recommendation-icon">
                    <div>
                        <i class="fa-regular fa-thumbs-up"></i>
                    </div>
                    <span>${data.likeCount}</span>
                </div>
            </div>
            <div class="qna-list-bottom">
                <a href="#">${data.title}</a>
                <span>${data.price} P</span>
            </div>
        </li>
        `;
    });
}



//////////////////////////////////////////////////////////////////////////////
function setTime(creatDate) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let cYear = Number(creatDate.substring(0, creatDate.indexOf("년")));
    let cMonth = Number(creatDate.substring(creatDate.indexOf("년") + 1 , creatDate.indexOf("월")));
    let cDay = Number(creatDate.substring(creatDate.indexOf("월") + 1, creatDate.indexOf("일")));
    let cHour = Number(creatDate.substring(creatDate.indexOf("일") + 1, creatDate.indexOf("시")));
    let cMinute = Number(creatDate.substring(creatDate.indexOf("시") + 1, creatDate.indexOf("분")));
    
    if(year != cYear) {
        if(year - cYear == 1){
            if((12 - cMonth + month) < 12){
                return (12 - cMonth + month) + "개월 전";
            }else {
                return "1년 전";
            }
        }else {
            return (year - cYear) + "년 전";
        }
    }else {
        if(month != cMonth) {
            if(month - cMonth == 1){
                if((31 - cDay + day) < 31){
                    return (31 - cDay + day) + "일 전";
                }else {
                    return (month - cMonth) + "개월 전";
                }
            }else {
                return (month - cMonth) + "개월 전";
            }
        }else{
            if(day != cDay) {
                return (day - cDay) + "일 전";
            }else {
                if(hour != cHour) {
                    return (hour - cHour) + "시간 전";
                }else {
                    if(minute != cMinute){
                        return (minute - cMinute) + "분 전";
                    }else {
                        return "1분 미만 전";
                    }
                }
            }
        }
    }
}