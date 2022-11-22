window.onload = () => {
    const myProfile = document.querySelector(".myprofile-info");
    myProfile.innerHTML = `
        <!-- 회원정보 상세 영역 -->
        <div class="myprofile-info-area">
            <div>
                <label class="myprofile-info-title" for="">이름</label>
                <input class="myprofile-info-input" type="text" id="name" value="${principalUser.name}" readonly>
            </div>
            <div>
                <label class="myprofile-info-title" for="">닉네임</label>
                <input class="myprofile-info-input" id="nickname" type="text" value="${principalUser.nickname}">
            </div>
            <div>
                <label class="myprofile-info-title" for="">전화 번호</label>
                <input class="myprofile-info-input" id="phone" type="text" value="${principalUser.phone}">
            </div>
            <div>
                <label class="myprofile-info-title" for="">관심있는 기술 태그 입력</label>
                <input class="myprofile-info-input" id="skill" type="text" placeholder="기술 태그를 입력해주세요." value="${principalUser.skill == null ? "" : principalUser.skill}">
            </div>
        </div>
        <!-- 프로필 사진 영역 -->
        <div class="myprofile-image-area">
            <input class="myprofile-image" type="image" src="/static/images/logo_bts.png">
        </div>
    `
}
const saveButton = document.querySelector(".save-button");
const profileInfo = document.querySelectorAll(".myprofile-info-input");

saveButton.onclick = () => {
    const modifyCheck = confirm("정보를 수정하시겠습니까?");

    let profileData = {
        id: $("#id").val(),
        name: $("#name").val(),
        nickname: $("#nickname").val(),
        phone: $("#phone").val(),
        skill: $("#skill").val()
    };

    //컨펌 확인 클릭시 정보 수정 가능
    if (modifyCheck) {
        if (profileData.nickname.trim() === "" || profileData.phone.trim() === "") {
            alert("공백 또는 입력하지 않은 부분이 있습니다.");
            return false;
        } else {
            $.ajax({
                async: false,
                type: "put",
                url: "/api/account/myProfile",
                data: JSON.stringify(profileData),
                contentType: "application/json",
                dataType: "json",
                success: (response) => {
                    alert("회원 수정 완료~~~~~!");
                },
                error: (error) => {
                    alert("전송 실패");
                }
            })
        }
    }
}





