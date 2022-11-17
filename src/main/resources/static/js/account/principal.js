let principalUser = getPrincipal();

// principal
async function getAuthenticationReq() {

    const url = "/api/v1/authentication";
    const response = await fetch(url);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Failed to get Authentication." + response);
    }
}
function getPrincipal() {
    let principalUser = null;
    $.ajax({
        type: "get",
        url: "/api/v1/auth/principal",
        async: false,
        dataType: "json",
        success: (response) => {
            if (response.data != null) {
                principalUser = response.data.user;
                console.log(principalUser)
            }
        },
        error: () => {
            console.log("비동기 처리 오류");
        }
    });
    return principalUser;
}