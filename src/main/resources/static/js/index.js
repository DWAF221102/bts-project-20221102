let menuId = null;

for(let i = 1; i < 5; i++) {
    menuId = Number(i + 1);
    loadBoardListRequest(menuId);
}

function loadBoardListRequest(menuId) { 
    let responseData= null;

    $.ajax({
        async: false,
        url: "/api/index/board",
        data: {
            "menuId" : menuId
        },
        dataType: "json",
        success: (response) => {
            console.log(response);
            responseData = response;
            loadBoardList(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadBoardList(responseData) {
    const fiveBoardlist = document.querySelectorAll(".five-boardlist");

    for(let i; i < fiveBoardlist.length; i++) {
        responseData.forEach(data => {
            let totalCommentCount = data.commentCount + data.recommentCount;
        
            fiveBoardlist[i].innerHTML += `
                <li>
                    <div class="board-list-top">
                        <div class="board-profile">
                            <a href="#"><img src="${data.userImg}" style="background-color: navy;"></a>
                            <a href="#" class="board-profile-nick">${data.nickname}</a>
                            <span>·</span>
                            <span>${data.createData}</span>
                        </div>
                        <div class="recommendation-icon">
                            <div>
                                <i class="fa-regular fa-thumbs-up"></i>
                            </div>
                            <span>${data.likeCount}</span>
                            <div>
                                <i class="fa-regular fa-comment-dots"></i>
                            </div>
                            <span>${totalCommentCount}</span>
                        </div>
                    </div>
                    <div class="board-list-bottom">
                        <a href="#">${data.title}</a>
                    </div>
                </li>
            `
         
        });
    }
}