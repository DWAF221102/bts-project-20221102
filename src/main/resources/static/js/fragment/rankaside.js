
loadRankUserAsideRequest();

function loadRankUserAsideRequest() {
    let responseData= null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/index/aside/rankuser",
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadRankUserAside(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function loadRankUserAside(responseData) {
    const rankUl = document.querySelector(".aside-rank-ul");
    
    rankUl.innerHTML = "";
    
    responseData.forEach(data => {
        let scoreAvg = parseFloat(data.scoreAvg).toFixed(1);
        
        rankUl.innerHTML += `
            <li>
                <div class="mini-profile">
                    <a href="/myactivity/${data.id}"><img src="/image/user/${data.userImg}"></a>
                    <a href="/myactivity/${data.id}">${data.nickname}</a>
                </div>
                <div class="score">
                    <div><i class="fa-solid fa-star"></i></div>
                    <span>${scoreAvg}</span>
                </div>
            </li>
        `;
    });
}