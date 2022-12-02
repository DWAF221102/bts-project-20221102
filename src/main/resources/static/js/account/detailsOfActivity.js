window.onload = () => {
    const profileArea = document.querySelector(".profile-area");
    let skill = principalUser.skill == null ? "기술 태그를 입력해주세요." : principalUser.skill;
    profileArea.innerHTML = `
     <!-- 회원 정보 영역 -->
    <div class="profile">
        <div class="profile-detail-area">
            <!-- 프로필사진 영역 -->
            <div class="profile-image">
                <img src="/image/user/${principalUser.user_img}" alt="">
            </div>
            <!-- 회원정보 상세 영역 -->
            <div class="profile-detail">
                <h2>${principalUser.nickname}</h2>
                <p>별점</p>
            </div>
        </div>
        <!-- 포인트 영역 -->
        <div class="point-area">
            <div class="point-content-area">
                <div class="point-content">
                    <b>현재 포인트</b>
                    <a>10,000P</a>
                </div>
            </div>
            <div class="point-button-area">
                <div class="point-button">
                    <a href="">충전하기</a>
                </div>
                <div class="point-button">
                    <a href="">이용내역</a>
                </div>
            </div>
        </div>
    </div>
    <!-- 스킬 입력 영역 -->
    <div class="skill-area">
        ${skill}
    </div>
    <!-- 메뉴 영역 -->
    <div class="menu-list-area">
        <div class="menu-list">
            <a class="recent" href="/myactivity"><span>최근 활동</span></a>
            <a class="article" href="/myactivity/article"><span>게시물</span></a>
            <a class="qna" href="/myactivity/qna"><span>Q&A</span></a>
            <a class="like" href="/myactivity/scrap"><span>스크랩</span></a>
        </div>
    </div>
    `


}
const boardList = document.querySelector(".board-list");

loadBoardRequest(boardList, boardId, qnaId);

