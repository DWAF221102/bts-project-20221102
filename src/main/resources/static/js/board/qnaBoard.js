class QnaBoardReqParams {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new QnaBoardReqParams();
        }
        return this.#instance;
    }

    page = 1;
    // menuId = this.setMenuId();
    categoryId = 99;
    subcategoryId = "99";
    statusId = "99";
    showList = "1";
    searchValue = "";

    setPage(page){this.page = page;}
    getPage(){return this.page;}
    
    // setMenuId(){
    //     const url = location.href;
    //     const menu = url.substring(url.lastIndexOf("/") + 1);

    //     if(menu == "knowledge"){
    //         return 2;
    //     }else if(menu == "community"){
    //         return 3;
    //     }else if(menu == "notice"){
    //         return 4;
    //     }
    // }
    // getMenuId(){return this.menuId;}

    setCategoryId(categoryId){this.categoryId = categoryId;}
    getCategoryId(){return this.categoryId;}

    setSubcategoryId(subcategoryId){this.subcategoryId = subcategoryId;}
    getSubcategoryId(){return this.subcategoryId;}

    setStatusId(statusId){this.statusId = statusId;}
    getStatusId(){return this.statusId;}

    setShowList(showList){this.showList = showList;}
    getShowList(){return this.showList;}

    setSearchValue(searchValue){this.searchValue = searchValue;}
    getSearchValue(){return this.searchValue;}

    getObject() {
        return {
            page: this.page,
            // menuId: this.menuId,
            categoryId: this.categoryId,
            subcategoryId: this.subcategoryId,
            statusId: this.statusId,
            showList: this.showList,
            searchValue: this.searchValue
        }
    }    
}



class QnaApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new QnaApi();
        }
        return this.#instance;
    }

    qnaLoadBoardRequest(){
        let data = QnaBoardReqParams.getInstance().getObject();
        console.log(data);
        let responseData= null;
        $.ajax({
            async: false,
            url: "/api/qna/board/",
            data: data,
            dataType: "json",
            success: (response) => {
                console.log(response);
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        });
        return responseData;
    }
}

