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
            titleCreate(response.data);
            boardInfo(response.data);
            boardDetails(response.data);
        },
        error: (error) => {
            console.log(error);
        }

    });
    
}

function addCreate(qnaLists) {
    const listBody = document.querySelector(".list-body");

    listBody.innerHTML = "";

    qnaLists.forEach((qna) => {
        listBody.innerHTML += `
    <tr>
        <td class="user-id">${qna.user_id}</td>
        <td>${qna.subcategory}</td>
        <td>${qna.title}</td>
        <td>${qna.statusId}</td>
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

function titleCreate(data) {

    const qnaTitle = document.querySelector(".qna-board-top");
    qnaTitle.innerHTML = `
        <div>
            <div class="qna-board-category">
                ${data.categoryId}
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
            ${data.categorySubId}
        </div>

    </div>

    <div class="qna-board-price">
        <div class="qna-board-price-left">
            질문금액
        </div>
        <div class="qna-board-price-right">
            ${data.price}
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

