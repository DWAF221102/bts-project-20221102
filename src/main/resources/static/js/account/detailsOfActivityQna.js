//////////////////////////////////////////////////////////////////
loadMyQnaRequest(userId);
//////////////////////////////////////////////////////////////////

function loadMyQnaRequest(userId) {
    let responseData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/myactivity/qna/" + userId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadMyQna(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadMyQna(responseData) {
    const qnaList = document.querySelector(".qna-list");

    qnaList.innerHTML = "";

    responseData.forEach(data => {

        qnaList.innerHTML += `
            <li>
                <div class="post">
                    <div class="post-header">
                        <div class="post-title">
                            <div class="post-menu">${data.subcategoryName}</div>
                            <div  class="post-content">관련 질문을 하였습니다.</div>
                        </div>
                        <div class="post-date">${data.createDate}</div>
                    </div>
                    <div class="post-main">
                        <div class="article-href">
                            <a class="article-content" href="/question/article/${data.id}">${data.title}</a>
                        </div>
                        <div class="status">
                            <span>상태:</span><span class="status-content">${data.status}</span>
                        </div>
                    </div>
                </div>
            </li>
        `;

    });
}