class BoardLoad {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BoardLoad();
        }
        return this.#instance;
    }

    loadList() {
        let responseData = QnaApi.getInstance().qnaLoadBoardRequest();
        const boardList = document.querySelector(".board-list");
        boardList.innerHTML = "";

        responseData.forEach(data => {
            let totalCommentCount = data.commentCount + data.recommentCount;
            let time = TimeService.getInstance().setTime(data.createDate);
            if(data.categoryName != null){
                boardList.innerHTML += `
                    <li>
                        <div class="board-list-user">
                            <div class="user-img">
                                <a href=""> <img src="/image/user/${data.userImg}"></a>
                            </div>
                            <div class="user-detail">
                                <a href="">${data.nickname}</a>
                                <span>&#183;</span> 
                                <span>${time}</span>
                            </div>
                        </div>
                        <div class="board-list-title">
                            <div>
                                <a href="/question/article/${data.boardId}">${data.title}</a>
                            </div>
                            <div class="board-list-state-box">
                                <p>${data.price}point</p>
                                <div class="board-list-state">${data.status}</div>
                            </div>
                        </div>
                        <div class="board-list-bottum">
                            <div class="board-list-category">
                                <a href="">${data.categoryName}</a>
                                <a href="">${data.subcategoryName}</a>
                            </div>
                            <div class="board-list-prefer">
                                <div class="views"><i class="fa-sharp fa-solid fa-bullseye"></i><span>${data.viewCount}</span></div>
                                <div class="comments"><i class="fa-regular fa-comment-dots"></i><span>${totalCommentCount}</div>
                                <div class="likes"><i class="fa-regular fa-thumbs-up"></i><span>${data.likeCount}</span></div>
                            </div>
                        </div>
                    </li>
                `
            }else {
                boardList.innerHTML += `
                    <li>
                        <div class="board-list-user">
                            <div class="user-img">
                                <a href=""> <img src="${data.userImg}"></a>
                            </div>
                            <div class="user-detail">
                                <a href="">${data.nickname}</a>
                                <span>&#183;</span> 
                                <span>${time}</span>
                            </div>
                        </div>
                        <div class="board-list-title">
                            <a href="/article/${data.boardId}">${data.title}</a>
                        </div>
                        <div class="board-list-bottum">
                            <div class="board-list-category">
                                <a href="/notice">공지사항</a>
                            </div>
                            <div class="board-list-prefer">
                                <div class="views"><i class="fa-sharp fa-solid fa-bullseye"></i><span>${data.viewCount}</span></div>
                                <div class="comments"><i class="fa-regular fa-comment-dots"></i><span>${totalCommentCount}</div>
                                <div class="likes"><i class="fa-regular fa-thumbs-up"></i><span>${data.likeCount}</span></div>
                            </div>
                        </div>
                    </li>
                `
            }
            
        });
        if(responseData.length != 0){
            PageService.getInstance().addService(responseData[0].totalCount);
            console.log()
        }else {
            PageService.getInstance().addService(1);
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

    setTime(creatDate) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();

        let cYear = Number(creatDate.substring(0, creatDate.indexOf("년")));
        let cMonth = Number(creatDate.substring(creatDate.indexOf("년") + 1 , creatDate.indexOf("월")));
        let cDay = Number(creatDate.substring(creatDate.indexOf("월") + 1, creatDate.indexOf("일")));
        let cHour = Number(creatDate.substring(creatDate.indexOf("일") + 1, creatDate.indexOf("시")));
        let cMinute = Number(creatDate.substring(creatDate.indexOf("시") + 1, creatDate.indexOf("분")));
        
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

class BoardAsideService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BoardAsideService();
        }
        return this.#instance;
    }

    // menuId = BoardReqParams.getInstance().getMenuId();

    addAside() {
        const categoryAside = document.querySelector(".category-aside");
        
        // if(this.menuId == 1 || this.menuId == 2 || this.menuId == 3) {
            categoryAside.innerHTML = `
                <div class="category">
                    <div class="category-title">
                        <span>카테고리</span>
                    </div>
                    <ul class="category-menu">
                        <li><button class="category-all blue-button">전체</button></li>
                        <li><button class="category-program">프로그래밍</button></li>
                        <li><button class="category-build">건축</button></li>
                        <li><button class="category-view">영상</button></li>
                    </ul>
                </div>
            `;
            this.addButtonEvent();
        // }
    }

    addButtonEvent() {
        const allButton = document.querySelector(".category-all");
        const programButton = document.querySelector(".category-program");
        const buildButton = document.querySelector(".category-build");
        const viewButton = document.querySelector(".category-view");

        allButton.onclick  = () => {
            this.setBlueButton(0);
            QnaBoardReqParams.getInstance().setPage(1);
            QnaBoardReqParams.getInstance().setCategoryId(99);
            BoardLoad.getInstance().loadList();
            SubcategoryService.getInstance().setButton();
        };

        programButton.onclick  = () => {
            this.setBlueButton(1);
            // if(this.menuId == 2) {
                QnaBoardReqParams.getInstance().setCategoryId(1);
                QnaBoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            // }else if(this.menuId == 3) {
            //     BoardReqParams.getInstance().setCategoryId(7);
            //     BoardReqParams.getInstance().setPage(1);
            //     BoardLoad.getInstance().loadList();
            //     SubcategoryService.getInstance().setButton();
            // }
        }

        buildButton.onclick = () => {
            this.setBlueButton(2);
            // if(this.menuId == 2) {
                QnaBoardReqParams.getInstance().setCategoryId(2);
                QnaBoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            // }else if(this.menuId == 3) {
            //     BoardReqParams.getInstance().setCategoryId(8);
            //     BoardReqParams.getInstance().setPage(1);
            //     BoardLoad.getInstance().loadList();
            //     SubcategoryService.getInstance().setButton();
            // }
        }

        viewButton.onclick = () => {
            this.setBlueButton(3);
            // if(this.menuId == 2) {
                QnaBoardReqParams.getInstance().setCategoryId(3);
                QnaBoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            // }else if(this.menuId == 3) {
            //     BoardReqParams.getInstance().setCategoryId(9);
            //     BoardReqParams.getInstance().setPage(1);
            //     BoardLoad.getInstance().loadList();
            //     SubcategoryService.getInstance().setButton();
            // }
        }
    }

    setBlueButton(index) {
        const categoryButtons = document.querySelectorAll(".category-menu button");
       
        categoryButtons.forEach(button => {
            button.classList.remove("blue-button");
        });
        categoryButtons[index].classList.add("blue-button");
    }
}

