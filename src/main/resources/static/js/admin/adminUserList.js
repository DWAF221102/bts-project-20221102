const listSearchBtn = document.querySelector(".search-button");
const listSearchInput = document.querySelector(".search-input");
let searchValue = "";

//////////////////////////////////////////////////////////////////

loadUserListRequest(searchValue);

//////////////////////////////////////////////////////////////////

listSearchInput.onkeyup = () => {
    if (window.event.keyCode === 13) {
        listSearchBtn.click();
    }
}

listSearchBtn.onclick = () => {
    let searchValue = listSearchInput.value;
    loadUserListRequest(searchValue);
}

function loadUserListRequest(searchValue) {
    let responseData = null;

    $.ajax({
        async: false,
        url: "/api/admin/userlist",
        data: {
            "searchValue": searchValue
        },
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadUserList(responseData);
            deleteUser(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadUserList(responseData) {
    const listBody = document.querySelector(".user-list-body");

    listBody.innerHTML = "";

    responseData.forEach(data => {

        listBody.innerHTML += `
            <tr>
                <td>${data.username}</td>
                <td>${data.name}</td>
                <td>${data.nickname}</td>
                <td>${data.phone}</td>
                <td>${data.roleName}</td>
                <td><button type="button" class="user-delete-button delete">삭제</button></td>
            </tr>
        `
    });
}

function deleteUser(responseData) {
    const deleteBtns = document.querySelectorAll(".user-delete-button")

    deleteBtns.forEach((deleteBtn, index) => {
        deleteBtn.onclick = () => {
            if (confirm("정말로 탈퇴 시키겠습니까?")) {
                deleteUserRequest(responseData[index].id);
            }
        }
    });
}

function deleteUserRequest(id) {
    $.ajax({
        async: false,
        type: "delete",
        url: "/api/admin/userlist/delete/" + id,
        dataType: "json",
        success: (response) => {
            alert("회원 삭제 완료.")
            location.reload();
        },
        error: (error) => {
            alert("회원 삭제 실패");
            console.log(error);
        }
    });
}

