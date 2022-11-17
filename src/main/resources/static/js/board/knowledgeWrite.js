function setSubcategory() {
    const category = document.querySelector("#category");
    const categoryValue = category.options[category.selectedIndex].value;
    const subcategory = document.querySelector("#subcategory");
    
    if(categoryValue == "none") {subcategory.innerHTML = "";
    subcategory.innerHTML = `
        <option value="none" selected>category를 먼저 선택해주세요</option>
    `;
    }else if(categoryValue == "4") {
        subcategory.innerHTML = "";
        subcategory.innerHTML = `
            <option value="none" selected>subcategory를 선택해주세요</option>
            <option value="8">Java</option>
            <option value="9">Python</option>
            <option value="10">C</option>
        `;
    }else if(categoryValue == "5") {
        subcategory.innerHTML = "";
        subcategory.innerHTML = `
            <option value="none" selected>subcategory를 선택해주세요</option>
            <option value="11">Autocad</option>
            <option value="12">3D</option>
        `;
    }else if(categoryValue == "6") {
        subcategory.innerHTML = "";
        subcategory.innerHTML = `
            <option value="none" selected>subcategory를 선택해주세요</option>
            <option value="13">Preimere</option>
            <option value="14">Adobe</option>
        `;
    }
}