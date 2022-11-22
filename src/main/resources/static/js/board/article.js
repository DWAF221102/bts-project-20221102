class ArticleApi {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ArticleApi();
        }
        return this.#instance;
    }

    loadArticle() {
        $.ajax({
            async: false,
            type: "get",
            url: "/api/article" + boardId,
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