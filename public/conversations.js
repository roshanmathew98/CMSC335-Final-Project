const modalChat = document.querySelector('.chat-item')

function closeModal() {
    document.getElementById('modal').classList.add('hidden')
    modalChat.innerHTML = "";
}

const getChats = async (username) => {
    try {
        const response = await fetch(`/api/conversations/${username}`)
        const data = await response.json()
        renderChats(data)
        } catch {
            console.log("error with retrieving data")
        }
}

const renderChats = (chats) => {
    const tbody = document.querySelector('tbody')
    chats.forEach((chat) => {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        td3.classList.add('readmore')
        const link = document.createElement('button')
        td1.textContent = new Date(chat.createdAt).toLocaleDateString()
        td2.textContent = chat.chat[0]?.question
        link.textContent = "Read more"
        link.addEventListener('click', () => {
            const chatItem = document.querySelector('.chat-item')
            chat.chat.forEach((item) => {
                addQuestion(item.question, item.aiResponse)
            })
            document.getElementById('modal').classList.remove('hidden')
        })
        td3.append(link)
        tr.append(td1, td2, td3)
        tbody.append(tr)
    })
}

function addQuestion(question, response) {
    let ptag = document.createElement('p')
    ptag.textContent = `Me: ${question}`
    ptag.classList.add('user-question')
    let ptag2 = document.createElement('p')
    ptag2.textContent = `AI: ${response}`
    ptag2.classList.add('ai-response')
    modalChat.append(ptag, ptag2)
}

window.onload = () => {
    const user = localStorage.getItem("response payload")
    if (!user) {
        window.location.href = '/'
        return
    }
    getChats(JSON.parse(user).email)
}

document.getElementById('close-modal').addEventListener('click', closeModal)