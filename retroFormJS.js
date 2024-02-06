document.querySelector("#body_color").style.backgroundColor = localStorage.getItem("background_color");
document.querySelector("#user").textContent = localStorage.getItem("username");

writeDate();

// Executa a função em intervalos de 1 segundo para atualizar a data
setInterval(writeDate, 1000);

//Botão que guarda novo comentário
let bGuardarComent = document.getElementById("guardarNovoComent");

//Botão que guarda o edit do comentário
let bEditComment = document.getElementById("saveEdit");

//Obter o Modal
let modal = document.getElementById("myModal");

//Botão que abre o Modal
let bOpenModal = document.getElementById("addComment");

//Obter o <span> que fecha o Modal
let spanCloseModal = document.getElementsByClassName("close")[1];

//Ao clicar no botão, abrir Modal
bOpenModal.onclick = function () {
   //Botão de guardar fica visível
   bGuardarComent.style.display = "block";

   document.getElementById("background").style.visibility = "visible";

   document.getElementById("areaComentario").value = ""; //Limpa textarea
   document.getElementById("categoriaComentario").value = "none"; //Limpa select
   document.getElementById("selectMember").value = "none"; //Limpa select

   modal.style.display = "block";
};

//Ao clicar no (x), fechar Modal
spanCloseModal.onclick = function () {
   if (confirmExit()) {
      modal.style.display = "none";
      document.getElementById("background").style.visibility = "hidden";
      //Reset display dos botões para ficarem invisiveis
      bGuardarComent.style.display = "none";
      bEditComment.style.display = "none";
   }
};

let listComments = new Array();

//Ao clicar no botão, grava informação correta no array, escreve informação na tabela
bGuardarComent.onclick = function () {
   if (categoriaComentario.value != "none" && selectMember.value != "none" && areaComentario.value != "") {
      //Esconde Modal
      modal.style.display = "none";
      document.getElementById("background").style.visibility = "hidden";

      const comentario_cell = document.createElement("td");
      const categ_cell = document.createElement("td");
      const member_cell = document.createElement("td");
      const btn_edit_cell = document.createElement("td");
      const btn_delete_cell = document.createElement("td");
      const btn_edit = document.createElement("button");
      const btn_delete_comment = document.createElement("button");
      const novaLinhaTab = document.createElement("tr");

      //Add novo comentário ao array
      const newComment = [areaComentario.value, categoriaComentario.value, selectMember.value];

      listComments.push(newComment);

      //Adicionar na tabela
      comentario_cell.innerText = areaComentario.value;
      categ_cell.innerText = categoriaComentario.value;
      member_cell.innerText = selectMember.value;
      btn_edit.innerHTML = "&#9998";
      btn_edit.classList.add("edit_comment");
      btn_edit.type = "button";
      btn_delete_comment.innerHTML = "&times;";
      btn_delete_comment.setAttribute("id", "deleteComment");
      btn_delete_comment.type = "button";
      btn_edit.classList.add("edit_comment");
      btn_edit.type = "button";

      //Evento para abrir edição
      btn_edit.addEventListener("click", function () {
         //Botão de edição e Modal ficam visíveis
         bEditComment.style.display = "block";
         modal.style.display = "block";

         document.getElementById("background").style.visibility = "visible";

         document.getElementById("areaComentario").value = comentario_cell.innerText;
         document.getElementById("categoriaComentario").value = categ_cell.innerText;
         document.getElementById("selectMember").value = member_cell.innerText;

         //Evento para guardar edição
         document.getElementById("saveEdit").onclick = function () {
            if (confirmEdit()) {
               //Armazenar comentário atualizado
               const updatedComment = [
                  document.getElementById("areaComentario").value,
                  document.getElementById("categoriaComentario").value,
                  document.getElementById("selectMember").value,
               ];

               let index = listComments.indexOf(newComment);
               if (index !== -1) {
                  listComments[index] = updatedComment;
               }

               // Atualiza o conteúdo da própria linha
               comentario_cell.innerText = updatedComment[0];
               categ_cell.innerText = updatedComment[1];
               member_cell.innerText = updatedComment[2];

               // Esconde o Modal
               modal.style.display = "none";

               document.getElementById("background").style.visibility = "hidden";

               //Reset display dos botões para ficarem invisiveis
               bGuardarComent.style.display = "none";
               bEditComment.style.display = "none";
            }
         };
      });

      //Evento para apagar comentário
      btn_delete_comment.addEventListener("click", function () {
         //Apenas elimina se ação for confirmada
         if (confirmDelete()) {
            //Elimina no HTML
            this.parentNode.parentNode.remove();

            //Elimina da array
            removeItem(listComments, newComment);
         }
      });

      //AppendChilds
      btn_edit_cell.appendChild(btn_edit);
      btn_delete_cell.appendChild(btn_delete_comment);

      novaLinhaTab.appendChild(comentario_cell);
      novaLinhaTab.appendChild(categ_cell);
      novaLinhaTab.appendChild(member_cell);
      novaLinhaTab.appendChild(btn_edit_cell);
      novaLinhaTab.appendChild(btn_delete_cell);

      document.getElementById("tabelaComentarios").appendChild(novaLinhaTab);

      //Reset display dos botões para ficarem invisiveis
      bGuardarComent.style.display = "none";
      bEditComment.style.display = "none";
   } else alert("All the fields are required");
};

