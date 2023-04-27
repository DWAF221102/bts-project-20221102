const loginBefore = document.querySelector(".login_area");
const loginAfter = document.querySelector(".top_info");

loginHeader();

function loginHeader() {
    if(principalUser != null) {
        loginAfter.innerHTML = `
            <div class="iconinfo">
                <a href="/myactivity/scrap/${principalUser.id}">
                <img src="/static/images/ico_bmak.svg" alt="스크랩">
                </a>
                <a href="#" class="noti">
                <img src="/static/images/ico_noti.svg" alt="알림">
                <span class="alarm"></span>
                </a>
            </div>
            <div class="myinfo">
                <a href="/myprofile"><img src="/image/user/${principalUser.user_img}"></a>
                <span class="id">
                <a href="/myprofile">${principalUser.nickname}님</a>
                </span>
                <ul class="myinfo_dropdown">
                <li><a href="/myprofile">내 프로필</a></li>
                <li><a href="/myactivity/${principalUser.id}">활동내역</a></li>
                <li><a href="/logout">로그아웃</a></li>
                </ul>
            </div>
        `
        loginAfter.classList.remove('top_info_invisible');
        loginBefore.classList.add('login_area_invisible');
    }
}

// total search
const searchBtn = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");

searchInput.onkeyup = () => {
    if (window.event.keyCode == 13) {
        searchBtn.click();
    }
}

searchBtn.onclick = () => {
    if (searchInput.value == "") {
        alert("검색어를 입력해주세요.");
    } else {
        location.href = "/totalsearch/" + searchInput.value;
    }
}