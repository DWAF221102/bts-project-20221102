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

class WriteFormData {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteFormData();
        }
        return this.#instance;
    }

    #formData = new FormData();

    getFormData() {
        return this.#formData;
    }

    setFormData() {
        const uri = location.href;
        const menu = uri.substring(uri.indexOf("/", uri.indexOf("/") + 2) + 1, uri.lastIndexOf("/"));
        const category = document.querySelector("#category");
        const subcategory = document.querySelector("#subcategory");
        const title = document.querySelector("#title");
        const content = document.querySelector("#summernote");

        this.#formData.append("userId", 1);
        if(menu == "knowledge") {
            this.#formData.append("menu", "2");
        }else if(menu == "community") {
            this.#formData.append("menu", "3");
        }else if(menu == "notice") {
            this.#formData.append("menu", "4");
        }
        this.#formData.append("category", category.value);
        this.#formData.append("subcategory", subcategory.value);
        this.#formData.append("title", title.value);
        this.#formData.append("content", content.value);

        return this.#formData;
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
                $(editor).summernote('insertImage', "/image/board/" + response.temp_name);
                this.getFormData().append("originFile", response.origin_name);
                this.getFormData().append("tempFile", response.temp_name);
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

    write(formData) {
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
                
            },
            error: (error) => {
                console.log(error);
            }
        })
    } 

    
}

class writeButtons {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new writeButtons();
        }
        return this.#instance;
    }

    addButtonEvenet() {
        const cancelButton = document.querySelector(".cancel-button");
        const writeButton = document.querySelector(".write-button");

        cancelButton.onclick = () => {
            location.href = `/${WriteReqParam.getInstance().getFormData().get("menu")}`;
        };

        writeButton.onclick = () => {
            WriteFormData.getInstance().setFormData();
            let formData = WriteFormData.getInstance().getFormData();

            if(NullCheck.getInstance().nullCheck(formData)){
                WriteApi.getInstance().write(formData);
            }
        }
    }
}

window.onload = () => {
    writeButtons.getInstance().addButtonEvenet();
}