class WriteApi {
    write() {

        $.ajax()
    }
}

class WriteService {
    addCancelButtonEvenet() {
        const cancelButton = document.querySelector(".cancel-button")
        cancelButton.onclick = () => {
            location.href = `/community`;
        }
    }
}

window.onload = () => {
    WriteService.addCancelButtonEvenet();
}