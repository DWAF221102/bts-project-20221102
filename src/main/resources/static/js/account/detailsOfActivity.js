let url = location.href;
let userId = url.substring(url.lastIndexOf("/") + 1);
// 프로필 영역
window.onload = () => {


    const profileArea = document.querySelector(".profile-area");

    let responseData = userInfoRequest(userId);
    let pointData = loadPoint(userId);

    // 프로필 영역 값(기술, 점수)
    let skill = responseData.skill == null ? "기술 태그를 입력해주세요." : responseData.skill;
    let scoreAvg = parseFloat(responseData.score_avg).toFixed(1);


    if (principalUser == null) {
        profileArea.innerHTML = `
     <!-- 회원 정보 영역 -->
    <div class="profile">
        <div class="profile-detail-area">
            <!-- 프로필사진 영역 -->
            <div class="profile-image">
                <img src="/image/user/${responseData.user_img}" alt="">
            </div>
            <!-- 회원정보 상세 영역 -->
            <div class="profile-detail">
                <h2>${responseData.nickname}</h2>
                <span class="score"><img class="star-image" src="/static/images/star.svg"> ${scoreAvg}</span>
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
            <a class="recent" href="/myactivity/${userId}"><span>최근 활동</span></a>
            <a class="article" href="/myactivity/article/${userId}"><span>게시물</span></a>
            <a class="qna" href="/myactivity/qna/${userId}"><span>Q&A</span></a>
            <a class="like" href="/myactivity/scrap/${userId}"><span>좋아요</span></a>
        </div>
    </div>
    `
    } else if (userId == principalUser.id) {
        profileArea.innerHTML = `
     <!-- 회원 정보 영역 -->
    <div class="profile">
        <div class="profile-detail-area">
            <!-- 프로필사진 영역 -->
            <div class="profile-image">
                <img src="/image/user/${responseData.user_img}" alt="">
            </div>
            <!-- 회원정보 상세 영역 -->
            <div class="profile-detail">
                <h2>${responseData.nickname}</h2>
                <p><i class="fa-solid fa-star"></i>${scoreAvg}</p>
            </div>
        </div>
        <!-- 포인트 영역 -->
        <div class="point-area">
            <div class="point-content-area">
                <div class="point-content">
                    <b>현재 포인트</b>
                    <a class="point">${pointData.total_point}<span class="currency">Point</span></a>
                </div>
            </div>
            <div class="point-button-area">
                <div class="point-button">
                    <a href="/point/${userId}" target="_blank">충전하기</a>
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
            <a class="recent" href="/myactivity/${userId}"><span>최근 활동</span></a>
            <a class="article" href="/myactivity/article/${userId}"><span>게시물</span></a>
            <a class="qna" href="/myactivity/qna/${userId}"><span>Q&A</span></a>
            <a class="like" href="/myactivity/scrap/${userId}"><span>좋아요</span></a>
        </div>
    </div>
    `
    } else {
        profileArea.innerHTML = `
     <!-- 회원 정보 영역 -->
    <div class="profile">
        <div class="profile-detail-area">
            <!-- 프로필사진 영역 -->
            <div class="profile-image">
                <img src="/image/user/${responseData.user_img}" alt="">
            </div>
            <!-- 회원정보 상세 영역 -->
            <div class="profile-detail">
                <h2>${responseData.nickname}</h2>
                <p><i class="fa-solid fa-star"></i>${scoreAvg}</p>
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
            <a class="recent" href="/myactivity/${userId}"><span>최근 활동</span></a>
            <a class="article" href="/myactivity/article/${userId}"><span>게시물</span></a>
            <a class="qna" href="/myactivity/qna/${userId}"><span>Q&A</span></a>
            <a class="like" href="/myactivity/scrap/${userId}"><span>좋아요</span></a>
        </div>
    </div>
    `
    }
}

// 프로필 영역
function userInfoRequest(userId) {
    let responseData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/user/" + userId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            console.log(responseData);
        },
        error: (error) => {
            console.log(error);
        }

    });
    return responseData;
}

// 포인트 조회
function loadPoint(userId) {
    let pointData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/myactivity/point/" + userId,
        dataType: "json",
        success: (response) => {
            pointData = response.data;
            console.log(response);
            console.log("point: " + pointData);
        },
        error: (error) => {
            console.log(error);
            alert("포인트 실패");
        }
    });
    return pointData;
}

// 최근 활동 영역
loadRecentActivityRequest(userId);

function loadRecentActivityRequest(userId) {
    let response = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/myactivity/" + userId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            console.log(responseData);
            loadRecentActivity(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadRecentActivity(responseData) {
    const boardList = document.querySelector(".board-list");

    boardList.innerHTML = "";

    responseData.forEach(data => {

        if (data.menuName == null) {
            boardList.innerHTML += `
                <li>
                    <div class="post">
                        <div class="post-header">
                            <div class="post-title">
                                <div class="post-subcategory">공지사항</div>
                                <div class="post-content">의 게시물을 작성하였습니다.</div>
                            </div>
                            <div class="post-date">${data.createDate}</div>
                        </div>
                        <div class="article-href">
                            <a class="article-content" href="/article/${data.boardId}">${data.title}</a>
                        </div>
                    </div>
                </li>
            `;
        } else {
            boardList.innerHTML += `
                <li>
                    <div class="post">
                        <div class="post-header">
                            <div class="post-title">
                                <div class="post-menu">${data.menuName}</div>
                                <div class="post-content">의 게시물을 작성하였습니다.</div>
                            </div>
                            <div class="post-date">${data.createDate}</div>
                        </div>
                        <div class="article-href">
                            <a class="article-content" href="/article/${data.boardId}">${data.title}</a>
                        </div>
                    </div>
                </li>
            `;
        }
    });
}