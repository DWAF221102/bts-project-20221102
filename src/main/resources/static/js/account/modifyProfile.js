window.onload = () => {
    const myProfile = document.querySelector(".myprofile-info");
    myProfile.innerHTML = `
        <!-- 회원정보 상세 영역 -->
        <input type="hidden" id="id" value="${principalUser.id}">
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
                <input class="myprofile-info-input" id="phone" type="text" placeholder="전화 번호를 입력해주세요." value="${principalUser.phone}">
            </div>
            <div>
                <label class="myprofile-info-title" for="">관심있는 기술 태그 입력</label>
                <input class="myprofile-info-input" id="skill" type="text" placeholder="기술 태그를 입력해주세요." value="${principalUser.skill == null ? "" : principalUser.skill}">
            </div>
        </div>
        <!-- 프로필 사진 영역 -->
        <div class="myprofile-image-area">
            <form class="profile-image-form">
                <input class="profile-image-input" type="file" name="file">
                <img class="profile-image" src="/image/user/${principalUser.user_img}" alt="profileImage">
            </form>

        </div>
    `;
    const saveButton = document.querySelector(".save-button");
    const profileInfo = document.querySelectorAll(".myprofile-info-input");

    // 프로필 이미지 수정
    let profileImage = document.querySelector(".profile-image");
    let imageInput = document.querySelector(".profile-image-input");

    console.log(profileImage)

    profileImage.onclick = () => {
        imageInput.click();
    }

    imageInput.onchange = () => {
        let file = imageInput;
        // 서버에 이미지 전송
        let profileImageForm = document.querySelector(".profile-image-form");

        // FormData 객체 이용해 form 태그의 필드와 값을 K/V를 담음.
        let formData = new FormData(profileImageForm);

        $.ajax({
            async: false,
            type: "post",
            url: "/api/account/myprofile",
            data: formData,
            contentType: false, //필수 : x-www-form-urlencoded로 파싱되는 것을 방지
            processData: false, //필수 : contentType을 false로 줬을 때 QueryString 자동 설정
            dataType: "json",
            enctype: "multipart/form-data",
            success: (response) => {
                alert("변경 성공. 사진이 등록되었습니다.");
                location.reload();
            },
            error: (error) => {
                alert("사진 등록 실패");
                console.log(error);
            }
        })
    }

    // 회원 정보 수정
    saveButton.onclick = () => {
        const modifyCheck = confirm("정보를 수정하시겠습니까?");

        let profileData = {
            id: $("#id").val(),
            name: $("#name").val(),
            nickname: $("#nickname").val(),
            phone: $("#phone").val(),
            skill: $("#skill").val()
        };

        console.log(profileData)

        //컨펌 확인 클릭시 정보 수정 가능
        if (modifyCheck) {
            if (profileData.nickname.trim() === "" || profileData.phone.trim() === "") {
                alert("공백 또는 입력하지 않은 부분이 있습니다.");
                return false;
            } else {
                $.ajax({
                    async: false,
                    type: "put",
                    url: "/api/account/myprofile",
                    data: JSON.stringify(profileData),
                    contentType: "application/json",
                    dataType: "json",
                    success: (response) => {
                        alert("회원 수정이 완료되었습니다.");
                        location.reload();
                    },
                    error: (error) => {
                        console.log(error);
                        alert(error.responseJSON.data.error);
                    }
                })
            }
        }
    }

}






 // imageInput.onchange = () => {

    //     // 서버에 이미지 전송
    //     let profileImageForm = document.querySelector(".profile-image-form");
    //     let formData = new FormData(profileImageForm);
    //     let file = imageInput.files[0];
    //     console.log(file);

    //     $.ajax({
    //         async: false,
    //         type: "put",
    //         url: "/api/account/myprofile",
    //         data: formData,
    //         contentType: false, //필수 : x-www-form-urlencoded로 파싱되는 것을 방지
    //         processData: false, //필수 : contentType을 false로 줬을 때 QueryString 자동 설정
    //         dataType: "json",
    //         enctype: "multipart/form-data",
    //         success: (response) => {

    //             alert("사진 전송");
    //         },
    //         error: (error) => {
    //             console.log(error);
    //         }

    //     })
    //     }
    // 프로필 이미지 수정
    // let imageInput = document.querySelector(".profile-image-input");