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
            requestButton(response.data);
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
    <div class= "qna-profile-img">
    <a href="">
        <img src="/image/user/${data.userImg}" alt="">
    </a>
    </div>
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

function requestButton(data) {
    const requestButton = document.querySelector(".request-button")
    let time = TimeService.getInstance().setTime(data.createDate);

    requestButton.innerHTML = `
    <div>
        <span class="request-title">답변권한요청</span>
    </div>
    <div>
        <span class="request-time">${time}</span>
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

class TimeService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TimeService();
        }
        return this.#instance;
    }

    setTime(creatDate) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        console.log(date);

        let cYear = Number(creatDate.substring(0, creatDate.indexOf("년")));
        let cMonth = Number(creatDate.substring(creatDate.indexOf("년") + 1 , creatDate.indexOf("월")));
        let cDay = Number(creatDate.substring(creatDate.indexOf("월") + 1, creatDate.indexOf("일")));
        let cHour = Number(creatDate.substring(creatDate.indexOf("일") + 1, creatDate.indexOf("시")));
        let cMinute = Number(creatDate.substring(creatDate.indexOf("시") + 1, creatDate.indexOf("분")));
        
        if(year != cYear) {
            return (year - cYear) + "년 경과";
        }else {
            if(month != cMonth) {
                return (month - cMonth) + "개월 경과";
            }else{
                if(day != cDay) {
                    return (day - cDay) + "일 경과";
                }else {
                    if(hour != cHour) {
                        return (hour - cHour) + "시간 경과";
                    }else {
                        if(minute != cMinute){
                            return (minute - cMinute) + "분 경과";
                        }else {
                            return "1분 미만 경과";
                        }
                    }
                }
            }
        }
    }
}

