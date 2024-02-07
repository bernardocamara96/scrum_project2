const modal = document.querySelector("#register_modal");
const background = document.querySelector("#background");
const photo_label = document.querySelector("#register_photoLabel");
const photo = document.querySelector("#register_photo");

document.querySelector("#register_submit").addEventListener("click", function (e) {
   e.preventDefault();
   modal.style.visibility = "visible";
   background.style.visibility = "visible";
});

background.addEventListener("click", function () {
   modal.style.visibility = "hidden";
   background.style.visibility = "hidden";
});

photo_label.addEventListener("change", function () {
   photo.src = photo_label.value;
});
