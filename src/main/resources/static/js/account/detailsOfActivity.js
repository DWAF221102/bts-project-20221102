window.onload = () => {
    const profileArea = document.querySelector(".profile-area");
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
        ${principalUser.skill}
    </div>
    <!-- 메뉴 영역 -->
    <div class="menu-list-area">
        <div class="menu-list">
            <a href=""><span>최근 활동</span></a>
            <a href=""><span>게시물</span></a>
            <a href=""><span>Q&A</span></a>
            <a href=""><span>스크랩</span></a>
        </div>
    </div>
    `
}