const userHeaderList = document.querySelector(".account-area");

let principalUser = getPrincipal();

loginHeader();




// header
function loginHeader() {
    if (principalUser != null) {
        userHeaderList.innerHTML = `
        <div class="account-area-box">
            <a class="icon" href="/#"><i class="fa-solid fa-bookmark"></i></a>
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



// principal
async function getAuthenticationReq() {

    const url = "/api/v1/authentication";
    const response = await fetch(url);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Failed to get Authentication." + response);
    }
}
function getPrincipal() {
    let principalUser = null;
    $.ajax({
        type: "get",
        url: "/api/v1/auth/principal",
        async: false,
        dataType: "json",
        success: (response) => {
            if (response.data != null) {
                principalUser = response.data.user;
                console.log(principalUser)
            }
        },
        error: () => {
            console.log("비동기 처리 오류");
        }
    });
    return principalUser;
}
