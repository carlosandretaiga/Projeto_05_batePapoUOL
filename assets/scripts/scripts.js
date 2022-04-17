let messageChat = [];
let nameUser;



//Processar error entrar na sala 
function errorProcess(error) {
    //console.log(error.response); 

    if (error.response.status === 400) {
        window.location.reload();
        
        const errorMessage = document.querySelector(".error-message");
        errorMessage.classList.remove("hide")

        document.querySelector(".error-message").innerHTML = `Este usuário já existe, por favor escolha outro nome!`;
         
    }

    // //Aqui mudo de tela se for sucesso a requisição
    // const containerInitial = document.querySelector(".container-initial");
    // containerInitial.classList.add("hide");

    // const container = document.querySelector(".container");
    // container.classList.remove("hide");
}

function tratarSucessoChat () {
    //Aqui mudo de tela se for sucesso a requisição
    const containerInitial = document.querySelector(".container-initial");
    containerInitial.classList.add("hide");

    const container = document.querySelector(".container");
    container.classList.remove("hide");
    keepConnection(); 
}

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
    promise.then(tratarSucessoChat);
    //keepConnection


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

autoScroll();
//função para rolagem automática 
function autoScroll() {
    const elementBoxMessage = document.querySelector(".box-message");
    elementBoxMessage.scrollIntoView();
}



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
    const toMessages = " para "; 
    const listMessages = document.querySelector(".box-message");
    listMessages.innerHTML = "";

    for (let i = 0; i < messageChat.length; i++) {


        if(messageChat[i].type === "status") {
            listMessages.innerHTML += `
        <div class="status-messages">

                <div class="messages-hour">
                    (${messageChat[i].time})
                </div>

                <div class="messages-name">
                ${messageChat[i].from}
                </div>

                <div class="messages-message">
                ${messageChat[i].text}
                </div>

        </div>
        
        `;
        } else if(messageChat[i].type === "message") {
            listMessages.innerHTML += `
        <div class="normal-messages">

                <div class="messages-hour">
                    (${messageChat[i].time})
                </div>

                <div class="messages-name">
                ${messageChat[i].from}
                </div>

                <div class="messages-to-to> 
                 ${toMessages}
                </div> 

                <div class="messages-to">
                ${messageChat[i].to}
                </div>

                <div class="messages-message">
                ${messageChat[i].text}
                </div>

        </div>
        
        `;
        } else if(messageChat[i].type === "private_message") {
            listMessages.innerHTML += `
        <div class="reserved-messages">

                <div class="messages-hour">
                    (${messageChat[i].time})
                </div>

                <div class="messages-name">
                ${messageChat[i].from}:
                </div>

                <div class="messages-to-to> 
                reservadamente para 
                </div> 

                <div class="messages-to">
                ${messageChat[i].to}:
                </div>

                <div class="messages-message">
                ${messageChat[i].text}
                </div>

        </div>
        
        `;
        }
    }
}



//setInterval(renderMessages, 3000); 

function tratarSucessoSend (sucess) {
    if (sucess.response.status === 200) {
        const retirarMensagem = document.querySelector(".send-message").value;
        retirarMensagem.value = " ";
    }
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
    promise.then(tratarSucessoSend);
    //getMessages

    //Executar quando a requisição for resolvida com falha
    promise.catch(errorProcess);
   


}

function pressEnter() { 
    let inputfield = document.getElementById("inputField");
     console.log(document.getElementById("inputField"));
     inputfield.addEventListener("keyup", function (event) { 
         if (event.key === "Enter") {
         document.getElementById("btnEnvia").click();
         }}) 
 
     }
    

