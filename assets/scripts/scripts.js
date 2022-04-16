let messageChat = []; 



 //Recebendo as mensagens do chat
function getMessages () {
    const promise = axios.get(
        "https://mock-api.driven.com.br/api/v6/uol/messages"
    ); 

    //callback
    promise.then(loadMessages); 

}

//Função de carregar dados de mensagens que já estão na API
function loadMessages () {
    messageChat = response.data; 
    //aqui colocar função para renderizar mensagens

}



//Aqui criar função para renderizar mensagens









//Processar error 
function errorProcess (error) {
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



//função modelo para liberar página de mensagens
function enterChat () {
    const name = document.querySelector(".name-user").value; 
    console.log(name); 

    //objeto para entrada de novo usuário no chat
    const newUser = {
        name: name, 
    }; 

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        newUser
    ); 

    //Executar quando a requisição for resolvida com sucesso
    promise.then(getMessages); 

    //Executar quando a requisição for resolvida com falha
    promise.catch(errorProcess); 
}

enterChat (); 






//função para rolagem automática 
function autoScroll () {
    const elementBoxMessage = document.querySelector(".box-message"); 
    elementBoxMessage.scrollIntoView(); 
}

autoScroll(); 

