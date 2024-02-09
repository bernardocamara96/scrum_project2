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
let user = null;

document.querySelector("#register_submit").addEventListener("click", function (e) {
   e.preventDefault();
   user = {
      username: username.value,
      password: password.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phone.value,
      toDo_color: "#f1f2f4",
      doing_color: "#f1f2f4",
      done_color: "#f1f2f4",
      background_color: "#172b4c",
      imgURL: null,
   };
   validateUser(user);
});

document.querySelector("#register_confirmPhoto").addEventListener("click", function () {
   addUser(user);
   //window.location.href = "login.html";
});

background.addEventListener("click", function () {
   modal.style.visibility = "hidden";
   background.style.visibility = "hidden";
});

photo_label.addEventListener("change", function () {
   photo.src = photo_label.value;
});

async function validateUser(user) {
   await fetch(
      "http://localhost:8080/project_backend/rest/users/register/" +
         user.username +
         "/" +
         user.email +
         "/" +
         user.phoneNumber,
      {
         method: "GET",
         headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
         },
      }
   ).then(function (response) {
      if (response.status == 200) {
         modal.style.visibility = "visible";
         background.style.visibility = "visible";
      } else if (response.status == 404) {
         alert("Username already exists");
      }
   });
}

async function addUser(user) {
   user.imgURL = photo_label.value;
   console.log(user);
   await fetch("http://localhost:8080/project_backend/rest/users/add", {
      method: "POST",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
   }).then(function (response) {
      if (response.status == 200) {
         alert("User is added successfully :)");
         window.location.href = "login.html";
      } else {
         alert("something went wrong :(");
      }
   });
}
