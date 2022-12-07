
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
    const priceUl = document.querySelector(".aside-price-ul");
    
    priceUl.innerHTML = "";
    
    responseData.forEach(data => {
        priceUl.innerHTML += `
            <li>
                <div class="mini-profile">
                    <a href="/myactivity/${data.userId}"><img src="/image/user/${data.userImg}"></a>
                    <a href="/myactivity/${data.userId}">${data.nickname}</a>
                </div>
                <div class="score">
                    <span>${data.price} P</span>
                </div>
            </li>
        `;
    });
}