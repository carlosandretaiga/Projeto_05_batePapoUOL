let messageChat = [];
let nameUser;



//função modelo para liberar página de mensagens
function enterChat() {
    nameUser = document.querySelector(".name-user").value; //ver essa parte

    //objeto para entrada de novo usuário no chat
    const newUser = {
        name: nameUser,
    };

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        newUser
    );

    //Executar quando a requisição for resolvida com sucesso
    promise.then(keepConnection);


    //Executar quando a requisição for resolvida com falha
    promise.catch(errorProcess);
}

//enterChat(); 


//Manter conexão 
function keepConnection() {

    //objeto para entrada de novo usuário no chat
    const newUser = {
        name: nameUser,
    };

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/status",
        newUser
    );

    //Executar quando a requisição for resolvida com sucesso
    promise.then();
    //enterChat

}

setInterval(keepConnection, 3000);

// function tratarFalhaEnviar(error) {
//     if (error.response.status === 400) {
//         window.location.reload(); 
//         enterChat(); 

//     }

// }


getMessages();

//Recebendo as mensagens do chat
function getMessages() {
    const promise = axios.get(
        "https://mock-api.driven.com.br/api/v6/uol/messages"
    );

    //callback
    promise.then(loadMessages);

}

//Função de carregar dados de mensagens que já estão na API
function loadMessages(response) {
    messageChat = response.data;
    //aqui colocar função para renderizar mensagens
    renderMessages();


}

setInterval(getMessages, 3000);

//Aqui criar função para renderizar mensagens
function renderMessages() {
    const listMessages = document.querySelector(".box-message");
    listMessages.innerHTML = "";

    for (let i = 0; i < messageChat.length; i++) {
        listMessages.innerHTML += `
        <div class="status-messages">

                <div class="status-messages-hour">
                    (${messageChat[i].time})
                </div>

                <div class="status-messages-name">
                ${messageChat[i].from}
                </div>

                <div class="status-messages-to">
                ${messageChat[i].to}
                </div>

                <div class="status-messages-message">
                ${messageChat[i].text}
                </div>

        </div>
        
        `;
    }
}

//se type === "status" => deverá escolher um layout .status-messages
//se type === "message" => deverá escolher um layout .normal-messages
//se type === "private_message" => deverá escolher layout .reserved-messages


//setInterval(renderMessages, 3000); 



//Processar error entrar na sala 
function errorProcess(error) {
    //console.log(error.response); 

    if (error.response.status === 400) {
        const errorMessage = document.querySelector(".error-message");
        errorMessage.classList.remove("hide")

        document.querySelector(".error-message").innerHTML = `Este usuário já existe, por favor escolha outro nome!`
    }

    //Aqui mudo de tela se for sucesso a requisição
    const containerInitial = document.querySelector(".container-initial");
    containerInitial.classList.add("hide");

    const container = document.querySelector(".container");
    container.classList.remove("hide");
}



//Enviando mensagem para todos 
function sendMessage() {
    const message = document.querySelector(".send-message").value;

    const newMessage = {
        from: nameUser,
        to: "Todos",
        text: message,
        type: "message",
    };

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/messages",
        newMessage
    );

    //Executar quando a requisição for resolvida com sucesso
    promise.then();
    //getMessages

    //Executar quando a requisição for resolvida com falha
    //promise.catch(tratarFalhaEnviar);


}













//função para rolagem automática 
function autoScroll() {
    const elementBoxMessage = document.querySelector(".box-message");
    elementBoxMessage.scrollIntoView();
}

autoScroll();

