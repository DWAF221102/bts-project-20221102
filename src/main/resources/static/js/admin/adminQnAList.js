const searchBtn = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const allBtn = document.querySelector(".all-button");
const waitBtn = document.querySelector(".wait-button");
const ongoingBtn = document.querySelector(".ongoing-button");
const completionBtn = document.querySelector(".completion-button");

let searchValue = "";
let statusValue = "";

/////////////////////////////////////////////////////////////////
loadQnAListRequest(searchValue, statusValue);
/////////////////////////////////////////////////////////////////

allBtn.onclick = () => {
    loadQnAListRequest(searchValue, statusValue);
    allBtn.classList.add('qna-status-color');
    waitBtn.classList.remove('qna-status-color');
    ongoingBtn.classList.remove('qna-status-color');
    completionBtn.classList.remove('qna-status-color');

}

waitBtn.onclick = () => {
    let statusValue = "대기중";
    loadQnAListRequest(searchValue, statusValue);
    waitBtn.classList.add('qna-status-color');
    allBtn.classList.remove('qna-status-color');
    ongoingBtn.classList.remove('qna-status-color');
    completionBtn.classList.remove('qna-status-color');
}

ongoingBtn.onclick = () => {
    let statusValue = "진행중";
    loadQnAListRequest(searchValue, statusValue);
    ongoingBtn.classList.add('qna-status-color');
    allBtn.classList.remove('qna-status-color');
    waitBtn.classList.remove('qna-status-color');
    completionBtn.classList.remove('qna-status-color');
}

completionBtn.onclick = () => {
    let statusValue = "완료";
    loadQnAListRequest(searchValue, statusValue);
    completionBtn.classList.add('qna-status-color');
    allBtn.classList.remove('qna-status-color');
    waitBtn.classList.remove('qna-status-color');
    ongoingBtn.classList.remove('qna-status-color');
}

/////////////////////////////////////////////////////////////////

searchInput.onkeyup = () => {
    if(window.event.keyCode === 13) {
        searchBtn.click();
    }
}

searchBtn.onclick = () => {
    let searchValue = searchInput.value;
    loadQnAListRequest(searchValue, statusValue);  

    allBtn.classList.add('qna-status-color');
    waitBtn.classList.remove('qna-status-color');
    ongoingBtn.classList.remove('qna-status-color');
    completionBtn.classList.remove('qna-status-color');
}

function loadQnAListRequest(searchValue, statusValue) {
    let responseData = null;

    $.ajax({
        async: false,
        url: "/api/admin/qnalist",
        data: {
            "searchValue" : searchValue,
            "statusValue" : statusValue
        },
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadQnAList(responseData);
            deleteQnA(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadQnAList(responseData) {
    const listBody = document.querySelector(".list-body");

    listBody.innerHTML = "";

    responseData.forEach(data => {

        listBody.innerHTML += `
            <tr>
                <td class="user-id">${data.nickname}</td>
                <td>${data.categoryName}</td>
                <td>${data.subcategoryName}</td>
                <td>${data.title}</td>
                <td>${data.status}</td>
                <td><a href="/question/article/${data.id}"><button type="button" class="detail-button">상세보기</button></a></td>
                <td><button type="button" class="qna-delete-button">삭제</button></td>
            </tr>
        `
    }); 
}

function deleteQnA(responseData) {
    const deleteBtns = document.querySelectorAll(".qna-delete-button");
   
    deleteBtns.forEach((deleteBtn, index) => {
        deleteBtn.onclick = () => {
            if(confirm("정말로 삭제하시겠습니까?")) {
                deleteQnARequest(responseData[index].id);
            }
        }
    });
}

function deleteQnARequest(id) {
    $.ajax({
        async: false,
        type: "delete",
        url: "/api/admin/qnalist/delete/" + id,
        dataType:"json",
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