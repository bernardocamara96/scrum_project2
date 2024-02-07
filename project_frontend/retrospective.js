document.querySelector("#body_color").style.backgroundColor = localStorage.getItem("background_color");

writeDate();

// Executa a função em intervalos de 1 segundo para atualizar a data
setInterval(writeDate, 1000);

const username = localStorage.getItem("username");
document.querySelector("#user").textContent = username;

document.querySelector("#logout").addEventListener("click", function () {
   window.location.href = "login.html";
});

document.querySelector("#btn_sprint").addEventListener("click", function () {
   window.location.href = "retro_form.html";
});

const retrospectiveList = JSON.parse(localStorage.getItem("retros"));

const table = document.querySelector("#table_body");

/*Ciclo for que imprime todas as informações referentes a todas as retrospetivas na tabela e adiciona o evento de 
de duplo click que mostra a modal que contém todas as informações referentes a essa retrospetiva em específico*/
for (let retro of retrospectiveList) {
   let row = document.createElement("tr");
   row.addEventListener("dblclick", function () {
      document.querySelector("#modal").style.visibility = "visible";
      document.querySelector("#background").style.visibility = "visible";
   });
   table.appendChild(row);

   let date = document.createElement("td");
   let title = document.createElement("td");
   date.innerText = retro.date;
   title.innerText = retro.title;
   row.appendChild(date);
   row.appendChild(title);

   row.addEventListener("dblclick", function () {
      document.querySelector("#modal1").style.visibility = "visible";
      document.querySelector("#background").style.visibility = "visible";
      title_modal.innerText = retro.title;
      date_modal.innerText = retro.date;

      for (let member of retro.members) {
         let div_member = document.createElement("div");
         div_member.innerText = member;
         document.querySelector("#list_members").appendChild(div_member);
      }

      for (let comment of retro.comments) {
         let tr_comment = document.createElement("tr");
         let td_comment = document.createElement("td");
         td_comment.innerText = comment[0];

         let td_type = document.createElement("td");
         td_type.innerText = comment[1];
         td_type.style.textAlign = "center";

         let td_author = document.createElement("td");
         td_author.innerText = comment[2];
         td_author.style.textAlign = "center";

         tr_comment.appendChild(td_comment);
         tr_comment.appendChild(td_type);
         tr_comment.appendChild(td_author);

         tr_comment.style.height = "20px";

         document.querySelector("#body_comments").appendChild(tr_comment);
      }
   });
}

/*Adiciona o evento ao botão de fecho da modal, que faz fechar a modal que contém as informações da retrospetiva.
Ao fechar a modal são removidas todas as linhas da tabela e todos os membros da div #list_members*/
document.querySelector("#cancel_retrospectives").addEventListener("click", function () {
   document.querySelector("#modal1").style.visibility = "hidden";
   document.querySelector("#background").style.visibility = "hidden";
   document.querySelector("#body_comments").innerHTML = "";
   document.querySelector("#list_members").innerHTML = "";
});

/*Adiciona o evento ao backround a preto que aparece à volta da modal, que faz fechar a modal que contém as informações da retrospetiva.
Ao fechar a modal são removidas todas as linhas da tabela e todos os membros da div #list_members*/
document.querySelector("#background").addEventListener("click", function () {
   document.querySelector("#modal1").style.visibility = "hidden";
   document.querySelector("#background").style.visibility = "hidden";
   document.querySelector("#body_comments").innerHTML = "";
   document.querySelector("#list_members").innerHTML = "";
});

//Evento para direcionar o user para a página principal da aplicação
document.querySelector("#btn_scrum").addEventListener("click", function () {
   window.location.href = "scrum.html";
});

//Função para escrever a data
function writeDate() {
   const d = new Date();

   // Define o formato a mostrar
   let dateTimeString = d.toLocaleString("en-GB");
   dateTimeString = dateTimeString.replace(",", "&nbsp; &nbsp; &nbsp;");

   // Insere no HTML
   document.getElementById("date").innerHTML = dateTimeString;
}
