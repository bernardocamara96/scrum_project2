

const user = localStorage.getItem("username");

// Verifica se o nome de usuário está armazenado no localStorage
if(user!== null) {
    // Obtém o nome de usuário armazenado no localStorage
    var username = localStorage.getItem("username");
    // Exibe o nome de usuário no elemento HTML com id "username"
    document.getElementById("username").textContent = username;
} else {
    // Caso o nome de usuário não esteja armazenado, exibe uma mensagem padrão
    document.getElementById("username").textContent = "Username not found";
}
