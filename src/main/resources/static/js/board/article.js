class ArticleApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ArticleApi();
        }
        return this.#instance;
    }

    loadArticle() {
        const url = location.href;
        const id = url.substring(url.lastIndexOf("/") + 1);
        $.ajax({
            async: false,
            type: "get",
            url: "/api/article/" + id,
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