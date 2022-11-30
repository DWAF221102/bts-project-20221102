const userHeaderList = document.querySelector(".account-area");

loginHeader();

// header
function loginHeader() {
    if (principalUser != null) {
        userHeaderList.innerHTML = `
        <div class="account-area-box">
            <a class="icon" href="/myactivity/scrap"><i class="fa-solid fa-bookmark"></i></a>
            <a class="icon" href="#"><i class="fa-solid fa-bell"></i></a>
            <div class="profile-img-area">
                <button class="profile-img-button" type="button">
                    <img class="profile-img" src="/static/images/logo.png">
                </button>
                <div class="mybox-area">
                <div class="mybox mybox-invisible" >
                    <a href="/myprofile">내 프로필</a>
                    <a href="/myactivity">활동내역</a>
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




