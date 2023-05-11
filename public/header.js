function decodeJwtResponse(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

  function toggleProfile(user) {
    document.querySelector('.dropbtn').textContent = user.name
    document.querySelector(".dropdown").classList.toggle("hidden")
    document.querySelector(".g_id_signin").classList.toggle("hidden")
}

function logOut() {
    localStorage.removeItem("response payload")
    document.querySelector(".dropdown").classList.toggle("hidden")
    document.querySelector(".g_id_signin").classList.toggle("hidden")
    window.location.href = '/'
}

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    
    toggleProfile(responsePayload)
    closeModal()
    localStorage.setItem("response payload", JSON.stringify(responsePayload))
 }

 document.getElementById('logout').addEventListener('click', logOut)

window.addEventListener('load', () => {
    const user = localStorage.getItem("response payload");
    if (user) {
        toggleProfile(JSON.parse(user))
    }
})