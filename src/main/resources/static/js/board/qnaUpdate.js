window.onload = () => {
    getList();
}

function getList() {
    const uri = location.href;
    const id = uri.substring(uri.lastIndexOf("/") + 1);

    $.ajax({
        async: false,
        type: "get",
        url: "/api/qnaUpdate/" + id,
        dataType: "json",
        success: (response) => {
            console.log(response);
            console.log("동작");
            setText(response.data);
            setinfo(response.data);
            setWantInfo(response.data);
        },
        error: (error) => {
            console.log(error);
        }

    });
    
}

// function setCategory(data) {
//     const categoryCode = document.querySelector("categoryCode");


// }

    function setText(data) {
        const qnaTitle = document.querySelector(".write-title");

        qnaTitle.innerHTML = `
            <label for="title">제목</label>
            <input type="text" id="title" name="title" class="create-input" placeholder="제목을 입력해주세요">${data.title}
        `

    }

    function setinfo(data) {
        const qnaInfo = document.querySelector(".write-textarea");

        qnaInfo.innerHTML = `
            <label for="textarea">문제설명</label>
            <textarea class="text-input create-input" placeholder="내용을 입력해주세요.">${data.info}</textarea>
        `
    }

    function setWantInfo(data) {
        const qnaWantInfo = document.querySelector(".want-textarea");

        qnaWantInfo.innerHTML = `
            <label for="textarea">희망결과</label>
            <textarea class="text-input create-input" placeholder="내용을 입력해주세요.">${data.wantInfo}</textarea>
        `
    }