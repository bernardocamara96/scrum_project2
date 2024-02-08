const modal = document.querySelector("#register_modal");
const background = document.querySelector("#background");
const photo_label = document.querySelector("#register_photoLabel");
const photo = document.querySelector("#register_photo");
const username = document.querySelector("#register_username");
const password = document.querySelector("#register_password");
const email = document.querySelector("#register_email");
const firstName = document.querySelector("#register_firstName");
const lastName = document.querySelector("#register_lastName");
const phone = document.querySelector("#register_phone");
const form1 = document.querySelector("#form_register");

document.querySelector("#register_submit").addEventListener("click", function (e) {
   e.preventDefault();
   modal.style.visibility = "visible";
   background.style.visibility = "visible";
});

document.querySelector("#register_confirmPhoto").addEventListener("click", function () {
   addUser();
   // window.location.href = "login.html";
});

background.addEventListener("click", function () {
   modal.style.visibility = "hidden";
   background.style.visibility = "hidden";
});

photo_label.addEventListener("change", function () {
   photo.src = photo_label.value;
});

async function addUser() {
   let user = {
      username: username.value,
      password: password.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phone.value,
      imgURL: photo_label.value,
   };
   await fetch("http://localhost:8080/project_backend/rest/user/add", {
      method: "POST",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
   }).then(function (response) {
      if (response.status == 200) {
         alert("User is added successfully :)");
      } else {
         alert("something went wrong :(");
      }
      console.log(user);
   });
}
