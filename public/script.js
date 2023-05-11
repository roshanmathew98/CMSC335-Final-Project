let chatDiv  = document.getElementById('conversation')
let saveButton = document.getElementById('save')
const questionArray = []

function addQuestion(question, response) {
    let ptag = document.createElement('p')
    ptag.textContent = `Me: ${question}`
    ptag.classList.add('user-question')
    let ptag2 = document.createElement('p')
    ptag2.textContent = `AI: ${response}`
    ptag2.classList.add('ai-response')
    chatDiv.append(ptag, ptag2)
}

const saveChat = async () => {
    if (questionArray.length == 0) {
        window.alert("You must ask a question before saving.")
        return
    }
    saveButton.textContent = "Saving..."
    try {
    const response = await fetch('/api/conversations', {
        method: 'POST',
        body: JSON.stringify({
            chat: questionArray,
            username: JSON.parse(localStorage.getItem("response payload")).email
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    window.alert("Conversation saved")
    chatDiv.innerHTML = ""
    questionArray.length = 0
    saveButton.textContent = "Save conversation"

    } catch {
        console.log("error with saving data")
    }
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden')
}

saveButton.addEventListener('click', () => {
    const user = localStorage.getItem("response payload")
    if (!user) {
        document.getElementById('modal').classList.remove('hidden')
    } else {
        saveChat()
    }
})

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
    
    addQuestion(body.value, data.message)
    questionArray.push({question: body.value, aiResponse: data.message})
    body.value = ""
})

document.getElementById('close-modal').addEventListener('click', closeModal)
document.getElementById('clear').addEventListener('click', () => {
    chatDiv.innerHTML = ""
    questionArray.length = 0;
})