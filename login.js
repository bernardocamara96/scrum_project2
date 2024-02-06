document.querySelector("#login_form").addEventListener("submit", function (e) {
   e.preventDefault();
   const username = document.querySelector("#username");
   var username_txt = username.value;
   /*Se o username inserido tiver 13 ou menos caracteres é gravado em localStorage, e são inicializadas as arrays das tasks e das retros
   que também são guardadas em localStorage, e o user é direcionado para a página scrum.html*/
   if (username_txt.length <= 13) {
      localStorage.setItem("username", username_txt);
      username.textContent = "";

      //Fazer reset às arrays de tasks e de retrospetivas
      const tasks = [];
      const retros = [];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("retros", JSON.stringify(retros));

      window.location.href = "scrum.html";
   } else {
      alert("The Username inserted is too long, please enter a shorter username.");
   }
});
