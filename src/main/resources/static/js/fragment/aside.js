//별점랭킹/////////////////////////////////////////////////////////////////////////////

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
    const rankUserList = document.querySelector(".rank-user-list");
        
    responseData.forEach(data => {
        let scoreAvg = parseFloat(data.scoreAvg).toFixed(1);
        
        rankUserList.innerHTML += `
            <dd>
                <a href="/myactivity/${data.id}"  class="m_avatar"><img src="/image/user/${data.userImg}"></a>
                <a href="/myactivity/${data.id}"  class="m_id">${data.nickname}</a>
                <span class="m_score m_star">${scoreAvg}</span>
            </dd>
        `;
    });
}



//가격랭킹/////////////////////////////////////////////////////////////////////////////

loadPriceAsideRequest();

function loadPriceAsideRequest() {
    let responseData= null;

    $.ajax({
        async: false,
        type: "get",
        url: "/api/index/aside/price",
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            loadPriceAside(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}


function loadPriceAside(responseData) {
    const rankPriceList = document.querySelector(".rank-price-list");
    
    responseData.forEach(data => {
        rankPriceList.innerHTML += `
            <dd>
                <a href="/myactivity/${data.userId}"  class="m_avatar"><img src="/image/user/${data.userImg}"></a>
                <a href="/myactivity/${data.userId}"  class="m_id">${data.nickname}</a>
                <span class="point">${data.price} P</span>
            </dd>
        `;
    });
}