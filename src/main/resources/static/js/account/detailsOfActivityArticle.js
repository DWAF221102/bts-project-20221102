//////////////////////////////////////////////////////////////////
loadMyBoardRequest(userId);
//////////////////////////////////////////////////////////////////

function loadMyBoardRequest(userId) {
    let responseData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/myactivity/article/" + userId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadMyBoard(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadMyBoard(responseData) {
    const boarderList = document.querySelector(".boader-list");

    boarderList.innerHTML = "";

    responseData.forEach(data => {

        if (data.subcategoryName == null) {
            boarderList.innerHTML += `
                <li>
                    <div class="post">
                        <div class="post-header">
                            <div class="post-title">
                                <div class="post-subcategory">공지사항</div>
                                <div>의 게시물을 작성하였습니다.</div>
                            </div>
                            <div>${data.createDate}</div>
                        </div>
                        <div class="article-href">
                            <a href="/article/${data.id}">${data.title}</a>
                        </div>
                    </div>
                </li>
            `;
        } else {
            boarderList.innerHTML += `
                <li>
                    <div class="post">
                        <div class="post-header">
                            <div class="post-title">
                                <div class="post-subcategory">${data.subcategoryName}</div>
                                <div>의 게시물을 작성하였습니다.</div>
                            </div>
                            <div>${data.createDate}</div>
                        </div>
                        <div class="article-href">
                            <a href="/article/${data.id}">${data.title}</a>
                        </div>
                    </div>
                </li>
            `;
        }
    });
}