window.onload = () => {
    getList();
}

const fileAddButton = document.querySelector(".qna-image-button")
const fileInput = document.querySelector(".file-input")
const submitButton = document.querySelector(".submit-button")

let productImageFiles = new Array();

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
            setCategory(response.data);
            setSubcategory(response.data);
            setText(response.data);
            setinfo(response.data);
            setWantInfo(response.data);
        },
        error: (error) => {
            console.log(error);
        }

    });
    
}

function setCategory(data) {
    const category = document.querySelector("#categoryCode")

    let categoryId = data.categoryId

    if(categoryId == 1) {
        category.options[1].selected =true;
        SubcategorySetting.getInstance().qna();
        
    }else if(categoryId == 2) {
        category.options[2].selected =true;
        SubcategorySetting.getInstance().qna();
    }else if(categoryId == 3) {
        category.options[3].selected =true;
        SubcategorySetting.getInstance().qna();
    }
}

function setSubcategory(data) {
    const subcategoryCode = document.querySelector("#subcategoryCode");
    let categoryId = data.categoryId
    let categorySubId = data.categorySubId;

    if(categoryId == 1) {
        if(categorySubId == 1) {
            subcategoryCode.options[1].selected = true;
        }else if(categorySubId == 2) {
            subcategoryCode.options[3].selected = true;
        }else if(categorySubId == 3) {
            subcategoryCode.options[2].selected = true;
        }
    }else if(categoryId == 2) {
        if(categorySubId == 4) {
            subcategoryCode.options[1].selected = true;
        }else if(categorySubId == 5) {
            subcategoryCode.options[2].selected = true;
        }
    }else if(categoryId == 3) {
        if(categorySubId == 6) {
            subcategoryCode.options[1].selected = true;
        }else if(categorySubId == 7) {
            subcategoryCode.options[2].selected = true;
        }
    }
}

class SubcategorySetting {
    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SubcategorySetting();
        }
        return this.#instance;
    }

    qna() {
        const category = document.querySelector("#categoryCode")
        const categoryValue = category.options[category.selectedIndex].value;
        const subcategory = document.querySelector("#subcategoryCode");

        if(categoryValue == "none") {subcategory.innerHTML = "";
        subcategory.innerHTML = `
            <option value="none" selected>category를 먼저 선택해주세요</option>
        `;
        }else if(categoryValue == "1") {
            subcategory.innerHTML = "";
            subcategory.innerHTML = `
                <option value="none" selected>subcategory를 선택해주세요</option>
                <option value="1">java</option>
                <option value="3">python</option>
                <option value="2">c</option>
            `;
        }else if(categoryValue == "2") {
            subcategory.innerHTML = "";
            subcategory.innerHTML = `
                <option value="none" selected>subcategory를 선택해주세요</option>
                <option value="4">Autocad</option>
                <option value="5">3D</option>
            `;
        }else if(categoryValue == "3") {
            subcategory.innerHTML = "";
            subcategory.innerHTML = `
                <option value="none" selected>subcategory를 선택해주세요</option>
                <option value="6">Preimere</option>
                <option value="7">Adobe</option>
            `;
        }

    }

}


function setText(data) {
    const qnaTitle = document.querySelector(".write-title");
    // input value 값 띄워쓰기에서 버퍼 먹음. 수정해야함.

    qnaTitle.innerHTML = `
        <label for="title">제목</label>
        <input type="text" id="title" name="title" class="create-input" placeholder="제목을 입력해주세요" value=${data.title}>
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








fileAddButton.onclick = () => {
    fileInput.click();
}

fileInput.onchange = () => {
    const formData = new FormData(document.querySelector("form"));
    let changeFlge = false;
    formData.forEach((value) => {
        if(value.size != 0) {
            productImageFiles.push(value);
            changeFlge = true;
        }
    });
    if(changeFlge) {
        getImagePreview();
        fileInput.value = null;
    }
}

function getImagePreview() {
    const productImages = document.querySelector(".product-images");

    productImages.innerHTML = "";

    const reader = new FileReader();

    reader.onload = (e) => {
        productImages.innerHTML +=`
            <div class="img-box">
                <i class="fa-solid fa-xmark"></i>
                <img class="product-img" src="${e.target.result}">
            </div>
        `;
    }

    productImageFiles.forEach((file, i) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            productImages.innerHTML +=`
                <div class="img-box">
                    <i class="fa-solid fa-xmark"></i>
                    <img class="product-img" src="${e.target.result}">
                </div>
            `;
            // xbutton 어디서 만들었는지 확인
            const deleteButton = document.querySelectorAll(".fa-xmark");
            deleteButton.forEach((xbutton, index) => {
                xbutton.onclick = () => {
                    if(confirm("상품 이미지를 지우시겠습니까?")){
                        productImageFiles.splice(index, 1);
                        console.log(productImageFiles);
                        getImagePreview();
                    }
                };
            })
        }
        setTimeout(() => {reader.readAsDataURL(file), (i*100);});
        // 이거는 나중에 다시 확인
    });
}





submitButton.onclick = () => {
    const productInputs = document.querySelectorAll(".create-input")

    let formData = new FormData();

    formData.append("category", productInputs[0].value);
    formData.append("subcategory", productInputs[1].value);
    formData.append("title", productInputs[2].value);
    formData.append("info", productInputs[3].value);
    formData.append("wantInfo", productInputs[4].value);
    formData.append("price", productInputs[5].value);

    productImageFiles.forEach((file) => {
        formData.append("files",file);
    });

    formData.append("userId", principalUser.id)

    request(formData);

}

function request(formData) {
    $.ajax({
        async: false,
        type: "put",
        url: "/api/qnaUpdate/update", //api 확인
        enctype: "mutipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            alert("상품수정 완료")
            location.replace("/question")
        },
        error: (error) => {
            alert("상품수정 실패");
            console.log(error);
        }

    });

}

    