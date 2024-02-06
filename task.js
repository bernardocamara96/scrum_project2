const title_txt = document.querySelector("#title");
const description_txt = document.querySelector("#description");
const color_input = document.querySelector("#task_color");
const tasks = JSON.parse(localStorage.getItem("tasks"));
const task = JSON.parse(localStorage.getItem("task_object"));
const index = localStorage.getItem("task_index");

document.querySelector("#body_color").style.backgroundColor = localStorage.getItem("background_color");

document.querySelector("#user").textContent = localStorage.getItem("username");

writeDate();

// Executa a função em intervalos de 1 segundo para atualizar a data
setInterval(writeDate, 1000);

/*Se o título da tarefa for diferente de "" siginifica que esta existe e são impressos o título e descrição desta, 
é mostrado o botão de delete e o título da form é Task Edit, caso contrário os campos são deixados sem nada, o botão 
de delete não é mostrado e o título da forma é Task Creation*/
if (task.title != "") {
   title_txt.value = task.title;
   description_txt.value = task.description;
   color_input.value = task.color;
   document.querySelector("#task_save").style.width = "46%";
   document.querySelector("#task_delete").style.display = "inline-block";
   document.querySelector("#task_creationTitle").textContent = "Task Edit";
} else {
   color_input.value = "#ffffff";
   document.querySelector("#task_delete").style.display = "none";
   document.querySelector("#task_save").style.width = "95%";
   document.querySelector("#task_creationTitle").textContent = "Task Creation";
}

/*Só é possível gravar a tarefa se esta contiver algum título. Caso o campo do título tenha algo escrito
vai haver uma verificação se esta tarefa está a ser criada ou editada. Caso esteja a ser criada, esta tarefa
é adicionada no fim da array de tarefas, caso esteja a ser editada é apenas mudado os valores dos atributos desta*/
document.querySelector("#task_save").addEventListener("click", function () {
   if (title_txt.value != "") {
      if (task.title == "") {
         const data = new Date();
         const task = {
            id: data.getTime(),
            column: "list1",
            title: title_txt.value,
            description: description_txt.value,
            color: color_input.value,
         };
         tasks.push(task);
         localStorage.setItem("tasks", JSON.stringify(tasks));
         window.location.href = "scrum.html";
      } else {
         if (confirmEdit()) {
            tasks[index].title = title_txt.value;
            tasks[index].description = description_txt.value;
            tasks[index].color = color_input.value;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            window.location.href = "scrum.html";
         }
      }
   } else {
      alert("Need to put a task title.");
   }
});

/*Botão para eliminar a tarefa, usando o método splice, que tem como argumentos de entrada o índice a partir do
qual queremos eliminar e quantos elementos queremos eliminar, neste caso vamos buscar o índice da tarefa a 
ser eliminada e como é apenas essa o segundo parâmetro é 1*/
document.querySelector("#task_delete").addEventListener("click", function () {
   if (confirmDelete()) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      window.location.href = "scrum.html";
   }
});

//Botão de fecho que direciona o utilizador para a página principal da aplicação
document.querySelector("#cancel").addEventListener("click", function () {
   if (confirmExit()) {
      window.location.href = "scrum.html";
   }
});

//Botão para direcionar o utlizador para a página de login
document.querySelector("#logout").addEventListener("click", function () {
   localStorage.setItem("username", "");
   window.location.href = "login.html";
});

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

// Função data e relógio

function writeDate() {
   const d = new Date();

   // Define o formato a mostrar
   let dateTimeString = d.toLocaleString("en-GB");
   dateTimeString = dateTimeString.replace(",", "&nbsp; &nbsp; &nbsp;");

   // Insere no HTML
   document.getElementById("date").innerHTML = dateTimeString;
}
