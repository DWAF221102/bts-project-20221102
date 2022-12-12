class ArticleApi {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ArticleApi();
        }
        return this.#instance;
    }

    url = location.href;
    id = this.url.substring(this.url.lastIndexOf("/") + 1);

    viewCountReq() {
        $.ajax({
            async: false,
            type: "put",
            url: "/api/viewcount",
            data: {
                "id": this.id
            },
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    loadArticleReq() {

        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/article/" + this.id,
            dataType: "json",
            success: (response) => {
                console.log(response);
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        })

        return responseData;
    }

    likeAddReq() {
        let data = {
            "id": this.id,
            "userId": principalUser.id
        }
        $.ajax({
            async: false,
            type: "get",
            url: "/api/like/add",
            data: data,
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    likeRemoveReq(id) {
        $.ajax({
            async: false,
            type: "delete",
            url: "/api/like/remove/" + id,
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}

class CommentApi {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new CommentApi();
        }
        return this.#instance;
    }

    commentWriteReq(id, userId, textValue) {
        let data = {
            "id": id,
            "userId": userId,
            "textValue": textValue
        }

        $.ajax({
            async: false,
            type: "get",
            url: "/api/comment/write",
            data: data,
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        })

    }

    recommentWriteReq(commentId, userId, textValue) {
        let data = {
            "commentId": commentId,
            "userId": userId,
            "textValue": textValue
        }

        $.ajax({
            async: false,
            type: "get",
            url: "/api/recomment/write",
            data: data,
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}

class ArticleService {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ArticleService();
        }
        return this.#instance;
    }

    setCategory(responseData) {
        const articleCategory = document.querySelector(".article-category");

        if (responseData.menuName == "지식") {
            articleCategory.innerHTML = `
                <a href="/knowledge">${responseData.menuName}</a>
                <span>/</span>
                <span>${responseData.categoryName}</span>
            `;
        } else if (responseData.menuName == "커뮤니티") {
            articleCategory.innerHTML = `
                <a href="/community">${responseData.menuName}</a>
                <span>/</span>
                <span>${responseData.categoryName}</span>
            `;
        } else if (responseData.menuName == "공지사항") {
            articleCategory.innerHTML = `
                <a href="/notice">${responseData.menuName}</a>
            `;
        }
    }

    setUser(responseData) {
        const userImg = document.querySelector(".user-img");
        const userDetail = document.querySelector(".user-detail");
        const createDate = responseData.createDate;
        const time = TimeService.getInstance().setTime(createDate);

        userImg.innerHTML = `
            <a href="/myactivity/${responseData.userId}">
                <img src="/image/user/${responseData.userImg}">
            </a>
        `;

        userDetail.innerHTML = `
            <a href="/myactivity/${responseData.userId}" class="user-nickname">${responseData.nickname}</a>
            <div class="user-brief">
                <span>${time}</span>
                <span>&#183;</span>
                <i class="fa-sharp fa-solid fa-bullseye"></i><span>${responseData.viewCount}</span>
            </div>
        `;
    }

    setLike(responseData) {
        const userStar = document.querySelector(".user-star");

        let likes = responseData.like;
        let likeCount = likes.length;

        userStar.innerHTML = `
            <button type="button" class="user-star-button"><i class="fa-regular fa-thumbs-up"></i></button>
            <span>${likeCount}</span>
        `;

        const userStarButton = document.querySelector(".user-star-button");
        let userId = 0;

        if (principalUser != null) {
            userId = principalUser.id;
        }
        if (likeCount != 0) {
            likes.forEach(like => {
                if (like.from_id == userId) {
                    userStarButton.classList.add("blue-button");
                    userStarButton.onclick = () => {
                        userStarButton.classList.remove("blue-button");
                        ArticleApi.getInstance().likeRemoveReq(like.like_id);
                        location.reload();
                    }
                }
                else {
                    userStarButton.onclick = () => {
                        if (userId != 0) {
                            userStarButton.classList.add("blue-button");
                            ArticleApi.getInstance().likeAddReq();
                            location.reload();
                        }
                    }
                }
            });
        } else {
            userStarButton.onclick = () => {
                if (userId != 0) {
                    userStarButton.classList.add("blue-button");
                    ArticleApi.getInstance().likeAddReq();
                    location.reload();
                }
            }
        }
    }

    setTitleContent(responseData) {
        const articleTitle = document.querySelector(".article-title");
        const articleContent = document.querySelector(".article-content");

        articleTitle.innerHTML = `
            <h1>${responseData.title}</h1>
        `;
        articleContent.innerHTML = `<p>${responseData.content}</p>`;

    }

    setBottumCategory(responseData) {
        if (responseData.menuName != "공지사항") {
            const articleInfo = document.querySelector(".article-info");
            articleInfo.innerHTML = `
                <div class="article-categories">
                    <span>${responseData.categoryName}</span>
                    <span>${responseData.subcategoryName}</span>
                </div>
            `;
        }
    }

    setUpdateButton(responseData) {
        let userId = 0;
        if (principalUser != null) {
            userId = principalUser.id;
        }
        if (userId != 0) {
            if (userId == responseData.userId) {
                const articleInfo = document.querySelector(".article-info");

                articleInfo.innerHTML += `
                    <div>
                        <button type="button" class="update-button">
                            <i class="fa-regular fa-pen-to-square"></i>수정하기
                        </button>
                    </div>
                `;

                const updateButton = document.querySelector(".update-button");

                updateButton.onclick = () => {
                    if (confirm("게시물을 수정하시겠습니까?")) {
                        if (responseData.menuName == "지식") {
                            location.href = "/knowledge/update/" + responseData.id;
                        } else if (responseData.menuName == "커뮤니티") {
                            location.href = "/community/update/" + responseData.id;
                        } else if (responseData.menuName == "지식") {
                            location.href = "/notice/update/" + responseData.id;
                        }
                    }
                }
            }

        }
    }
}


class CommentService {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new CommentService();
        }
        return this.#instance;
    }

    setCommentNum(responseData) {
        const commentNum = document.querySelector(".comment-num");
        commentNum.innerHTML = `
            <h2>${responseData.comment.length}개의 댓글</h2>
        `;
    }

    writeComment(responseData) {
        const commentWrite = document.querySelector(".comment-write");

        let id = responseData.id;
        let userId = 0;
        let userImg = null;

        if (principalUser != null) {
            userId = principalUser.id;
            userImg = principalUser.user_img;
        } else {
            commentWrite.classList.remove("grey-border");
        }

        if (userId != 0) {
            commentWrite.innerHTML = `
                <div class="user-img">
                    <img src="/image/user/${userImg}">
                </div>
                <div class="comment-write-container">
                    <div class="comment-textarea-container">
                        <textarea class="comment-textarea grey-border" placeholder="댓글을 입력해주세요."></textarea>
                    </div>
                    <div class="write-button">
                        <button type="button">취소</button>
                        <button type="button">댓글 쓰기</button>
                    </div>
                </div>
            `;

            const writeButtons = document.querySelectorAll(".write-button button");


            writeButtons[0].onclick = () => {
                if (confirm("취소하시겠습니까?")) {
                    location.reload();
                }
            }
            writeButtons[1].onclick = () => {
                const textarea = document.querySelector(".comment-textarea");
                let textValue = textarea.value;
                if (confirm("댓글을 작성하시겠습니까???")) {
                    if (textValue == "" || textValue == " " || textValue == null || textValue.replaceAll(" ", "") == "") {
                        alert("내용을 입력해주세요.");
                    } else {
                        CommentApi.getInstance().commentWriteReq(id, userId, textarea.value);
                        location.reload();
                    }

                }
            }
        }
    }


    setComment(responseData) {
        let comment = responseData.comment;
        if (comment.length != 0) {
            const commentUl = document.querySelector(".comment-ul");
            for (let i = comment.length; i > 0; i--) {
                let index = i - 1;
                commentUl.innerHTML += `
                    <li>
                        <div class="user-info">
                            <div class="user-info-container">
                                <div class="user-img">
                                    <a href="/myactivity/${comment[index].comment_user_id}">
                                        <img src="/image/user/${comment[index].comment_user_img}">
                                    </a>
                                </div>
                                <div class="user-detail">
                                    <a href="/myactivity/${comment[index].comment_user_id}" class="user-nickname">${comment[index].comment_nickname}</a>
                                    <div class="user-brief">
                                        <span>${TimeService.getInstance().setTime(comment[index].comment_create_date)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>${comment[index].comment_content}</p>
                        </div>
                        <div class="recomment-container">
                            <div class="recomment-button">
                                <button type="button" class="write-reccoment-button"><span>댓글 쓰기</span></button>
                            </div>
                            <div class="recomment">
                                <div class="delete-recomment">
                                    
                                </div>
                                <ul class="recomment-ul none">
                                   
                                </ul>
                            </div>
                        </div>
                    </li> 
                `;



                const recommentUl = document.querySelector(".recomment-ul");

                let recomment = comment[index].recomment;
                if (recomment.length != 0) {
                    this.recommentButton(index, recomment);

                    recomment.forEach(data => {
                        recommentUl.innerHTML += `
                            <li class="">
                                <div class="user-info">
                                    <div class="user-info-container">
                                        <div class="user-img">
                                            <a href="/myactivity/${data.recomment_user_id}">
                                            <img src="/image/user/${data.recomment_user_img}">
                                            </a>
                                        </div>
                                        <div class="user-detail">
                                            <a href="/myactivity/${data.recomment_user_id}" class="user-nickname">${data.recomment_nickname}</a>
                                            <div class="user-brief">
                                                <span>${TimeService.getInstance().setTime(data.recomment_create_date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="recomment-content">
                                    <p>${data.recomment_content}</p>
                                </div>
                            </li>
                        `;
                    });
                }

            }
        }

    }

    recommentButton(index, recomment) {
        const recommentButton = document.querySelectorAll(".recomment-button");
        let recommentCount = recomment.length;
        recommentButton[index].innerHTML = `
            <button type="button" class="show-recomment">
                <span class="show-recomment-span">댓글 ${recommentCount}개 보기</span>
            </button>
            <button type="button" class="write-reccoment-button"><span>댓글 쓰기</span></button>
        `;
        let showRecommentButton = document.querySelectorAll(".show-recomment");
        let recommentUl = document.querySelectorAll(".recomment-ul");
        let showRecommentSpan = document.querySelectorAll(".show-recomment-span");

        this.showRecomment(showRecommentButton[index], showRecommentSpan[index], recommentCount, recommentUl[index]);


    }

    showRecomment(button, div, recommentCount, recommentUl) {
        button.onclick = () => {
            div.innerText = "댓글 모두 숨기기";

            recommentUl.classList.remove("none");

            this.removeRecomment(button, div, recommentCount, recommentUl);
        }
    }

    removeRecomment(button, div, recommentCount, recommentUl) {
        button.onclick = () => {
            div.innerText = `댓글 ${recommentCount}개 보기`;

            recommentUl.classList.add("none");

            this.showRecomment(button, div, recommentCount, recommentUl);
        }
    }

    showRecommentWrite(responseData) {
        const writeRecommentButton = document.querySelectorAll(".write-reccoment-button");
        const deleteRecomment = document.querySelectorAll(".delete-recomment");

        let userId = 0;
        let userImg = null;

        if (principalUser != null) {
            userId = principalUser.id;
            userImg = principalUser.user_img;
        }

        for (let i = 0; i < writeRecommentButton.length; i++) {
            writeRecommentButton[i].onclick = () => {
                if (userId != 0) {
                    deleteRecomment[i].innerHTML = `
                        <div class="recomment-write ">
                            <div class="user-img">
                                <img src="/image/user/${userImg}">
                            </div>
                            <div class="recomment-write-container">
                                <div class="recomment-textarea-container">
                                    <textarea class="recomment-textarea" placeholder="댓글을 입력해주세요."></textarea>
                                </div>
                                <div class="recomment-write-button">
                                    <button type="button" class="button-recomment">댓글 쓰기</button>
                                </div>
                            </div>    
                        </div>
                    `;
                    this.recommentButtonEvent(responseData);
                    this.deleteRecommentWrite(responseData);
                } else {
                    alert("로그인후 작성가능합니다.");
                }

            }
        }

    }


    deleteRecommentWrite(responseData) {
        const writeRecommentButton = document.querySelectorAll(".write-reccoment-button");
        const deleteRecomment = document.querySelectorAll(".delete-recomment");

        for (let i = 0; i < writeRecommentButton.length; i++) {
            writeRecommentButton[i].onclick = () => {
                deleteRecomment[i].innerHTML = "";

                this.showRecommentWrite(responseData);
            }
        }
    }

    recommentButtonEvent(responseData) {
        let userId = 0;
        if (principalUser != null) {
            userId = principalUser.id;
        }
        const recommentButton = document.querySelectorAll(".button-recomment");


        for (let i = 0; i < recommentButton.length; i++) {
            recommentButton[i].onclick = () => {
                let recomentTextarea = document.querySelectorAll(".recomment-textarea");
                let textValue = recomentTextarea[i].value;
                let index = recommentButton.length - i;
                let commentId = responseData.comment[index].comment_id;
                if (textValue != "" && textValue != " " && textValue != null && textValue.replaceAll(" ", "") != "") {
                    if (confirm("댓글을 작성하시겠습니까?")) {
                        CommentApi.getInstance().recommentWriteReq(commentId, userId, textValue);
                        location.reload();
                    }
                } else {
                    alert("댓글을 입력해주세요.");
                }
            }
        }
    }

}

class TotalService {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new TotalService();
        }
        return this.#instance;
    }

    addService() {
        ArticleApi.getInstance().viewCountReq();
        let responseData = ArticleApi.getInstance().loadArticleReq();
        if (responseData != null) {
            ArticleService.getInstance().setCategory(responseData);
            ArticleService.getInstance().setUser(responseData);
            ArticleService.getInstance().setLike(responseData);
            ArticleService.getInstance().setTitleContent(responseData);
            ArticleService.getInstance().setBottumCategory(responseData);
            ArticleService.getInstance().setUpdateButton(responseData);
            CommentService.getInstance().writeComment(responseData);
            CommentService.getInstance().setComment(responseData);
            CommentService.getInstance().showRecommentWrite(responseData);
            CommentService.getInstance().recommentButtonEvent(responseData);
        }

    }
}

class TimeService {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new TimeService();
        }
        return this.#instance;
    }

    setTime(createDate) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();

        let c1 = createDate.substring(0, createDate.indexOf("T"));
        let c2 = createDate.substring(createDate.indexOf("T") + 1, createDate.lastIndexOf(":"));

        let cYear = Number(c1.substring(0, c1.indexOf("-")));
        let cMonth = Number(c1.substring(c1.indexOf("-") + 1, c1.lastIndexOf("-")));
        let cDay = Number(c1.substring(c1.lastIndexOf("-") + 1));
        let cHour = Number(c2.substring(0, c2.indexOf(":")));
        let cMinute = Number(c2.substring(c2.indexOf(":") + 1));



        if (year != cYear) {
            if (year - cYear == 1) {
                if ((12 - cMonth + month) < 12) {
                    return (12 - cMonth + month) + "개월 전";
                } else {
                    return "1년 전";
                }
            } else {
                return (year - cYear) + "년 전";
            }
        } else {
            if (month != cMonth) {
                if (month - cMonth == 1) {
                    if ((31 - cDay + day) < 31) {
                        return (31 - cDay + day) + "일 전";
                    } else {
                        return (month - cMonth) + "개월 전";
                    }
                } else {
                    return (month - cMonth) + "개월 전";
                }
            } else {
                if (day != cDay) {
                    return (day - cDay) + "일 전";
                } else {
                    if (hour != cHour) {
                        return (hour - cHour) + "시간 전";
                    } else {
                        if (minute != cMinute) {
                            return (minute - cMinute) + "분 전";
                        } else {
                            return "1분 미만 전";
                        }
                    }
                }
            }
        }
    }
}

window.onload = () => {
    TotalService.getInstance().addService();
}
