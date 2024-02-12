const username = sessionStorage.getItem("username");
const background = document.querySelector("#background");
const modalPhoto = document.querySelector("#edit_modal");
const user_img = document.querySelector("#user_photo");

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

const viewpassword = document.getElementById("edit_password");
const viewEmail = document.getElementById("edit_email");
const viewFirstName = document.getElementById("edit_firstName");
const viewLastName = document.getElementById("edit_lastName");
const viewPhone = document.getElementById("edit_phone");

// Verifica se o nome de usuário está armazenado no localStorage
if (username !== null) {
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

//action listenner para o botao Change Photo
document.querySelector("#change_photo").addEventListener("click", function () {
   background.style.visibility = "visible";
   modalPhoto.style.visibility = "visible";
});

//action listenner para o botao save da foto
document.querySelector("#edit_confirmPhoto").addEventListener("click", function () {
   background.style.visibility = "hidden";
   modalPhoto.style.visibility = "hidden";
   const newPhoto = document.querySelector("#edit_photoLabel").value;
   user_img.src = newPhoto;
   edit_photo.src = newPhoto;
   updatePhoto(username, newPhoto).then(() => {
      user.imgURL = newPhoto;
   });

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

async function updatePhoto(username, newPhoto) {
   let response = await fetch("http://localhost:8080/project_backend/rest/users/updatePhoto", {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
         username: username,
         newPhoto: newPhoto,
      },
   });
   if (response.status === 200) {
      alert("User photo updated successfully. ");
   } else if (response.status === 404) {
      alert("User not found");
   } else {
      alert("Something went wrong while updating user photo");
   }
}

async function updatePassword(username, newPassword) {
   await fetch("http://localhost:8080/project_backend/rest/users/updatePassword/" + username, {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: newPassword }),
   }).then(function (response) {
      if (response.status === 200) {
         alert("Password updated  successfully :)");
         viewpassword.value = newPassword;
      } else if (response.status === 404) {
         alert("user not found");
      } else {
         alert("Something went wrong");
      }
   });
}

async function updateEmail(username, newEmail) {
   await fetch("http://localhost:8080/project_backend/rest/users/updateEmail/" + username, {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail: newEmail }),
   }).then(function (response) {
      if (response.status === 200) {
         alert("Email updated  successfully :)");
         viewEmail.value = newEmail;
      } else if (response.status === 404) {
         alert("user not found");
      } else {
         alert("Something went wrong");
      }
   });
}
async function updateFirstName(username, newFirstName) {
   await fetch("http://localhost:8080/project_backend/rest/users/updateFirstName/" + username, {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ newFirstName: newFirstName }),
   }).then(function (response) {
      if (response.status === 200) {
         alert("First Name updated  successfully :)");
         viewFirstName.value = newFirstName;
      } else if (response.status === 404) {
         alert("user not found");
      } else {
         alert("Something went wrong");
      }
   });
}
async function updateLastName(username, newLastName) {
   await fetch("http://localhost:8080/project_backend/rest/users/updateLastName/" + username, {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ newLastName: newLastName }),
   }).then(function (response) {
      if (response.status === 200) {
         alert("Last Name updated  successfully :)");
         viewLastName.value = newLastName;
      } else if (response.status === 404) {
         alert("user not found");
      } else {
         alert("Something went wrong");
      }
   });
}
async function updatePhoneNumber(username, newPhoneNumber) {
   await fetch("http://localhost:8080/project_backend/rest/users/updatePhoneNumber/" + username, {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPhoneNumber: newPhoneNumber }),
   }).then(function (response) {
      if (response.status === 200) {
         alert("Phone number updated  successfully :)");
         viewPhone.value = newPhoneNumber;
      } else if (response.status === 404) {
         alert("user not found");
      } else {
         alert("Something went wrong");
      }
   });
}

//Logica para o modalEdit
// Selecionar os botões de edição
const btnPassword = document.getElementById("btn_password");
const btnEmail = document.getElementById("btn_email");
const btnFirstName = document.getElementById("btn_firstName");
const btnLastName = document.getElementById("btn_lastName");
const btnPhone = document.getElementById("btn_phone");

// Adicionando event listener para o botão de password
btnPassword.addEventListener("click", function () {
   openModal("Password");
});

// Adicionando event listener para o botão de email
btnEmail.addEventListener("click", function () {
   openModal("Email");
});

// Adicionando event listener para o botão de first name
btnFirstName.addEventListener("click", function () {
   openModal("First Name");
});

// Adicionando event listener para o botão de last name
btnLastName.addEventListener("click", function () {
   openModal("Last Name");
});

// Adicionando event listener para o botão de phone
btnPhone.addEventListener("click", function () {
   openModal("Phone");
});

// Função para abrir o modal com base no tipo de campo a ser editado

function openModal(field) {
   const modal = document.getElementById("editModal");
   const inputField = document.getElementById("new_value");
   // Define o texto do label no modal com base no campo que está sendo editado
   const label = modal.querySelector("label");
   label.textContent = "New " + field + ":";

   // Abre o modal
   modal.style.visibility = "visible";
   // Remove event listeners antigos antes de atribuir novos
   const confirmBtn = document.getElementById("confirmEdit");
   const newConfirmBtn = confirmBtn.cloneNode(true);
   confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

   newConfirmBtn.addEventListener("click", function () {
      if (field === "Password") {
         const newValue = inputField.value;
         updatePassword(username, newValue).then(() => {
            user.password = newValue;
         });
      } else if (field === "Email") {
         const newValue = inputField.value;
         updateEmail(username, newValue).then(() => {
            user.email = newValue;
         });
      } else if (field === "First Name") {
         const newValue = inputField.value;
         updateFirstName(username, newValue).then(() => {
            user.firstName = newValue;
         });
      } else if (field === "Last Name") {
         const newValue = inputField.value;
         updateLastName(username, newValue).then(() => {
            user.lastName = newValue;
         });
      } else if (field === "Phone") {
         const newValue = inputField.value;
         updatePhoneNumber(username, newValue).then(() => {
            user.phoneNumber = newValue;
         });
      }

      console.log(user);

      modal.style.visibility = "hidden";
      inputField.value = "";
   });

   // Adiciona um event listener para o botão de cancelamento dentro do modal
   const cancelBtn = document.getElementById("cancelEdit");
   cancelBtn.addEventListener("click", function () {
      modal.style.visibility = "hidden";
      inputField.value = "";
   });
}
