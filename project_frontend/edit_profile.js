const username = sessionStorage.getItem("username");
const background = document.querySelector("#background");
const modal = document.querySelector("#edit_modal");
const user_img = document.querySelector("#user_photo"); 
const edit_photo = document.querySelector('#edit_photo');

let user = null;

getUser(username).then((result) => {
   console.log(result);
   user = result;
   user_img.src = user.imgURL;
   viewpassword.value = user.password;
   viewEmail.value = user.email;
   viewFirstName.value = user.firstName;
   viewLastName.value = user.lastName;
   viewPhone.value = user.phoneNumber;

   
});


// Verifica se o nome de usuário está armazenado no localStorage
if(username!== null) {
   
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

 //action listenner para o botao save da foto
 document.querySelector("#edit_confirmPhoto").addEventListener("click", function(){
  background.style.visibility="hidden";
   modal.style.visibility="hidden";
   const newPhoto = document.querySelector("#edit_photoLabel").value;
   user_img.src = newPhoto;
   edit_photo.src = newPhoto;
   updatePhoto(username,newPhoto);
   user.imgURL = newPhoto;
   
   console.log(edit_photo.src);
   
 });

 async function getUser(username) {
    let response = await fetch(
       "http://localhost:8080/project_backend/rest/users",
 
       {
          method: "GET",
          headers: {
             Accept: "*/*",
             "Content-Type": "application/json",
             username: username,
          },
       }
    );
 
    let user1 = await response.json();
    console.log(user1);
    return user1;
 }
 
 
 const viewpassword = document.getElementById("edit_password");
 const viewEmail = document.getElementById("edit_email");
 const viewFirstName = document.getElementById("edit_firstName");
 const viewLastName = document.getElementById("edit_lastName");
 const viewPhone = document.getElementById("edit_phone");
 //Colocar os campos nao editáveis
 viewpassword.readOnly = true;
 viewEmail.readOnly = true;
 viewFirstName.readOnly = true;
 viewLastName.readOnly = true;
 viewPhone.readOnly = true;

async function updatePhoto(username, newPhoto){
   
   let response = await fetch(
      "http://localhost:8080/project_backend/rest/users/updatePhoto/" + username + "/",
      {
         method:"PUT",
         headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ newPhoto: newPhoto })
      }
   );
   if(response.status===200){
      alert("User photo updated successfully. ");
      console.log(user.imgURL);
   }else if(response.status === 404){
      alert("User not found");
   }
}


