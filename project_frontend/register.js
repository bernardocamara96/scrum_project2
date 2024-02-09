const modal = document.querySelector("#register_modal");
const background = document.querySelector("#background");
const photo_label = document.querySelector("#register_photoLabel");
const photo = document.querySelector("#register_photo");
const username_txt = document.querySelector("#register_username");
const password = document.querySelector("#register_password");
const email = document.querySelector("#register_email");
const firstName = document.querySelector("#register_firstName");
const lastName = document.querySelector("#register_lastName");
const phone = document.querySelector("#register_phone");
const form1 = document.querySelector("#form_register");

document.querySelector("#register_submit").addEventListener("click", function (e) {
   e.preventDefault();

   validateUser(username_txt.value, password.value, email.value, firstName.value, lastName.value, phone.value);
});

document.querySelector("#register_confirmPhoto").addEventListener("click", function () {
   let user = {
      username: username_txt.value,
      password: password.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phone.value,
      imgURL: photo.src,
      toDo_color: "#f1f2f4",
      doing_color: "#f1f2f4",
      done_color: "#f1f2f4",
      background_color: "#172b4c",
   };
   addUser(user);
   window.location.href = "login.html";
});

background.addEventListener("click", function () {
   modal.style.visibility = "hidden";
   background.style.visibility = "hidden";
});

photo_label.addEventListener("change", function () {
   photo.src = photo_label.value;
});

async function validateUser(username_txt, password_txt, email_txt, firstName_txt, lastName_txt, phoneNumber_txt) {
   await fetch(
      "http://localhost:8080/project_backend/rest/users/register",

      {
         method: "POST",
         headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            username: username_txt,
            password: password_txt,
            email: email_txt,
            firstName: firstName_txt,
            lastName: lastName_txt,
            phoneNumber: phoneNumber_txt,
         },
      }
   ).then(function (response) {
      if (response.status == 200) {
         modal.style.visibility = "visible";
         background.style.visibility = "visible";
      } else if (response.status == 406) {
         alert("Username already exists");
      } else if (response.status == 404) {
         alert("Email already exists");
      } else if (response.status == 400) {
         alert("There are empty fields");
      } else alert("Something went wrong");
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
