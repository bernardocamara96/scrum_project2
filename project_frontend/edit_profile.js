const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("pass");
const background = document.querySelector("#background");
const modalPhoto = document.querySelector("#edit_modal");
const user_img = document.querySelector("#user_photo");


let user = null;

getUser(username, password).then((result) => {
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
function isValidURL(url) {
   try {
      new URL(url);
      return true;
   } catch {
      return false;
   }
}

const imageModal = document.getElementById("edit_photo");
edit_photoLabel.addEventListener("change", function () {
   if (isValidURL(edit_photoLabel.value)) {
      imageModal.src = edit_photoLabel.value;
   } else imageModal.src = "user.png";
});

//action listenner para o botao save da foto
document.querySelector("#edit_confirmPhoto").addEventListener("click", function () {
   background.style.visibility = "hidden";
   modalPhoto.style.visibility = "hidden";
   const newPhoto = document.querySelector("#edit_photoLabel").value;
   updatePhoto(username, password, newPhoto);
   console.log(edit_photo.src);
});


// Variáveis de controle para cada campo editável
let passwordEdited = false;
let emailEdited = false;
let firstNameEdited = false;
let lastNameEdited = false;
let phoneEdited = false;

// Adiciona um evento de alteração para cada campo de entrada
document.getElementById('edit_password').addEventListener('change', function() {
   passwordEdited = true;
});

document.getElementById('edit_email').addEventListener('change', function() {
   emailEdited = true;
});

document.getElementById('edit_firstName').addEventListener('change', function() {
   firstNameEdited = true;
});

document.getElementById('edit_lastName').addEventListener('change', function() {
   lastNameEdited = true;
});

document.getElementById('edit_phone').addEventListener('change', function() {
   phoneEdited = true;
});

// Função para salvar as alterações
function saveChanges() {
   if (passwordEdited) {
      // Salvar a nova senha
      const newPassword = document.getElementById('edit_password').value;
      // Chame a função para atualizar a senha no backend
      updatePassword(username, newPassword);
   }

   if (emailEdited) {
      const newEmail = document.getElementById('edit_email').value;
   
      updateEmail(username, newEmail);
   }
   if (firstNameEdited) {
      const newFirstName = document.getElementById('edit_firstName').value;
      updateFirstName(username, newFirstName);
      console.log(newFirstName);
   }
   if(lastNameEdited) {
      const newLastName = document.getElementById('edit_lastName').value;
      updateLastName(username, newLastName);
      console.log(newLastName);
   }if(phoneEdited) {
      const newPhone = document.getElementById('edit_phone').value;
      updatePhoneNumber(username, newPhone);
      console.log(newPhone);
   }

   // Reinicie as variáveis de controle
   passwordEdited = false;
   emailEdited = false;
   firstNameEdited = false;
   lastNameEdited = false;
   phoneEdited = false;
}


//action listenner para o botao save da pagina

const bntSave = document.getElementById("btn-save");
bntSave.addEventListener("click", function(){
 saveChanges();
 window.location.href = "scrum.html";
})

async function getUser(username, pass) {
   let response = await fetch(
      "http://localhost:8080/project_backend/rest/users",

      {
         method: "GET",
         headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            username: username,
            pass: pass,
         },
      }
   );

   let user1 = await response.json();
   return user1;
}

async function updatePhoto(username, pass, newPhoto) {
   let response = await fetch("http://localhost:8080/project_backend/rest/users/updatePhoto", {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
         username: username,
         pass:pass,
         newPhoto: newPhoto,
     },
   });
        
   if (response.status === 200) {
      alert("User photo updated successfully. ");
      user_img.src = newPhoto;
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

