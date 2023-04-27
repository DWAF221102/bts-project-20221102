let menuId = null;

for(let i = 1; i < 4; i++) {
    menuId = Number(i + 1);
    const BoardDataList = document.querySelectorAll(".data-box")[i-1];
    loadBoardListRequest(BoardDataList, menuId);
}

loadQnAListRequest();

//////////////////////////////////////////////////////////////////////////////
function loadBoardListRequest(BoardDataList, menuId) { 
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
            loadBoardList(BoardDataList, responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadBoardList(BoardDataList, responseData) {
    
    BoardDataList.innerHTML = "";
    
    responseData.forEach(data => {
        let totalCommentCount = data.commentCount + data.recommentCount;
        let time = setTime(data.createDate);

        BoardDataList.innerHTML += `
            <ul class="list_type1">
                <li>
                    <a href="/myactivity/${data.userId}"  class="m_avatar"><img src="/image/user/${data.userImg}"></a>
                    <a href="/myactivity/${data.userId}"  class="m_id">${data.nickname}</a>
                    <span class="m_time">${time}</span>
                </li>
                <li>
                    <span class="like">${data.likeCount}</span>
                    <span class="comment">${totalCommentCount}</span>
                </li>
                <li class="title">
                    <a href="/article/${data.boardId}">${data.title}</a>
                </li>
            </ul>
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
    const qnaDataBox = document.querySelector(".qna-data-box");
    
    qnaDataBox.innerHTML = "";
    
    responseData.forEach(data => {
        let time = setTime(data.createDate);
        qnaDataBox.innerHTML += `
            <ul class="list_type1">
                <li>
                    <a href="/myactivity/${data.userId}"  class="m_avatar"><img src="/image/user/${data.userImg}"></a>
                    <a href="/myactivity/${data.userId}"  class="m_id">${data.nickname}</a>
                    <span class="m_time">${time}</span>
                </li>
                <li>
                    <span class="like">${data.likeCount}</span>
                    <span class="point">${data.price} P</span>
                </li>
                <li class="title">
                    <a href="/question/article/${data.boardId}">${data.title}</a>
                </li>
            </ul>
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