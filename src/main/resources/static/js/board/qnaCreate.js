const fileAddButton = document.querySelector(".qna-image-button")
const fileInput = document.querySelector(".file-input")
const submitButton = document.querySelector(".submit-button")

let productImageFiles = new Array();

function setSubcategory() {
    const category = document.querySelector("#categoryCode");
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
    // else if(categoryValue == "2") {
    //     subcategory.innerHTML = "";
    //     subcategory.innerHTML = `
    //         <option value="none" selected>subcategory를 선택해주세요</option>
    //         <option value="18">일상</option>
    //         <option value="19">팁</option>
    //         <option value="20">모임&스터디</option>
    //     `;
    // }else if(categoryValue == "3") {
    //     subcategory.innerHTML = "";
    //     subcategory.innerHTML = `
    //         <option value="none" selected>subcategory를 선택해주세요</option>
    //         <option value="21">일상</option>
    //         <option value="22">팁</option>
    //         <option value="23">모임&스터디</option>
    //     `;
    // }
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
        type: "post",
        url: "/api/qna/", //api 확인
        enctype: "mutipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        dataType: "json",
        success: (response) => {
            alert("상품등록 완료")
            location.replace("/question")
        },
        error: (error) => {
            alert("상품등록 실패");
            console.log(error);
        }

    });
}