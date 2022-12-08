let url = location.href;
let userId = url.substring(url.lastIndexOf("/") + 1);
window.onload = () => {
    const profileArea = document.querySelector(".profile-area");

    let responseData = userInfoRequest(userId);
    let skill = responseData.skill == null ? "기술 태그를 입력해주세요." : responseData.skill;
    let scoreAvg = parseFloat(responseData.score_avg).toFixed(1);
    if (userId == principalUser.id) {
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

function loadRecentActivityRequest() {
    let response = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/myactivity/" + userId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadRecentActivity(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    })
}

function loadRecentActivity(responseData) {
    const boarderList = document.querySelector(".boader-list");

    boarderList.innerHTML = "";

    responseData.forEach(data => {

        if (data.subcategoryName == null) {
            boarderList.innerHTML += `
                <li>
                    <div class="post">
                        <div class="post-header">
                            <div class="post-title">
                                <div class="post-subcategory">공지사항</div>
                                <div>의 게시물을 작성하였습니다.</div>
                            </div>
                            <div>${data.createDate}</div>
                        </div>
                        <div class="article-href">
                            <a href="/article/${data.id}">${data.title}</a>
                        </div>
                    </div>
                </li>
            `;
        } else {
            boarderList.innerHTML += `
                <li>
                    <div class="post">
                        <div class="post-header">
                            <div class="post-title">
                                <div class="post-subcategory">${data.subcategoryName}</div>
                                <div>의 게시물을 작성하였습니다.</div>
                            </div>
                            <div>${data.createDate}</div>
                        </div>
                        <div class="article-href">
                            <a href="/article/${data.id}">${data.title}</a>
                        </div>
                    </div>
                </li>
            `;
        }
    });
}