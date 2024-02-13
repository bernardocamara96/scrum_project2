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

form1.addEventListener("submit", function (e) {
   e.preventDefault();
   if (
      username_txt.value != "" &&
      password.value != "" &&
      email.value != "" &&
      firstName.value != "" &&
      lastName.value != "" &&
      phone.value != ""
   ) {
      if (firstName.value.length < 13) {
         if (isValidPhoneNumber(phone.value)) {
            if (isValidEmail(email.value)) {
               validateUser(
                  username_txt.value,
                  password.value,
                  email.value,
                  firstName.value,
                  lastName.value,
                  phone.value
               );
            } else alert("Invalid email");
         } else alert("Invalid phone number");
      } else alert("First Name is too long");
   } else alert("All fields are required");
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
      tasks: [],
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
   if (isValidURL(photo_label.value)) {
      photo.src = photo_label.value;
   } else photo.src = "user.png";
});

function isValidPhoneNumber(phoneNumber) {
   valideNumber = true;

   if (phoneNumber.length != 9 && phoneNumber.length != 10) valideNumber = false;
   // Check if the phone number has the expected format
   if (!phoneNumber.match(/^\d+$/)) {
      valideNumber = false;
   }
   return valideNumber;
}

function isValidEmail(email) {
   try {
      new URL("mailto:" + email);
      return true;
   } catch {
      return false;
   }
}

function isValidURL(url) {
   const imageExtensions = /\.(jpeg|jpg|gif|png|bmp)$/i;
   if (imageExtensions.test(url) == true) {
      try {
         new URL(url);
         return true;
      } catch {
         return false;
      }
   } else return false;
}

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
      } else if (response.status == 409) alert("Username or Email already exists");
      else alert("Something went wrong");
   });
}

async function addUser(user) {
   await fetch("http://localhost:8080/project_backend/rest/users/add", {
      method: "POST",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
   }).then(function (response) {
      if (response.status == 200) {
         alert("Welcome to AgileUp :)");
      } else {
         alert("something went wrong :(");
      }
   });
}
