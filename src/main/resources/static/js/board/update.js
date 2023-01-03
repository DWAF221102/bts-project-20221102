$('#summernote').summernote({
    placeholder: '내용을 작성하세요.',
    height: 400,
    disableResizeEditor: true,

    toolbar: [
        ['style', ['bold', 'underline', 'clear']],
        ['fontsize', ['fontsize']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['picture']]
    ],

    popover: {
        image: [
          ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
          ['float', ['floatLeft', 'floatRight', 'floatNone']],
          ['remove', ['removeMedia']]
        ]
      },

    callbacks: {
        onImageUpload: function(files) {
            for (var i = files.length - 1; i >= 0; i--) {
                UpdateFormData.getInstance().uploadImg(files[i], this);
            }
        }

    }
});

$('.note-statusbar').hide(); 

class UpdateApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UpdateApi();
        }
        return this.#instance;
    }


    loadArticleReq() {
        let url = location.href;
        let id = url.substring(url.lastIndexOf("/") + 1);
        let responseData= null;
        
        $.ajax({
            async: false,
            type: "get",
            url: "/api/update/" + id,
            dataType: "json",
            success: (response) => {
                console.log(response);
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        })
        return responseData;
    }

    updateReq(formData) {
        $.ajax({
            async: false,
            type: "put",
            url: "/api/update",
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: (response) => {
                console.log(response);
                alert("게시글 수정 완료");
                
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    cancelReq(formData) {
        $.ajax({
            async: false,
            type: "delete",
            url: "/api/update/cancel",
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    deleteReq(formData) {

        $.ajax({
            async: false,
            type: "delete",
            url: "/api/article/delete",
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}


class OldData {
    static #instance;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new OldData();
        }
        return this.#instance;
    }

    oldDataService(responseData) {
         
        if(responseData != null) {
            this.setCategory(responseData);
            this.setSubcategory(responseData);
            this.setTitle(responseData);
            this.setContent(responseData);
            return true;
        }else {
            return false;
        }   
    }

    

    setCategory(responseData) {
        const category = document.querySelector("#category");
        
        let menu = this.getMenu();
        let categoryId = responseData.categoryId;
        if(menu == "knowledge") {
            if(categoryId == 4) {
                category.options[1].selected = true;
                SubcategorySetting.getInstance().knowledge();
            }else if(categoryId == 5) {
                category.options[2].selected = true;
                SubcategorySetting.getInstance().knowledge();
            }else if(categoryId == 6) {
                category.options[3].selected = true;
                SubcategorySetting.getInstance().knowledge();
            }
        }else if(menu == "community") {
            if(categoryId == 7) {
                category.options[1].selected = true;
                SubcategorySetting.getInstance().community();
            }else if(categoryId == 8) {
                category.options[2].selected = true;
                SubcategorySetting.getInstance().community();
            }else if(categoryId == 9) {
                category.options[3].selected = true;
                SubcategorySetting.getInstance().community();
            }
        }
    }

    setSubcategory(responseData) {
        const subcategory = document.querySelector("#subcategory");
        let categoryId = responseData.categoryId;
        let subcategoryId = responseData.subcategoryId;


        if(categoryId == 4) {
            if(subcategoryId == 8) {
                subcategory.options[1].selected = true;
            }else if(subcategoryId == 9) {
                subcategory.options[2].selected = true;
            }else if(subcategoryId == 10) {
                subcategory.options[3].selected = true;
            }
        }else if(categoryId == 5) {
            if(subcategoryId == 11) {
                subcategory.options[1].selected = true;
            }else if(subcategoryId == 12) {
                subcategory.options[2].selected = true;
            }
        }else if(categoryId == 6) {
            if(subcategoryId == 13) {
                subcategory.options[1].selected = true;
            }else if(subcategoryId == 14) {
                subcategory.options[2].selected = true;
            }
        }else if(categoryId == 7) {
            if(subcategoryId == 15) {
                subcategory.options[1].selected = true;
            }else if(subcategoryId == 16) {
                subcategory.options[2].selected = true;
            }else if(subcategoryId == 17) {
                subcategory.options[3].selected = true;
            }
        }else if(categoryId == 8) {
            if(subcategoryId == 18) {
                subcategory.options[1].selected = true;
            }else if(subcategoryId == 19) {
                subcategory.options[2].selected = true;
            }else if(subcategoryId == 20) {
                subcategory.options[3].selected = true;
            }
        }else if(categoryId == 9) {
            if(subcategoryId == 21) {
                subcategory.options[1].selected = true;
            }else if(subcategoryId == 22) {
                subcategory.options[2].selected = true;
            }else if(subcategoryId == 23) {
                subcategory.options[3].selected = true;
            }
        }
    }

    setTitle(responseData) {
        const title = document.querySelector("#title");
        title.value = responseData.title;
    }

    setContent(responseData) {
        $('#summernote').summernote('pasteHTML', responseData.content);
    }

    getMenu() {
        const url = location.href;
        const menu = url.substring(url.indexOf("/", url.indexOf("/") + 2) + 1, url.lastIndexOf("/", url.lastIndexOf("/") - 1));

        return menu;
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

    knowledge() {
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

    community() {
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
}

class UpdateFormData {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UpdateFormData();
        }
        return this.#instance;
    }
    
    formData = new FormData();
    tempNames = new Array();
    

    getFormData() {
        return this.formData;
    }

    setFormData(responseData) {
        
        let url = location.href;
        let id = url.substring(url.lastIndexOf("/") + 1);
        const category = document.querySelector("#category");
        const subcategory = document.querySelector("#subcategory");
        const title = document.querySelector("#title");
        const content = document.querySelector("#summernote");
        let reContent = content.value.replace(/summernote/g, "board");
        let oldImgs = this.findImg(responseData.content);
        let imgs = this.findImg(content.value);

        this.formData.append("id", id);
        this.formData.append("category", category.value);
        this.formData.append("subcategory", subcategory.value);
        this.formData.append("title", title.value);
        this.formData.append("content", reContent);
        imgs.forEach(img => {
            this.formData.append("img", img);
        });
        this.setDeleteImgs(oldImgs, imgs).forEach(img => {
            this.formData.append("deleteImg", img);
        });

        return this.formData;
    }


    findImg(content) {
        let array = new Array();
        let returnData = new Array();
        array = content.split(/[\ /]/);
        array.forEach(str => {
            if(str.includes("jpg")) {
                returnData.push(str.substring(0, str.lastIndexOf('"')));
            }else if(str.includes("png")) {
                returnData.push(str.substring(0, str.lastIndexOf('"')));
            }if(str.includes("jpeg")) {
                returnData.push(str.substring(0, str.lastIndexOf('"')));
            }
        });
        return returnData;
    } 

    uploadImg(file, editor) {
        let data = new FormData();
        data.append("file", file);
        this.formData.append("imgFiles", file);
        $.ajax({
            async: false,
            type: "post",
            url: "/api/uploadimg",
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: data,
            dataType: "json",
            success: (response) => {
                let fileName = response.data;
                $(editor).summernote('insertImage', "/image/summernote/" + fileName);
                this.formData.append("tempName", fileName);
                this.formData.append("files", file);
                this.tempNames.push(fileName);
            },
            error: (error) => {
                console.log(error);
                alert("이미지 업로드 실패!");
            }
        })
    }

    setDeleteImgs(oldImgs, imgs){
        let deleteImgs = new Array();
        oldImgs.forEach(img => {
            if(imgs.indexOf(img) == -1){
                deleteImgs.push(img);
            }
        });
        return deleteImgs;
    }
}

class NullCheck {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new NullCheck();
        }
        return this.#instance;
    }


    nullCheck(formData) {       
        if(formData.get("category") != "none" && formData.get("subcategory") != "none") {
            if(formData.get("title") != null && formData.get("title") != "" && formData.get("title").replaceAll(" ", "") != "") {
                if($('#summernote').summernote('isEmpty')) {
                    alert("내용을 입력해주세요");
                    return false;
                }else {
                    return true;
                }
            }else {
                alert("제목을 입력해주세요");
                return false;
            }
        }else {
            alert("카테고리를 선택해주세요");
            return false;
        }
    }

}

class UpdateService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UpdateService();
        }
        return this.#instance;
    }

    updateService() {
        let responseData = UpdateApi.getInstance().loadArticleReq();
        if(OldData.getInstance().oldDataService(responseData)) {
            ButtonService.getInstance().addButtonService(responseData);
        }
    }
}

class ButtonService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ButtonService();
        }
        return this.#instance;
    }

    addButtonService(responseData) {
        this.setUpdateButton(responseData);
        this.setCencelButton(responseData);
        this.setDeleteButton(responseData);
        
    }
    
    getId() {
        let url = location.href;
        let id = url.substring(url.lastIndexOf("/") + 1);
        return id;
    }

    getMenu() {
        let url = location.href;
        let menu = url.substring(url.indexOf("/", url.indexOf("/") + 2) + 1, url.lastIndexOf("/", url.lastIndexOf("/") - 1));
   
        return menu;
    }

    setUpdateButton(responseData) {
        let id = this.getId();
        const updateButton = document.querySelector(".update-button");
        updateButton.onclick = () => {
            let formData = UpdateFormData.getInstance().setFormData(responseData);
            if(NullCheck.getInstance().nullCheck(formData)){
                if(confirm("수정하시겠습니까?")){
                    UpdateApi.getInstance().updateReq(formData);
                    location.href = "/article/" + id;
                }
            }
        };
    }

    setCencelButton(responseData) {
        const cancelButton = document.querySelector(".cancel-button");

        let id = this.getId();

        cancelButton.onclick = () => {
            let fromDate = UpdateFormData.getInstance().setFormData(responseData);
            
            if(confirm("취소하시겠습니까???")){
                
                UpdateApi.getInstance().cancelReq(fromDate);
                
                location.href = "/article/" + id;
            }
        };
    }

    setDeleteButton(responseData) {
        const deleteButton = document.querySelector(".delete-button");
        let menu = this.getMenu()
        
        deleteButton.onclick = () => {
            let formData = UpdateFormData.getInstance().setFormData(responseData);
            
            if(confirm("게시물을 삭제하시겠습니까?")) {
                UpdateApi.getInstance().deleteReq(formData);
                location.href = "/" + menu;
            }
        };
    }
}

window.onload = () => {
    UpdateService.getInstance().updateService();
}

