class ArticleApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ArticleApi();
        }
        return this.#instance;
    }

    loadArticleReq() {
        const url = location.href;
        const id = url.substring(url.lastIndexOf("/") + 1);
        let responseData= null;
        
        $.ajax({
            async: false,
            type: "get",
            url: "/api/article/" + id,
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

    likeAddReq(responseData) {
        let id = responseData.id;
        let data = {
            "id" : id,
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
        if(this.#instance == null) {
            this.#instance = new CommentApi();
        }
        return this.#instance;
    }
}

class ArticleService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ArticleService();
        }
        return this.#instance;
    }

    constructor() {
        let responseData = ArticleApi.getInstance().loadArticleReq();
        this.setCategory(responseData);
        this.setUser(responseData);
        this.setLike(responseData);
        this.setTitleContent(responseData);

    }

    setCategory(responseData) {
        const articleCategory = document.querySelector(".article-category");
        
        if(responseData.menuName == "지식"){
            articleCategory.innerHTML = `
                <a href="/knowledge">${responseData.menuName}</a>
                <span>/</span>
                <span>${responseData.categoryName}</span>
            `;
        }else if(responseData.menuName == "커뮤니티"){
            articleCategory.innerHTML = `
                <a href="/community">${responseData.menuName}</a>
                <span>/</span>
                <span>${responseData.categoryName}</span>
            `;
        }else if(responseData.menuName == "공지사항"){
            articleCategory.innerHTML = `
                <a href="/notice">${responseData.menuName}</a>
                <span>/</span>
                <span>${responseData.categoryName}</span>
            `;
        }
    }

    setUser(responseData) {
        const userImg = document.querySelector(".user-img");
        const userDetail = document.querySelector(".user-detail");
        const createDate = responseData.createDate;
        const time = TimeService.getInstance().setTime(createDate);

        userImg.innerHTML = `
            <a href="">
                <img src="/image/user/${responseData.userImg}">
            </a>
        `;

        userDetail.innerHTML = `
            <a class="user-nickname">${responseData.nickname}</a>
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
            <button class="user-star-button"><i class="fa-regular fa-thumbs-up"></i></button>
            <span>${likeCount}</span>
        `;

        const userStarButton = document.querySelector(".user-star-button");
        let userId = 0;

        if(principalUser != null) {
            userId = principalUser.id;
        }
        
        if(likeCount =! 0) {
            likes.forEach(like => {
                if(like.from_id == userId) {
                    userStarButton.classList.add("blue-button");
                    userStarButton.onclick = () => {
                        userStarButton.classList.remove("blue-button");
                        ArticleApi.getInstance().likeRemoveReq(like.like_id);
                        location.reload();
                    }
                }
                else {
                    userStarButton.onclick = () => {
                        if(userId != 0) {
                            userStarButton.classList.add("blue-button");
                            ArticleApi.getInstance().likeAddReq(responseData);
                            location.reload();
                        }
                    }
                }
            });
        }else {
            userStarButton.onclick = () => {
                if(userId != 0) {
                    userStarButton.classList.add("blue-button");
                    ArticleApi.getInstance().likeAddReq(responseData);
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

    setCategory(responseData) {
        const articleInfo = document.querySelector(".article-info");
        articleInfo.innerHTML = `
            <span>${responseData.categoryName}</span>
            <span>${responseData.subcategoryName}</span>
        `;
    }
}


class CommentService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CommentService();
        }
        return this.#instance;
    }

    writeComment(id) {
        
    }

    setComment(responseData) {
        if(responseData.comment.length != 0) {

        }
    }
    
}

class TimeService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TimeService();
        }
        return this.#instance;
    }

    setTime(createDate) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();

        let c1 = createDate.substring(0, createDate.indexOf("T"));
        let c2 = createDate.substring(createDate.indexOf("T") + 1, createDate.lastIndexOf(":"));

        let cYear = Number(c1.substring(0, c1.indexOf("-")));
        let cMonth = Number(c1.substring(c1.indexOf("-") + 1 , c1.lastIndexOf("-")));
        let cDay = Number(c1.substring(c1.lastIndexOf("-") + 1));
        let cHour = Number(c2.substring(0, c2.indexOf(":")));
        let cMinute = Number(c2.substring(c2.indexOf(":") + 1));
        


        if(year != cYear) {
            if(year - cYear == 1){
                if((12 - cMonth + month) < 12){
                    return (12 - cMonth + month) + "개월 전";
                }else {
                    return "1년 전";
                }
            }else {
                return (year - cYear) + "년 전";
            }
        }else {
            if(month != cMonth) {
                if(month - cMonth == 1){
                    if((31 - cDay + day) < 31){
                        return (31 - cDay + day) + "일 전";
                    }else {
                        return (month - cMonth) + "개월 전";
                    }
                }else {
                    return (month - cMonth) + "개월 전";
                }
            }else{
                if(day != cDay) {
                    return (day - cDay) + "일 전";
                }else {
                    if(hour != cHour) {
                        return (hour - cHour) + "시간 전";
                    }else {
                        if(minute != cMinute){
                            return (minute - cMinute) + "분 전";
                        }else {
                            return "1분 미만 전";
                        }
                    }
                }
            }
        }
    }
}

window.onload = () => {
    new ArticleService();
}
