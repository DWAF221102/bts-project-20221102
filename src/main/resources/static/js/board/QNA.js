loadAnswer();
function loadAnswer() {
    // const uri = location.href;
    // const id = uri.substring(uri.lastIndexOf("/") + 1);
    const answerArea = document.querySelector(".answer-area");
    let responseData = null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/qna/question/article/answer",
        // data: data,
        dataType: "json",
        success: (response) => {
            alert("요청 보냄");
            responseData = response;
            console.log(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
    // console.log(causerAnalysis);
    // console.log(solutionPlan);
}