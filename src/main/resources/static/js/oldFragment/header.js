const userHeaderList = document.querySelector(".account-area");
let id = principalUser.id;

loginHeader();

// header
function loginHeader() {
    if (principalUser != null) {
        userHeaderList.innerHTML = `
        <div class="account-area-box">
            <a class="icon" href="/myactivity/scrap/${id}"><i class="fa-solid fa-bookmark"></i></a>
            <a class="icon" href="#"><i class="fa-solid fa-bell"></i></a>
            <div class="profile-img-area">
                <button class="profile-img-button" type="button">
                    <img class="profile-img" src="/image/user/${principalUser.user_img}">
                </button>
                <div class="mybox-area">
                <div class="mybox mybox-invisible" >
                    <a href="/myprofile">내 프로필</a>
                    <a href="/myactivity/${id}">활동내역</a>
                    <a href="/logout">로그아웃</a>
                </div>
               </div>
            </div> 
        </div> 
        `
    }

}

// mypage slide
const profileImg = document.querySelector(".profile-img-button");

$('.profile-img-button').click(function () {
    $('.mybox-invisible').fadeToggle();
})


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