class WriteButtonService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteButtonService();
        }
        return this.#instance;
    }

    addButtonEvent() {
        const writeButton = document.querySelector(".write button");
        const url = location.href;
        // const menu = url.substring(url.lastIndexOf("/") + 1);
        writeButton.onclick = () => {
            if(principalUser != null) {
                location.href = `/question/write`;
            }else {
                alert("로그인 후 작성가능합니다.");
                location.href = `/login`;
            }
        }
    }
}

class SubcategoryService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SubcategoryService();
        }
        return this.#instance;
    }

    setButton(){
        const categoryId = QnaBoardReqParams.getInstance().getCategoryId();
        const subcategory = document.querySelector(".subcategory");
        if(categoryId == 99) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" class="subcategory-button" value="1">대기중</button></li>
                    <li><button type="button" class="subcategory-button" value="2">진행중</button></li>
                    <li><button type="button" class="subcategory-button" value="3">답변완료</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button "  value="99">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 1) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" class="subcategory-button" value="1">대기중</button></li>
                    <li><button type="button" class="subcategory-button" value="2">진행중</button></li>
                    <li><button type="button" class="subcategory-button" value="3">답변완료</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button" value="99">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 2) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" class="subcategory-button" value="1">대기중</button></li>
                    <li><button type="button" class="subcategory-button" value="2">진행중</button></li>
                    <li><button type="button" class="subcategory-button" value="3">답변완료</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 3) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" class="subcategory-button" value="1">대기중</button></li>
                    <li><button type="button" class="subcategory-button" value="2">진행중</button></li>
                    <li><button type="button" class="subcategory-button" value="3">답변완료</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button">전체</button>  
            `;
            this.addButtonEvent();
        }

    }

    addButtonEvent() {
        const subcategoryUlButtons = document.querySelectorAll(".subcategory-ul button");
        const subcategoryAllButton = document.querySelector(".subcategory-all");

        subcategoryAllButton.onclick = () => {
            this.setBlueButton(99);
            QnaBoardReqParams.getInstance().setPage(1);
            QnaBoardReqParams.getInstance().setSubcategoryId("99");
            QnaBoardReqParams.getInstance().setStatusId("99");
            BoardLoad.getInstance().loadList();
        }

        for(let i = 0; i < subcategoryUlButtons.length; i++) {
            let button = subcategoryUlButtons[i];
            button.onclick = () => {
                this.setBlueButton(i);
                QnaBoardReqParams.getInstance().setPage(1);
                // QnaBoardReqParams.getInstance().setSubcategoryId(button.value);
                QnaBoardReqParams.getInstance().setStatusId(button.value);
                BoardLoad.getInstance().loadList();
            }
        }
    }

    setBlueButton(i) {
        const subcategoryAllButton = document.querySelector(".subcategory-all");
        const subcategoryButtons = document.querySelectorAll(".subcategory-button");

        subcategoryAllButton.classList.remove("blue-button");
        subcategoryButtons.forEach(button => {
            button.classList.remove("blue-button");
        });
        if(i == 99){
            subcategoryAllButton.classList.add("blue-button");
        }else {
            subcategoryButtons[i].classList.add("blue-button");
        }
    }
}

class ShowListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ShowListService();
        }
        return this.#instance;
    }

    showButton = document.querySelector(".show-button");
    showList = document.querySelector(".show-list");

    addButtonEvent(){
        this.addInvisible();
        this.removeInvisible();
        this.setButton();
    }

    addInvisible() {
        if(!this.showList.classList.contains("invisible")){
            this.showButton.onclick = () => {
                this.showList.classList.add("invisible");
                this.removeInvisible();
            }
        }
    }

    removeInvisible() {
        if(this.showList.classList.contains("invisible")){
            this.showButton.onclick = () => {
                this.showList.classList.remove("invisible");
                this.addInvisible();
            }
        }
    }

    setButton() {
        const showListButtons = document.querySelectorAll(".show-list-button");
        
        
        for(let i = 0; i < showListButtons.length; i++){
            showListButtons[i].onclick = () => {
                this.showList.classList.add("invisible");
                let value = null;
                value = showListButtons[i].value;
                if(value != null) {
                    if(value == "1") {
                        this.showButton.innerHTML = `<button type="button"><i class="fa-solid fa-bars"></i>최신순</button>`;
                    }else if(value == "2") {
                        this.showButton.innerHTML = `<button type="button"><i class="fa-solid fa-bars"></i>추천순</button>`;
                    }else if(value == "2") {
                        this.showButton.innerHTML = `<button type="button"><i class="fa-solid fa-bars"></i>조회순</button>`;
                    }
                }
                showListButtons.forEach(button => {
                    button.classList.remove("blue-button");
                });
                showListButtons[i].classList.add("blue-button");
                QnaBoardReqParams.getInstance().setPage(1);
                QnaBoardReqParams.getInstance().setShowList(value);
                BoardLoad.getInstance().loadList();
            }
        }
       
    }
}

class SearchService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchService();
        }
        return this.#instance;
    }

    addEvent() {
        this.addReloadButtonEvent();
        this.addSearchEvent();
    }

    addReloadButtonEvent() {
        const searchReloadButton = document.querySelector(".search-reload button");

        searchReloadButton.onclick = () => {
            QnaBoardReqParams.getInstance().setPage(1);
            BoardLoad.getInstance().loadList();
        }
    }

    addSearchEvent() {
        const searchButton = document.querySelector(".search-input button")
        const searchInput = document.querySelector(".search-input input")
         
        searchButton.onclick = () => {
            QnaBoardReqParams.getInstance().setPage(1);
            QnaBoardReqParams.getInstance().setSearchValue(searchInput.value);
            BoardLoad.getInstance().loadList();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
            
        }
    }
}

class PageService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PageService();
        }
        return this.#instance;
    }

    nowPage = QnaBoardReqParams.getInstance().getPage();
    

    getNowPage(){return this.nowPage;}
    setNowPage(nowPage){this.nowPage = nowPage}

    addService(totalCount){
        console.log(this.nowPage);
        this.setLastPage(totalCount);
        this.setSearchPage(totalCount);
        this.setBottomPageMovement(totalCount);
        this.setBottomPageNum(totalCount);
        this.setBottomPageEvent();
        
    }

    setLastPage(totalCount) {
        return (totalCount % 10 == 0) ? totalCount / 10 : Math.floor(totalCount / 10) + 1;
    }
    
    setSearchPage(totalCount) {
        console.log(QnaBoardReqParams.getInstance().getPage());
        console.log(this.getNowPage());
        this.setNowPage(QnaBoardReqParams.getInstance().getPage());
        const searchPageNum = document.querySelectorAll(".search-page-num span");
        const searchPageButton = document.querySelectorAll(".search-page-button button");
        
        const lastPage = this.setLastPage(totalCount);

        searchPageNum[0].innerText = QnaBoardReqParams.getInstance().getPage();
        searchPageNum[2].innerText = lastPage

        
        searchPageButton[0].onclick = () => {
            if(this.getNowPage() != 1) {
                this.setNowPage(this.getNowPage() - 1);
                searchPageNum[0].innerText = this.getNowPage();
                QnaBoardReqParams.getInstance().setPage(this.getNowPage());
                BoardLoad.getInstance().loadList();
                this.setSearchPage(totalCount);
            }else{ 
                alert("첫 페이지입니다.")
            }
        }

        
        searchPageButton[1].onclick = () => {
            if(this.getNowPage() != lastPage) {
                this.setNowPage(this.getNowPage() + 1);
                searchPageNum[0].innerText = this.getNowPage();
                QnaBoardReqParams.getInstance().setPage(this.getNowPage());
                BoardLoad.getInstance().loadList();
                this.setSearchPage(totalCount);
            }else {
                alert("마지막 페이지입니다.");
                this.setSearchPage(totalCount);
            }
        }
    }

    setBottomPageNum(totalCount) {
        const firstIndex = this.getNowPage() % 5 == 0 ? this.getNowPage() - 4 : this.getNowPage() - (this.getNowPage() % 5) +1;
        const lastIndex = firstIndex + 4 <= this.setLastPage(totalCount) ? firstIndex + 4 : this.setLastPage(totalCount);

        console.log(this.getNowPage());
        console.log(firstIndex);
        console.log(lastIndex);
        console.log(this.setLastPage(totalCount))
        
        const pageNum = document.querySelector(".page-num");
        pageNum.innerHTML = "";


        for(let i = firstIndex; i <= lastIndex; i++) {
            if(i == this.getNowPage()) {
                pageNum.innerHTML += `
                    <li><button type="button" class="page-num-button blue-button">${i}</button></li>
                `;
            }else {
                pageNum.innerHTML += `
                    <li><button type="button" class="page-num-button">${i}</button></li>
                `;
            }
        }
        this.setBottomPageEvent();
    }

    setBottomPageEvent() {
        const pageNumButtons = document.querySelectorAll(".page-num-button");
        
        for(let i = 0; i < pageNumButtons.length; i++) {
            pageNumButtons[i].onclick = () => {
                let pageNum = Number(pageNumButtons[i].innerText);
                this.setNowPage(pageNum);
                pageNumButtons.forEach(button => {
                    button.classList.remove("page-num-blue-button");
                });
                pageNumButtons[i].classList.add("page-num-blue-button");
                
                QnaBoardReqParams.getInstance().setPage(pageNum);
                BoardLoad.getInstance().loadList();
                this.setBottomPageEvent();
            }
        }
    }

    setBottomPageMovement(totalCount) {
        this.setNowPage(QnaBoardReqParams.getInstance().getPage());
        const preButton = document.querySelector(".previous-button button");
        const nextButton = document.querySelector(".next-button button");

        
        preButton.onclick = () => {
            if(this.getNowPage() != 1){
            this.setNowPage(this.getNowPage() - 1);
            QnaBoardReqParams.getInstance().setPage(this.getNowPage());
            BoardLoad.getInstance().loadList();
            }else {
                alert("첫 페이지입니다.");
            }
        }

        nextButton.onclick = () => {
            if(this.getNowPage() != this.setLastPage(totalCount)) {
                this.setNowPage(this.getNowPage() + 1);
                QnaBoardReqParams.getInstance().setPage(this.getNowPage());
                BoardLoad.getInstance().loadList();
            }else {
                alert("마지막 페이지입니다.")
            }
        }
    }
    

}


class BoardService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BoardService();
        }
        return this.#instance;
    }

    constructor() {
        BoardAsideService.getInstance().addAside();
        BoardLoad.getInstance().loadList();
        SubcategoryService.getInstance().setButton();
        ShowListService.getInstance().addButtonEvent();
        SearchService.getInstance().addEvent();
        WriteButtonService.getInstance().addButtonEvent();
    }

}

window.onload = () => {
    BoardService.getInstance();
     
} 