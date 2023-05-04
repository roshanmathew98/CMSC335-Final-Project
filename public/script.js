let chatDiv  = document.getElementById('conversation')

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault()
    let body = document.querySelector('input')
    const response = await fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            message: body.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    console.log(data);
    addQuestion(body.value, data.message)
    body.value = ""
})

function addQuestion(question, response) {
    let ptag = document.createElement('p')
    ptag.textContent = `Me: ${question}`
    ptag.classList.add('user-question')
    let ptag2 = document.createElement('p')
    ptag2.textContent = `AI: ${response}`
    ptag2.classList.add('ai-response')
    chatDiv.append(ptag, ptag2)
}