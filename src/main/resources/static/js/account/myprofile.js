
const deleteBtn = document.querySelector(".account-delete-button");

deleteBtn.onclick = () => {
    const deleteCheck = document.querySelector(".account-delete-agree-checkbox");

    let id = principalUser.id

    if(!deleteCheck.checked) {
        alert("정책을 읽고 체크해주세요.");
        return;
    } 
    
    if(!confirm("정말로 탈퇴하시겠습니까?")) {
        return;
    } 

    $.ajax({
        async: false,
        type: "delete",
        url: "/api/account/delete/" + id,
        data: JSON.stringify({id: id}),
        dataType:"json",
        success: (response) => {
            alert("탈퇴 성공")
            location.replace("/logout");
        },
        error: (error) => {
            alert("회원탈퇴 실패");
            console.log(error);
        }
    });
}