//Adicionar Membros
const btn_addMember = document.getElementById("addMember");
const memberInput = document.getElementById("membrosP");
const members = [];

const form = document.getElementById("formId");

//Ação de adicionar membros ao array
btn_addMember.addEventListener("click", function () {
   if (memberInput.value != "") {
      //Adiciona o membro à array
      members.push(letraCaps(memberInput.value));

      //Mostrar Membros
      let listMembers = document.getElementById("listMembers");
      let selectMembers = document.getElementById("selectMember");

      //Adiciona sempre o último adicionado
      //Lista
      let li = document.createElement("li");
      let close = document.createElement("span");
      li.setAttribute("id", letraCaps(memberInput.value));
      li.innerText = members[members.length - 1];
      //Icon close
      close.classList.add("closeIcon");
      close.innerText = " " + "\u00D7";

      //Input Select no Modal
      let opt = document.createElement("option");
      opt.innerText = members[members.length - 1];
      opt.value = opt.innerText;
      selectMembers.appendChild(opt);

      //Evento para poder eliminar
      close.addEventListener("click", function () {
         if (confirmDelete()) {
            const line = li.textContent.slice(0, li.textContent.length - 2);
            removeItem(members, line);
            li.remove();
            opt.remove();
         }
      });

      li.appendChild(close);
      listMembers.appendChild(li);

      //Reset do input
      memberInput.value = "";
   } else {
      alert("Write a name");
   }
});

document.querySelector("#logout").addEventListener("click", function () {
   localStorage.setItem("username", "");
   window.location.href = "login.html";
});
//Objeto Sprint

const title_sprint = document.getElementById("titleSprint");
const btn_saveSprint = document.getElementById("submitSprint");
const list_retro = JSON.parse(localStorage.getItem("retros"));

//Grava toda a informação do formulário
btn_saveSprint.addEventListener("click", function () {
   if (title_sprint.value !== "") {
      if (listComments.length > 0) {
         let atual_date = new Date();
         atual_date = JSON.stringify(atual_date);
         const retro = {
            date: atual_date.slice(1, 11),
            members: members,
            comments: listComments,
            title: title_sprint.value,
         };

         list_retro.push(retro);

         localStorage.setItem("retros", JSON.stringify(list_retro));

         window.location.href = "retrospective.html";

         //Reset área
         title_sprint.innerText = "";
      } else alert("Retrospective need to have comments.");
   } else alert("The Retrospective need to have a title.");
});

//Default do tag form
form.addEventListener("submit", function (e) {
   e.preventDefault;
});

//Colocar primeira letra em Maiúscula
function letraCaps(word) {
   const firstLetterCap = word.charAt(0).toUpperCase();

   const remainingLetters = word.substring(1);

   const capWord = firstLetterCap + remainingLetters;

   return capWord;
}

//Remove o item mencionado da lista
function removeItem(list, item) {
   let index = list.indexOf(item);
   if (index > -1) {
      list.splice(index, 1);
   }
}

//Obter o <span> que fecha a janela
let spanCloseWindow = document.getElementsByClassName("close")[0];

//Ao clicar no (x), fecha a janela e abre a do histórico das retrospectivas
spanCloseWindow.onclick = function () {
   if (confirmExit()) {
      window.location.href = "retrospective.html";
   }
};

//Função para confirmar delete
function confirmDelete() {
   return confirm("Are you sure you want to delete this?");
}

//Função para confirmar edit
function confirmEdit() {
   return confirm("Are you sure you want to edit this?");
}

//Função para confirmar sair da janela
function confirmExit() {
   return confirm("Are you sure you want to exit without saving first?");
}

//Função para escrever a data
function writeDate() {
   const d = new Date();

   // Define o formato a mostrar
   let dateTimeString = d.toLocaleString("en-GB");
   dateTimeString = dateTimeString.replace(",", "&nbsp; &nbsp; &nbsp;");

   // Insere no HTML
   document.getElementById("date").innerHTML = dateTimeString;
}
