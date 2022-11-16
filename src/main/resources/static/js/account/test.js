const userHeaderList = document.querySelector(".User_header_List");
const mypageMenue = document.querySelector(".mypage-Menue");
let principalUser = getPrincipal();

headerLoad();
mypageLoad();
function headerLoad() {
    if (principalUser != null) {
        userHeaderList.innerHTML = `
         <li><a>${principalUser.name}님</a></li><span>&#124;</span>
         <li><a href="/user/mypage">마이페이지</a></li><span>&#124;</span>
         <li><a href="/logout">로그아웃</a></li>
      `;
    }
}

function mypageLoad() {
    if (principalUser == null) {
        mypageMenue.innerHTML = `
         <a href="/auth/login"><span>내 서재</span></a>
         <ul class="subMenu">
            <li><a href="/auth/login">대여도서</a></li>
            <li><a href="/auth/login">연체도서</a></li>
         </ul>
      `;
    } else if (principalUser.roles == "ROLE_USER") {
        mypageMenue.innerHTML = `
            <a href="/lib/loanbook"><span>내 서재</span></a>
            <ul class="subMenu">
               <li><a href="/lib/loanbook">대여도서</a></li>
               <li><a href="/lib/latebook">연체도서</a></li>
            </ul>   
      `;
    } else if (principalUser.roles == "ROLE_ADMIN,ROLE_USER") {
        mypageMenue.innerHTML = `
         <a href="/lib/loanbook"><span>내 서재</span></a>
         <ul class="subMenu">
            <li><a href="/lib/totalLoanBook">총 대여도서</a></li>
            <li><a href="/lib/totalLateBook">총 연체도서</a></li>
         </ul>
      `;
    } else {
        mypageMenue.innerHTML = ``;
    }
}