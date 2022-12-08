window.onload = () => {
    getList();
}

function getList() {
    const uri = location.href;
    const id = uri.substring(uri.lastIndexOf("/") + 1);

    $.ajax({
        async: false,
        type: "get",
        url: "/api/qna/qnaLists/" + id,
        dataType: "json",
        success: (response) => {
            console.log(response);
            img(response.data);
            writer(response.data);
            titleCreate(response.data);
            boardInfo(response.data);
            boardDetails(response.data);
            writer(response.data);
        },
        error: (error) => {
            console.log(error);
        }

    });
    
}

function img(data) {
    const qnaImg = document.querySelector(".qna-board-img")
    let qnaImgFiles = data.qnaImgFiles;
    articleImgList = new Array();

    let k = 0;
    qnaImg.innerHTML = `
    <div class="img-box">
        <i class="fa-shrap fa-solid fa-angle-left"></i>
        <i class="fa-shrap fa-solid fa-angle-right"></i>
        <img class="img-content" src="/image/qna/${data.qnaImgFiles[k].temp_name}">
    </div>
    `;
    
    for(let i = 0; i < qnaImgFiles.length; i++){
        articleImgList.push(data.qnaImgFiles[i].temp_name);
        console.log(articleImgList);

    };

    const rightButton = document.querySelector(".fa-angle-right");
    rightButton.onclick = () => {
        if(k < qnaImgFiles.length-1){
            const imgContent = document.querySelector(".img-content");
            k++;
            imgContent.src = `/image/qna/${articleImgList[k]}`;
            console.log([k])
        }

    }

    const leftButton = document.querySelector(".fa-angle-left");
    leftButton.onclick = () => {
        if(k < qnaImgFiles.length && k>=1){
            const imgContent = document.querySelector(".img-content");
            k--;
            imgContent.src = `/image/qna/${articleImgList[k]}`;
            console.log([k])
        }

    }

}

function addCreate(qnaLists) {
    const listBody = document.querySelector(".list-body");

    listBody.innerHTML = "";

    qnaLists.forEach((qna) => {
        listBody.innerHTML += `
    <tr>
        <td class="user-id">${qna.nickname}</td>
        <td>${qna.subcategoryName}</td>
        <td>${qna.title}</td>
        <td>${qna.status}</td>
        <td><button type="button" class="detail-button">상세보기</button></td>
        <td><button type="button" class="delete-button">삭제</button></td>
    </tr>
    <tr class="detail-invisible qna-detail">
        <td colspan="6">
            <textarea class="detail-box" disabled>그냥 모르겠습니다.</textarea>
        </td>
    </tr>
        `;
    });
}
        // <img src="/image/user/${data.userImg}" alt="">

function writer(data) {
    const qnaWriter = document.querySelector(".qna-board-profile-flex");
    qnaWriter.innerHTML = `
    <a href="" class="qna-profile-img">

    </a>
    <div class="qna-board-profile-details">
        <a href="" class="qna-profile-name">${data.nickname}</a>
        <div class="qna-profile-text">
            <span>좋아요</span>
            <span> </span>
            <span>시간</span>
            <span> </span>
            <span>뷰</span>
        </div>
    </div>
    `;
}

function titleCreate(data) {

    const qnaTitle = document.querySelector(".qna-board-top");
    qnaTitle.innerHTML = `
        <div>
            <div class="qna-board-category">
                ${data.categoryName}
            </div>
            <p class="qna-content-name">
                ${data.title}
            </p>
        </div>
    `;

}

function boardInfo(data) {
    const boardInfos = document.querySelector(".board-info");
    boardInfos.innerHTML =`
    <div class="qna-board-info-category">
        <div class="qna-board-info-category-left">
            프로그램/버전
        </div>
        <div class="qna-board-info-category-right">
            ${data.subcategoryName}
        </div>

    </div>

    <div class="qna-board-price">
        <div class="qna-board-price-left">
            질문금액
        </div>
        <div class="qna-board-price-right">
            ${data.price} p
        </div>
    </div>
    `

}

function boardDetails(data) {
    const boardDetails = document.querySelector(".qna-error")
    boardDetails.innerHTML = `
    <div class="qna-error">
    <div class="qna-error-title">
        문제설명
    </div>
    <div class="qna-error-description">
        <p class="error-details">${data.info}</p>

    </div>

    <div class="qna-error-title">
        희망결과
    </div>
    <div class="qna-error-description">
        <p class="error-details">${data.wantInfo}</p>

    </div>
</div>
    `
}