function loadBoardRequest(boardList, boardId, qnaId) {
    let responseData = null;

    $.ajax({
        async: false,
        url: "/api/index/board",
        data: {
            "boardId": boardId,
            "qnaId": qnaId
        },
        dataType: "json",
        success: (response) => {
            responseData = response.data
            loadRecentActivity(boardList, responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadRecentActivity(boardList, responseData) {
    boardList.innerHTML = "";

    responseData.forEach(data => {


        let time = setTime(data.createDate);
        boardList.innerHTML = `
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
                            <a href="/article/${data.boardId}">${data.title}</a>
                        </div>
                        <div class="board-list-bottum">
                            <div class="board-list-category">
                                <a href="">${data.categoryName}</a>
                                <a href="">${data.subcategoryName}</a>
                            </div>
                            <div class="board-list-prefer">
                                <div class="views"><i class="fa-sharp fa-solid fa-bullseye"></i><span>${data.viewCount}</span></div>
                                <div class="comments"><i class="fa-regular fa-comment-dots"></i><span>${totalCommentCount}</div>
                                <div class="likes"><i class="fa-regular fa-thumbs-up"></i><span>${data.likeCount}</span></div>
                            </div>
                        </div>
    
    `
    })

}



// class BoardReqParams {
//     static #instance = null;

//     static getInstance() {
//         if (this.#instance == null) {
//             this.#instance = new BoardReqParams();
//         }
//         return this.#instance;
//     }

//     // page = 1;
//     menuId = this.setMenuId();
//     categoryId = 99;
//     subcategoryId = "99";
//     // showList = "1";
//     // searchValue = "";

//     // setPage(page) { this.page = page; }
//     // getPage() { return this.page; }

//     setMenuId() {
//         const url = location.href;
//         const menu = url.substring(url.lastIndexOf("/") + 1);

//         if (menu == "knowledge") {
//             return 2;
//         } else if (menu == "community") {
//             return 3;
//         } else if (menu == "notice") {
//             return 4;
//         }
//     }
//     getMenuId() { return this.menuId; }

//     setCategoryId(categoryId) { this.categoryId = categoryId; }
//     getCategoryId() { return this.categoryId; }

//     setSubcategoryId(subcategoryId) { this.subcategoryId = subcategoryId; }
//     getSubcategoryId() { return this.subcategoryId; }

//     // setShowList(showList) { this.showList = showList; }
//     // getShowList() { return this.showList; }

//     // setSearchValue(searchValue) { this.searchValue = searchValue; }
//     // getSearchValue() { return this.searchValue; }

//     getObject() {
//         return {
//             // page: this.page,
//             menuId: this.menuId,
//             categoryId: this.categoryId,
//             subcategoryId: this.subcategoryId
//             // showList: this.showList,
//             // searchValue: this.searchValue
//         }
//     }
// }

// class BoardApi {
//     static #instance = null;

//     static getInstance() {
//         if (this.#instance == null) {
//             this.#instance = new BoardApi();
//         }
//         return this.#instance;
//     }

//     loadBoardRequest() {
//         let data = BoardReqParams.getInstance().getObject();
//         console.log(data);
//         let responseData = null;
//         $.ajax({
//             async: false,
//             url: "/api/board/",
//             data: data,
//             dataType: "json",
//             success: (response) => {
//                 console.log(response);
//                 responseData = response.data;
//             },
//             error: (error) => {
//                 console.log(error);
//             }
//         });
//         return responseData;
//     }
// }



// class BoardLoad {
//     static #instance = null;

//     static getInstance() {
//         if (this.#instance == null) {
//             this.#instance = new BoardLoad();
//         }
//         return this.#instance;
//     }

//     loadList() {
//         let responseData = BoardApi.getInstance().loadBoardRequest();
//         const boardList = document.querySelector(".board-list");
//         boardList.innerHTML = "";

//         responseData.forEach(data => {
//             let totalCommentCount = data.commentCount + data.recommentCount;
//             let time = TimeService.getInstance().setTime(data.createDate);
//             if (data.categoryName != null) {
//                 boardList.innerHTML += `
//                     <li>
//                         <div class="board-list-user">
//                             <div class="user-img">
//                                 <a href=""> <img src="/image/user/${data.userImg}"></a>
//                             </div>
//                             <div class="user-detail">
//                                 <a href="">${data.nickname}</a>
//                                 <span>&#183;</span>
//                                 <span>${time}</span>
//                             </div>
//                         </div>
//                         <div class="board-list-title">
//                             <a href="/article/${data.boardId}">${data.title}</a>
//                         </div>
//                         <div class="board-list-bottum">
//                             <div class="board-list-category">
//                                 <a href="">${data.categoryName}</a>
//                                 <a href="">${data.subcategoryName}</a>
//                             </div>
//                             <div class="board-list-prefer">
//                                 <div class="views"><i class="fa-sharp fa-solid fa-bullseye"></i><span>${data.viewCount}</span></div>
//                                 <div class="comments"><i class="fa-regular fa-comment-dots"></i><span>${totalCommentCount}</div>
//                                 <div class="likes"><i class="fa-regular fa-thumbs-up"></i><span>${data.likeCount}</span></div>
//                             </div>
//                         </div>
//                     </li>
//                 `
//             } else {
//                 boardList.innerHTML += `
//                     <li>
//                         <div class="board-list-user">
//                             <div class="user-img">
//                                 <a href=""> <img src="${data.userImg}"></a>
//                             </div>
//                             <div class="user-detail">
//                                 <a href="">${data.nickname}</a>
//                                 <span>&#183;</span>
//                                 <span>${time}</span>
//                             </div>
//                         </div>
//                         <div class="board-list-title">
//                             <a href="/article">${data.title}</a>
//                         </div>
//                         <div class="board-list-bottum">
//                             <div class="board-list-category">
//                                 <a href="/notice">공지사항</a>
//                             </div>
//                             <div class="board-list-prefer">
//                                 <div class="views"><i class="fa-sharp fa-solid fa-bullseye"></i><span>${data.viewCount}</span></div>
//                                 <div class="comments"><i class="fa-regular fa-comment-dots"></i><span>${totalCommentCount}</div>
//                                 <div class="likes"><i class="fa-regular fa-thumbs-up"></i><span>${data.likeCount}</span></div>
//                             </div>
//                         </div>
//                     </li>
//                 `
//             }

//         });

//         // if (responseData.length != 0) {
//         //     PageService.getInstance().addService(responseData[0].totalCount);
//         // } else {
//         //     PageService.getInstance().addService(1);
//         // }

//     }
// }

// class TimeService {
//     static #instance = null;

//     static getInstance() {
//         if (this.#instance == null) {
//             this.#instance = new TimeService();
//         }
//         return this.#instance;
//     }

//     setTime(createDate) {
//         let date = new Date();
//         let year = date.getFullYear();
//         let month = date.getMonth() + 1;
//         let day = date.getDate();
//         let hour = date.getHours();
//         let minute = date.getMinutes();


//         let cYear = Number(createDate.substring(0, createDate.indexOf("년")));
//         let cMonth = Number(createDate.substring(createDate.indexOf("년") + 1, createDate.indexOf("월")));
//         let cDay = Number(createDate.substring(createDate.indexOf("월") + 1, createDate.indexOf("일")));
//         let cHour = Number(createDate.substring(createDate.indexOf("일") + 1, createDate.indexOf("시")));
//         let cMinute = Number(createDate.substring(createDate.indexOf("시") + 1, createDate.indexOf("분")));

//         if (year != cYear) {
//             return (year - cYear) + "년 전";
//         } else {
//             if (month != cMonth) {
//                 return (month - cMonth) + "개월 전";
//             } else {
//                 if (day != cDay) {
//                     return (day - cDay) + "일 전";
//                 } else {
//                     if (hour != cHour) {
//                         return (hour - cHour) + "시간 전";
//                     } else {
//                         if (minute != cMinute) {
//                             return (minute - cMinute) + "분 전";
//                         } else {
//                             return "1분 미만 전";
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

// class BoardService {
//     static #instance = null;

//     static getInstance() {
//         if (this.#instance == null) {
//             this.#instance = new BoardService();
//         }
//         return this.#instance;
//     }

//     constructor() {
//         BoardAsideService.getInstance().addAside();
//         BoardLoad.getInstance().loadList();
//         ShowListService.getInstance().addButtonEvent();
//         SearchService.getInstance().addEvent();
//         WriteButtonService.getInstance().addButtonEvent();
//     }

// }

// window.onload = () => {
//     new BoardService();

// } 