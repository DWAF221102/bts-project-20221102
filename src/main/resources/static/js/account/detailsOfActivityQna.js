//////////////////////////////////////////////////////////////////
loadMyQnaRequest(userId);
//////////////////////////////////////////////////////////////////

function loadMyQnaRequest(userId) {
    let responseData= null;

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
                            <div class="post-subcategory">${data.subcategoryName}</div>
                            <div>관련 질문을 하였습니다.</div>
                        </div>
                        <div>${data.createDate}</div>
                    </div>
                    <div class="post-main">
                        <div class="article-href">
                            <a href="/question/article/${data.id}">${data.title}</a>
                        </div>
                        <div>
                            상태: ${data.status}
                        </div>
                    </div>
                </div>
            </li>
        `;
    
    });
}