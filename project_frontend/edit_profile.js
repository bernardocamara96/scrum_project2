
const background = document.querySelector("#background");
const modal = document.querySelector("#edit_modal");
const user_img = document.querySelector("#user_photo");

// Verifica se o nome de usuário está armazenado no localStorage
if(user!== null) {
    // Obtém o nome de usuário armazenado no localStorage
    const username = sessionStorage.getItem("username");
    // Exibe o nome de usuário no elemento HTML com id "username"
    document.getElementById("username").textContent = username;
} else {
    // Caso o nome de usuário não esteja armazenado, exibe uma mensagem padrão
    document.getElementById("username").textContent = "Username not found";
}


//action Listenner para o botao Cancel
document.querySelector("#btn_cancel").addEventListener("click", function () {
    window.location.href = "scrum.html";
 });

 //action Listenner para o botao Save
 document.querySelector("#btn_save").addEventListener("click", function(){
    window.location.href="scrum.html";
 });

 //action listenner para o botao Change Photo
 document.querySelector("#change_photo").addEventListener("click", function(){
    background.style.visibility = "visible";
    modal.style.visibility = "visible";
 });

 getUser(username).then((result) => {
    console.log(result);
    user = result;
    firstName_txt.textContent = user.firstName;
    user_img.src = user.imgURL;
    backgroundScrum.style.backgroundColor = user.background_color;
    column1.style.backgroundColor = user.toDo_color;
    column2.style.backgroundColor = user.doing_color;
    column3.style.backgroundColor = user.done_color;
 });


