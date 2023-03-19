const listSearchBtn = document.querySelector(".list-search-button");
const listSearchInput = document.querySelector(".list-search-input");
let searchValue = "";

/////////////////////////////////////////////////////////////////
loadBoardListRequest(searchValue);
/////////////////////////////////////////////////////////////////

listSearchInput.onkeyup = () => {
    if (window.event.keyCode === 13) {
        listSearchBtn.click();
    }
}

listSearchBtn.onclick = () => {
    let searchValue = listSearchInput.value;
    loadBoardListRequest(searchValue);
}

function loadBoardListRequest(searchValue) {
    let responseData = null;

    $.ajax({
        async: false,
        url: "/api/admin/boardlist",
        data: {
            "searchValue": searchValue
        },
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadBoardList(responseData);
            deleteboard(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadBoardList(responseData) {
    const listBody = document.querySelector(".board-list-body");

    listBody.innerHTML = "";

    responseData.forEach(data => {

        listBody.innerHTML += `
            <tr>
                <td>${data.nickname}</td>
                <td>${data.categoryName}</td>
                <td>${data.subcategoryName}</td>
                <td>${data.title}</td>
                <td>
                    <a class="detail" href="/article/${data.id}">
                        <button class="detail-button" type="button">상세보기</button>
                    </a>
                </td>
                <td><button type="button" class="board-delete-button delete">삭제</button></td>
            </tr>
        `
    });
}

function deleteboard(responseData) {
    const deleteBtns = document.querySelectorAll(".board-delete-button");

    deleteBtns.forEach((deleteBtn, index) => {
        deleteBtn.onclick = () => {
            if (confirm("정말로 삭제하시겠습니까?")) {
                deleteBoardRequest(responseData[index].id);
            }
        }
    });
}

function deleteBoardRequest(id) {
    $.ajax({
        async: false,
        type: "delete",
        url: "/api/admin/boardlist/delete/" + id,
        dataType: "json",
        success: (response) => {
            alert("게시판 삭제 완료.")
            location.reload();
        },
        error: (error) => {
            alert("게시판 삭제 실패");
            console.log(error);
        }
    });
}