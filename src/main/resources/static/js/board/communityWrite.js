class WriteApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new WriteApi();
        }
        return this.#instance;
    }

    write() {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/community/write",
            dataType: "json",
            success: (response) => {

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
        const cancelButton = document.querySelector(".cancel-button")
        const writeButton = document.querySelector(".write-bitton")

        cancelButton.onclick = () => {
            location.href = `/community`;
        }

        writeButton.onclick = () => {
            WriteApi.getInstance().write();
            location.href = `/community`;
        }
    }
}
const cancelButton = document.querySelector(".cancel-button")
const writeButton = document.querySelector(".write-bitton")

window.onload = () => {
    WriteService.getInstance().addButtonEvenet();
}