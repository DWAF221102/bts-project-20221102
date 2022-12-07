//////////////////////////////////////////////////////////////////
loadMyLikeBoardRequest(userId);
loadMyLikeQnaRequest(userId);
//////////////////////////////////////////////////////////////////

function loadMyLikeBoardRequest(userId) {
    let responseData= null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/myactivity/scrap/board/" + userId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadMyLikeBoard(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadMyLikeBoard(responseData) {
    const likeBoardList = document.querySelector(".like-board-list");
    
    likeBoardList.innerHTML = "";
    
    responseData.forEach(data => {

        if(data.subcategoryName == null) {
            likeBoardList.innerHTML += `
            <li>
                <div class="post">
                    <div class="post-header">
                        <div class="post-title">
                            <div class="post-subcategory">공지사항</div>
                            <div>의 게시물을 좋아요했습니다.</div>
                        </div>
                        <div>${data.createDate}</div>
                    </div>
                    <div class="article-href">
                        <a href="/article/${data.boardId}">${data.title}</a>
                    </div>
                </div>
            </li>
        `;            
        } else {
            likeBoardList.innerHTML += `
                <li>
                    <div class="post">
                        <div class="post-header">
                            <div class="post-title">
                                <div class="post-subcategory">${data.subcategoryName}</div>
                                <div>의 게시물을 좋아요했습니다.</div>
                            </div>
                            <div>${data.createDate}</div>
                        </div>
                        <div class="article-href">
                            <a href="/article/${data.boardId}">${data.title}</a>
                        </div>
                    </div>
                </li>
            `;
        }
    
    });
}

function loadMyLikeQnaRequest(userId) {
    let responseData= null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/account/myactivity/scrap/qna/" + userId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadMyLikeQna(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadMyLikeQna(responseData) {
    const likeQnaList = document.querySelector(".like-qna-list");
    
    likeQnaList.innerHTML = "";
    
    responseData.forEach(data => {

        likeQnaList.innerHTML += `
            <li>
                <div class="post">
                    <div class="post-header">
                        <div class="post-title">
                            <div class="post-subcategory">${data.subcategoryName}</div>
                            <div>관련 질문을 좋아요했습니다.</div>
                        </div>
                        <div>${data.createDate}</div>
                    </div>
                    <div class="post-main">
                        <div class="article-href">
                            <a href="/question/article/${data.qnaBoardId}">${data.title}</a>
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