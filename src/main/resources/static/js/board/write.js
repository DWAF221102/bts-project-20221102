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
    tempNames = new Array();

    getFormData() {
        return this.formData;
    }

    setFormData() {
        let menu = this.getMenu();
        const category = document.querySelector("#category");
        const subcategory = document.querySelector("#subcategory");
        const title = document.querySelector("#title");
        const content = document.querySelector("#summernote");

        if(principalUser == null) {
            let menu = WriteFormData.getInstance().getMenu();
            alert("로그인 후 작성 가능합니다.");
            location.href = `/${menu}`;
        }else {
            this.formData.append("userId", principalUser.id);
        }
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
        this.formData.append("content", content.value);

        return this.formData;
    }

    getMenu() {
        const uri = location.href;
        const menu = uri.substring(uri.indexOf("/", uri.indexOf("/") + 2) + 1, uri.lastIndexOf("/"));

        return menu;
    }

    setContent() { 
        $('#summernote').summernote('pasteHTML', data);
        $('#summernote').summernote('code'); 
    }

    uploadImg(file, editor) {
        let data = new FormData();
        data.append("file", file);
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
                console.log(response);
                const responseData = response.data;
                $(editor).summernote('insertImage', "/image/board/" + responseData.temp_name);
                this.getFormData().append("originFile", responseData.origin_name);
                this.getFormData().append("tempFile", responseData.temp_name);
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
                if(formData.get("content") != null && formData.get("content") != "" && formData.get("content") != "<p><br></p>" && formData.get("content") != "<p>&nbsp;</p>" && formData.get("content") != "<p><br></p><p><br></p>") {
                    return true;
                }else {
                    alert("내용을 입력해주세요");
                    return false;
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

    deleteImg() {
        const tempFile = new FormData(); 
        tempFile.append("tempName",WriteFormData.getInstance().getFormData().get("tempFile"));

        $.ajax({
            async:false,
            type: "delete",
            url:"/api/img/delete",
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: tempFile,
            dataType: "json",
            success: (response) => {
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
             
        });
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
            // WriteApi.getInstance().deleteImg();
            if(confirm("작성을 취소 하시겠습니까?")) {
                location.href = `/${WriteFormData.getInstance().getMenu()}`;
            }
            
        };

        writeButton.onclick = () => {
            WriteFormData.getInstance().setFormData();
            let formData = WriteFormData.getInstance().getFormData();
            
            if(NullCheck.getInstance().nullCheck(formData)){
                WriteApi.getInstance().writeRequest(formData);
            }else {
                location.reload();
            }
        }
    }
}

window.onload = () => {
    UserCheck.getInstance().addService();
    WriteButtons.getInstance().addButtonEvenet();
    
}