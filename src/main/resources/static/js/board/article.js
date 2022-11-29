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
            return (year - cYear) + "년 전";
        }else {
            if(month != cMonth) {
                return (month - cMonth) + "개월 전";
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
