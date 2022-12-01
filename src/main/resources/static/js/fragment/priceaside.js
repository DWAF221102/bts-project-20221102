
loadPriceAsideRequest();

function loadPriceAsideRequest() {
    let responseData= null;

    $.ajax({
        async: false,
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
                    <img src="/image/user/${data.userImg}">
                    <a href="#">${data.nickname}</a>
                </div>
                <div class="score">
                    <span>${data.price} P</span>
                </div>
            </li>
        `;
    });
}