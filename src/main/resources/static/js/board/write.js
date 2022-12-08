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
                WriteFormData.getInstance().uploadImg(files[i], this);
            }
        }

    }
});

$('.note-statusbar').hide(); 

class UserCheck {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserCheck();
        }
        return this.#instance;
    }

    addService() {
        if(principalUser == null) {
            let menu = WriteFormData.getInstance().getMenu();
            alert("로그인 후 작성 가능합니다.");
            location.href = `/${menu}`;
        }
    }
}

class WriteFormData {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteFormData();
        }
        return this.#instance;
    }
    
    formData = new FormData();

    setFormData() {
        let menu = this.getMenu();
        const category = document.querySelector("#category");
        const subcategory = document.querySelector("#subcategory");
        const title = document.querySelector("#title");
        const content = document.querySelector("#summernote");
        
        
        this.formData.append("userId", principalUser.id);
        
        if(menu == "knowledge") {
            this.formData.append("menu", "2");
        }else if(menu == "community") {
            this.formData.append("menu", "3");
        }else if(menu == "notice") {
            this.formData.append("menu", "4");
        }
        this.formData.append("category", category.value);
        this.formData.append("subcategory", subcategory.value);
        this.formData.append("title", title.value);
        let reContent = content.value.replace(/summernote/g, "board");
        this.formData.append("content", reContent);
        this.setImg(content);

        return this.formData;
    }

    getMenu() {
        const url = location.href;
        const menu = url.substring(url.indexOf("/", url.indexOf("/") + 2) + 1, url.lastIndexOf("/"));

        return menu;
    }

    setImg(content) {
        let array = new Array();
        array = content.value.split(/[\ /]/);
        array.forEach(str => {
            if(str.includes("jpg")) {
                this.formData.append("img", str.substring(0, str.lastIndexOf('"')));
            }else if(str.includes("png")) {
                this.formData.append("img", str.substring(0, str.lastIndexOf('"')));
            }else if(str.includes("jpeg")) {
                this.formData.append("img", str.substring(0, str.lastIndexOf('"')));
            }else if(str.includes("webp")) {
                this.formData.append("img", str.substring(0, str.lastIndexOf('"')));
            }
        });
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
            },
            error: (error) => {
                console.log(error);
                alert("이미지 업로드 실패!");
            }
        })
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

class WriteApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteApi();
        }
        return this.#instance;
    }

    writeRequest(formData) {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/write",
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: (response) => {
                console.log(response);
                alert("게시글 작성 완료");
                location.href = `/${WriteFormData.getInstance().getMenu()}`;
                
            },
            error: (error) => {
                console.log(error);
            }
        })
    } 
    
    imgDeleteReq(formData) {
        $.ajax({
            async: false,
            type: "delete",
            url: "/api/img/delete",
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

class WriteButtons {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteButtons();
        }
        return this.#instance;
    }

    addButtonEvenet() {
        const cancelButton = document.querySelector(".cancel-button");
        const writeButton = document.querySelector(".write-button");
        
        
        cancelButton.onclick = () => {
            if(confirm("작성을 취소 하시겠습니까?")) {
                let formData = WriteFormData.getInstance().setFormData();
                WriteApi.getInstance().imgDeleteReq(formData);
                location.href = `/${WriteFormData.getInstance().getMenu()}`;
            }
            
        };

        writeButton.onclick = () => {
            let formData = WriteFormData.getInstance().setFormData();
            if(NullCheck.getInstance().nullCheck(formData)){
                WriteApi.getInstance().writeRequest(formData);
            }else {
                location.reload();
            }
        }
    }
}

window.onload = () => {
    // UserCheck.getInstance().addService();
    WriteButtons.getInstance().addButtonEvenet();
    
}