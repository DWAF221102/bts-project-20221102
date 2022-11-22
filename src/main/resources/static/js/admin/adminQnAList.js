let page = 1;

window.onload = () => {
    getList();
}


function getList() {
    $.ajax({
        async: false,
        type: "get",
        url: "/api/qna/qnaLists",
        data: {
            pageNumber: page,
            category: "",
            searchText: ""
        },
        dataType: "json",
        success: (response) => {
            console.log(response);
            addCreate(response.data);
        },
        error: (error) => {
            console.log(error);
        }

    });
}

function addCreate(qnaLists) {
    const listBody = document.querySelector(".list-body");

    listBody.innerHTML = "";

    qnaLists.forEach((qna) => {
        listBody.innerHTML += `
    <tr>
        <td class="user-id">${qna.user_id}</td>
        <td>${qna.subcategory}</td>
        <td>${qna.title}</td>
        <td>${qna.statusId}</td>
        <td><button type="button" class="detail-button">상세보기</button></td>
        <td><button type="button" class="delete-button">삭제</button></td>
    </tr>
    <tr class="detail-invisible qna-detail">
        <td colspan="6">
            <textarea class="detail-box" disabled>그냥 모르겠습니다.</textarea>
        </td>
    </tr>
        `;
    });

    const detailButtons = document.querySelectorAll(".detail-button");
    const qnaDetail = document.querySelectorAll(".qna_detail");

    detailButtons.forEach((detailButton, index) => {
        detailButton.onclick = () => {
            qnaDetail[index].classList.toggle("detail-invisible");
        }
    })
}

function deleteRequest(qnaListId) {
    $.ajax({
        async: false,
        type: "delete",
        url: "/api/qnaLists/" + qnaListId,
        dataType: "json",
        success: (response) => {
            alert("상품 삭제 완료!");
            location.reload();
        },
        error: (error) => {
            alert("상품 삭제 실패!");
            console.log(error);
        }

    });
}

const deleteButtons = document.querySelectorAll(".delete-button")
deleteButtons.forEach((deleteButton, index) => {

    deleteButton.onclick = () => {
        console.log(deleteButton)
        if(confirm("상품을 삭제하시겠습니까?")) {
            
            deleteRequest(responseData[index].id);
        }
    }
});