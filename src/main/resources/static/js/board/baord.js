class BoardReqParams {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BoardReqParams();
        }
        return this.#instance;
    }

    page = 1;
    menuId = this.setMenuId();
    categoryId = 99;
    subcategoryId = "99";
    showList = "1";
    searchValue = null;

    setPage(page){this.page = page;}
    getPage(){return this.page;}
    
    setMenuId(){
        const url = location.href;
        const menu = url.substring(url.lastIndexOf("/") + 1);

        if(menu == "knowledge"){
            return 2;
        }else if(menu == "community"){
            return 3;
        }else if(menu == "notice"){
            return 4;
        }
    }
    getMenuId(){return this.menuId;}

    setCategoryId(categoryId){this.categoryId = categoryId;}
    getCategoryId(){return this.categoryId;}

    setSubcategoryId(subcategoryId){this.subcategoryId = subcategoryId;}
    getSubcategoryId(){return this.subcategoryId;}

    setShowList(showList){this.showList = showList;}
    getShowList(){return this.showList;}

    setSearchValue(searchValue){this.searchValue = searchValue;}
    getSearchValue(){return this.searchValue;}

    getObject() {
        return {
            page: this.page,
            menuId: this.menuId,
            categoryId: this.categoryId,
            subcategoryId: this.subcategoryId,
            showList: this.showList,
            searchValue: this.searchValue
        }
    }    
}



class BoardApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BoardApi();
        }
        return this.#instance;
    }

    loadBoardRequest(){
        let data = BoardReqParams.getInstance().getObject();
        console.log(data);
        let responseData= null;
        $.ajax({
            async: false,
            url: "/api/board",
            data: data,
            dataType: "json",
            success: (response) => {
                console.log(response);
                responseData = response;
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
        let responseData = BoardApi.getInstance().loadBoardRequest();
        const boardList = document.querySelector(".board-list");
        boardList.innerHTML = "";

        responseData.forEach(data => {
            let totalCommentCount = data.commentCount + data.recommentCount;
            boardList.innerHTML += `
                <li>
                    <div class="board-list-user">
                        <div class="user-img">
                            <a href=""> <img src="${data.userImg}"></a>
                        </div>
                        <div class="user-detail">
                            <a href="">${data.nickname}</a>
                            <span>&#183;</span> 
                            <span>1시간 전</span>
                        </div>
                    </div>
                    <div class="board-list-title">
                        <a href="/article">${data.title}</a>
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
        });
        
        PageService.getInstance().addService(responseData[0].totalCount);
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

    menuId = BoardReqParams.getInstance().getMenuId();

    addAside() {
        const categoryAside = document.querySelector(".category-aside");
        
        if(this.menuId == 2 || this.menuId == 3) {
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
        }
    }

    addButtonEvent() {
        const allButton = document.querySelector(".category-all");
        const programButton = document.querySelector(".category-program");
        const buildButton = document.querySelector(".category-build");
        const viewButton = document.querySelector(".category-view");

        allButton.onclick  = () => {
            this.setBlueButton(0);
            BoardReqParams.getInstance().setPage(1);
            BoardReqParams.getInstance().setCategoryId(99);
            BoardLoad.getInstance().loadList();
        };

        programButton.onclick  = () => {
            this.setBlueButton(1);
            if(this.menuId == 2) {
                BoardReqParams.getInstance().setCategoryId(4);
                BoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            }else if(this.menuId == 3) {
                BoardReqParams.getInstance().setCategoryId(7);
                BoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            }
        }

        buildButton.onclick = () => {
            this.setBlueButton(2);
            if(this.menuId == 2) {
                BoardReqParams.getInstance().setCategoryId(5);
                BoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            }else if(this.menuId == 3) {
                BoardReqParams.getInstance().setCategoryId(8);
                BoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            }
        }

        viewButton.onclick = () => {
            this.setBlueButton(3);
            if(this.menuId == 2) {
                BoardReqParams.getInstance().setCategoryId(6);
                BoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            }else if(this.menuId == 3) {
                BoardReqParams.getInstance().setCategoryId(9);
                BoardReqParams.getInstance().setPage(1);
                BoardLoad.getInstance().loadList();
                SubcategoryService.getInstance().setButton();
            }
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

class SubcategoryService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SubcategoryService();
        }
        return this.#instance;
    }

    setButton(){
        const categoryId = BoardReqParams.getInstance().getCategoryId();
        const subcategory = document.querySelector(".subcategory");

        if(categoryId == 4) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" value="8">JAVA</button></li>
                    <li><button type="button" value="9">PYTHON</button></li>
                    <li><button type="button" value="10">C</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 5) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" value="11">AUTOCAD</button></li>
                    <li><button type="button" value="12">3D</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 6) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" value="13">Primiere</button></li>
                    <li><button type="button" value="14">adobe</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 7) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" value="15">일상</button></li>
                    <li><button type="button" value="16">팁</button></li>
                    <li><button type="button" value="17">모임&스터디</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 8) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" value="18">일상</button></li>
                    <li><button type="button" value="19">팁</button></li>
                    <li><button type="button" value="20">모임&스터디</button></li>
                </ul>
                <button type="button" class="subcategory-all blue-button">전체</button>  
            `;
            this.addButtonEvent();
        }else if(categoryId == 9) {
            subcategory.innerHTML = `
                <ul class="subcategory-ul">
                    <li><button type="button" value="21">일상</button></li>
                    <li><button type="button" value="22">팁</button></li>
                    <li><button type="button" value="23">모임&스터디</button></li>
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
            BoardReqParams.getInstance().setPage(1);
            BoardReqParams.getInstance().setSubcategoryId("99");
            BoardLoad.getInstance().loadList();
        }

        for(let i = 0; i < subcategoryUlButtons.length; i++) {
            let button = subcategoryUlButtons[i];
            button.onclick = () => {
                this.setBlueButton(i);
                BoardReqParams.getInstance().setPage(1);
                BoardReqParams.getInstance().setSubcategoryId(button.value);
                BoardLoad.getInstance().loadList();
            }
        }
    }

    setBlueButton(i) {
        const subcategoryAllButton = document.querySelector(".subcategory-all");
        const subcategoryButtons = document.querySelectorAll(".subcategory-ul button");

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
        const showListButtons = document.querySelectorAll(".show-list button");
        
        
        showListButtons.forEach(button=> {
            button.onclick = () => {
                this.showList.classList.add("invisible");
                let value = null;
                value = button.value;
                BoardReqParams.getInstance().setPage(1);
                BoardReqParams.getInstance().setShowList(value);
                if(value != null) {
                    if(value == "1") {
                        this.showButton.innerHTML = `<button type="button"><i class="fa-solid fa-bars"></i>최신순</button>`;
                    }else if(value == "2") {
                        this.showButton.innerHTML = `<button type="button"><i class="fa-solid fa-bars"></i>추천순</button>`;
                    }else if(value == "2") {
                        this.showButton.innerHTML = `<button type="button"><i class="fa-solid fa-bars"></i>조회순</button>`;
                    }
                }
                BoardApi.getInstance().loadBoardRequest();
            }
        });
       
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
            BoardReqParams.getInstance().setPage(1);
            BoardLoad.getInstance().loadList();
        }
    }

    addSearchEvent() {
        const searchButton = document.querySelector(".search-input button")
        const searchInput = document.querySelector(".search-input input")
         
        searchButton.onclick = () => {
            BoardReqParams.getInstance().setPage(1);
            BoardReqParams.getInstance().setSearchValue(searchInput.value);
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

    nowPage = BoardReqParams.getInstance().getPage();
    firstIndex;
    lastIndex;

    getNowPage(){return this.nowPage;}
    setNowPage(nowPage){this.nowPage = nowPage}

    getFirstIndex(){return this.firstIndex;}
    setFirstIndex(firstIndex){this.firstIndex = firstIndex}

    getLastIndex(){return this.lastIndex;}
    setLastIndex(lastIndex){this.lastIndex = lastIndex}

    addService(totalCount){
        this.setLastPage(totalCount);
        this.setSearchPage(totalCount);
        this.setBottomPageNum(totalCount);
        this.setBottomPageEvent();
        this.setBottomPageMovement();
    }

    setLastPage(totalCount) {
        return (totalCount % 10 == 0) ? totalCount / 10 : Math.floor(totalCount / 10) + 1;
    }
    
    setSearchPage(totalCount) {
        const searchPageNum = document.querySelectorAll(".search-page-num span");
        const searchPageButton = document.querySelectorAll(".search-page-button button");
        
        searchPageNum[0].innerText = this.getNowPage();
        searchPageNum[2].innerText = this.setLastPage(totalCount);

        if(this.getNowPage() != 1) {
            searchPageButton[0].onclick = () => {
                
                this.setNowPage(this.getNowPage() - 1);
                searchPageNum[0].innerText = this.getNowPage();
                BoardReqParams.getInstance().setPage(this.getNowPage());
                BoardLoad.getInstance().loadList();
                this.setSearchPage();
            }
        }else{
            searchPageButton[0].onclick = () => {
                alert("첫 페이지입니다.");
            }
        }

        if(this.getNowPage() != this.getLastIndex()) {
            searchPageButton[1].onclick = () => {
                this.setNowPage(this.getNowPage() + 1);
                searchPageNum[0].innerText = this.getNowPage();
                BoardReqParams.getInstance().setPage(this.getNowPage());
                BoardLoad.getInstance().loadList();
                this.setSearchPage();
            }
        }else {
            searchPageButton[1].onclick = () => {
                alert("마지막 페이지입니다.");
                this.setSearchPage();
            }
        }
        
    }

    setBottomPageNum(totalCount) {
        let firstIndex = this.getNowPage() % 5 == 0 ? this.getNowPage() - 4 : this.getNowPage() - (this.getNowPage() % 5) +1;
        this.setFirstIndex(firstIndex);
        let lastIndex = this.getFirstIndex() + 4 <= this.setLastPage(totalCount) ? this.getFirstIndex() + 4 : this.setLastPage(totalCount);
        this.setLastIndex(lastIndex);
        
        const pageNumButton = document.querySelectorAll(".page-num button");
        
        for(let i = this.getFirstIndex(); i <= this.getLastIndex(); i++) {
            if(i == this.getNowPage()) {
                pageNumButton.innerHTML += `
                    <li><button type="button" class="page-num-blue-button">${i}1</button></li>
                `;
            }else {
                pageNumButton.innerHTML += `
                    <li><button type="button">${i}1</button></li>
                `;
            }
        }

    }

    setBottomPageEvent() {
        const pageNums = document.querySelectorAll(".page-num li");
        
        for(let i = 0; i < pageNums.length; i++) {
            pageNums[i].onclick = () => {
                let pageNum = pageNums[i].innerText;
                pageNums.forEach(button => {
                    button.classList.remove("page-num-blue-button");
                });
                pageNums[i].classList.add("page-num-blue-button");
                
                BoardReqParams.getInstance().setPage(pageNum);
                BoardLoad.getInstance().loadList();
            }
        }
    }

    setBottomPageMovement() {
        const preButton = document.querySelector(".previoust-button button");
        const nextButton = document.querySelector(".next-button button");

        if(this.getNowPage() != 1){
            preButton.onclick = () => {
                this.setNowPage(this.getNowPage() - 1);
                BoardReqParams.getInstance.setPage(this.getNowPage());
                BoardLoad.getInstance().loadList();
            }
        }
        if(this.getNowPage() != this.getLastIndex()) {
            nextButton.onclick = () => {
                this.setNowPage(this.getNowPage() + 1);
                BoardReqParams.getInstance().setPage(this.getNowPage());
                BoardLoad.getInstance().loadList();
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
        ShowListService.getInstance().addButtonEvent();
        SearchService.getInstance().addEvent();
    }

    loadService() {
        
    }

}

window.onload = () => {
    new BoardService();
     
} 