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
            console.log(files);
            WriteFormData.getInstance().setFile(files, this);
        }

        // onChange: function(content) {
        //     console.log(content);
        //     for(let i = 0; i < content.length; i++){
        //         if(i == content.length - 1){
        //             WriteFormData.getInstance().setContent(content[i],this);
        //         }
        //     }
            
        // }

    }
});

$('.note-statusbar').hide(); 

// let content = $('#summernote').summernote('insertText', value)


class WriteFormData {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteFormData();
        }
        return this.#instance;
    }

    formData;

    constructor() {
        this.formData = new FormData(document.querySelector("form"));
    }


    getFormData() {
        const uri = location.href;
        const menu = uri.substring(uri.indexOf("/", uri.indexOf("/") + 2) + 1, uri.lastIndexOf("/"));
       
        this.formData.append("userId", 1);
        this.formData.append("menu", menu);


        return this.formData;
    }

    setFile(files, editor) {
        if(files != null) {
            const imgFiles = new Array();

            for(let i = 0; i < files.length; i++) {
            imgFiles.push(files[i]);
            //this.formData.append("file", files[i]); 
            }
            this.formData.append("file", imgFiles);
            console.log(this.formData.get("file"));
        }
    }

    setContent() {
        $('#summernote').summernote('pasteHTML', data);
        this.formData.append("content", data);
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

    write() {
        let formData = WriteFormData.getInstance().getFormData();

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
                //$(editor).summernote('insertImage', formData.get("file"));
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
}

class WriteService {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteService();
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
            //location.href = `/${WriteReqParam.getInstance().getFormData().menu}`;
            WriteApi.getInstance().write();
        };
    }
}

window.onload = () => {
    WriteService.getInstance().addButtonEvenet();
}