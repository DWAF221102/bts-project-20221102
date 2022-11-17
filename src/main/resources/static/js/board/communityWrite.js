function setSubcategory() {
    const category = document.querySelector("#category");
    const categoryValue = category.options[category.selectedIndex].value;
    const subcategory = document.querySelector("#subcategory");
    
    if(categoryValue == "none") {subcategory.innerHTML = "";
    subcategory.innerHTML = `
        <option value="none" selected>category를 먼저 선택해주세요</option>
    `;
    }else if(categoryValue == "7") {
        subcategory.innerHTML = "";
        subcategory.innerHTML = `
            <option value="none" selected>subcategory를 선택해주세요</option>
            <option value="15">일상</option>
            <option value="16">팁</option>
            <option value="17">모임&스터디</option>
        `;
    }else if(categoryValue == "8") {
        subcategory.innerHTML = "";
        subcategory.innerHTML = `
            <option value="none" selected>subcategory를 선택해주세요</option>
            <option value="18">일상</option>
            <option value="19">팁</option>
            <option value="20">모임&스터디</option>
        `;
    }else if(categoryValue == "9") {
        subcategory.innerHTML = "";
        subcategory.innerHTML = `
            <option value="none" selected>subcategory를 선택해주세요</option>
            <option value="21">일상</option>
            <option value="22">팁</option>
            <option value="23">모임&스터디</option>
        `;
    }
}