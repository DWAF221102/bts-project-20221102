const startIndex = location.href.lastIndexOf("search/") + 7;
const substringIndex = location.href.substring(startIndex, );
let searchValue = decodeURI(substringIndex);


for(let i = 1; i < 4; i++) {
    let menuId =Number(i + 1);
    const totalCountView = document.querySelectorAll(".total_count_view")[i];
    const boardList = document.querySelectorAll(".board-list")[i];
    loadBoardListRequest(menuId, searchValue, totalCountView, boardList)
}



function loadBoardListRequest(menuId, searchValue, totalCountView, boardList) { 
    let responseData= null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/totalsearch/board",
        data: {
            "menuId" : menuId,
            "searchValue" : searchValue
        },
        dataType: "json",
        success: (response) => {
            console.log(response);
            responseData = response.data;
            loadSearchBoardList(totalCountView, boardList, responseData)
        },
        error: (error) => {
            console.log(error);
        }
    });
}




function loadSearchBoardList(totalCountView, boardList, responseData) {
    
    totalCountView.innerHTML = "";
    boardList.innerHTML = "";

    responseData.forEach(data => {
        let totalCommentCount = data.commentCount + data.recommentCount;
        let time = setTime(data.createDate);

        totalCountView.innerHTML = `
            총 검색 수 : ${data.totalCount}개
        `

        if(data.categoryName != null) {
            boardList.innerHTML += `
                <li>
                    <div class="board-list-user">
                        <div class="user-img">
                            <a href=""> <img src="/image/user/${data.userImg}"></a>
                        </div>
                        <div class="user-detail">
                            <a href="">${data.nickname}</a>
                            <span>&#183;</span> 
                            <span>${time}</span>
                        </div>
                    </div>
                    <div class="board-list-title">
                        <a href="/article">${data.title}</a>
                    </div>
                    <div class="board-list-bottum">
                        <div class="board-list-category">
                            <a href="">${data.categoryName}</a>
                            <a href="">${data.subcategoryName}</a>
                        </div>
                        <div class="board-list-prefer">
                            <div class="views"><i class="fa-sharp fa-solid fa-bullseye"></i><span>${data.viewCount}</span></div>
                            <div class="comments"><i class="fa-regular fa-comment-dots"></i><span>${totalCommentCount}</span></div>
                            <div class="likes"><i class="fa-regular fa-thumbs-up"></i><span>${data.likeCount}</span></div>
                        </div>
                    </div>
                </li>
            `;
        } else {
            boardList.innerHTML += `
                <li>
                    <div class="board-list-user">
                        <div class="user-img">
                            <a href=""> <img src="/image/user/${data.userImg}"></a>
                        </div>
                        <div class="user-detail">
                            <a href="">${data.nickname}</a>
                            <span>&#183;</span> 
                            <span>${time}</span>
                        </div>
                    </div>
                    <div class="board-list-title">
                        <a href="/article">${data.title}</a>
                    </div>
                    <div class="board-list-bottum">
                        <div class="board-list-category">
                            <a href="/notice">공지사항</a>
                        </div>
                        <div class="board-list-prefer">
                            <div class="views"><i class="fa-sharp fa-solid fa-bullseye"></i><span>${data.viewCount}</span></div>
                            <div class="comments"><i class="fa-regular fa-comment-dots"></i><span>${totalCommentCount}</span></div>
                            <div class="likes"><i class="fa-regular fa-thumbs-up"></i><span>${data.likeCount}</span></div>
                        </div>
                    </div>
                </li>
            `;
        }
    });
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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