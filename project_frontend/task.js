const title_txt = document.querySelector("#title");
const description_txt = document.querySelector("#description");
const initial_date = document.querySelector("#initial_date");
const end_date = document.querySelector("#end_dates");
const priority_array = document.querySelectorAll("#color_section input");
const task_type = sessionStorage.getItem("taskType");
const username = sessionStorage.getItem("username");
const pass = sessionStorage.getItem("pass");
let priority_checked = 100;

writeDate();

// Executa a função em intervalos de 1 segundo para atualizar a data
setInterval(writeDate, 1000);

getUser(username, pass).then((result) => {
   document.querySelector("#user").textContent = result.firstName;
   document.querySelector("#body_color").style.backgroundColor = result.background_color;
   document.querySelector("#user_img").src = result.imgURL;
});

/*Se o título da tarefa for diferente de "" siginifica que esta existe e são impressos o título e descrição desta, 
é mostrado o botão de delete e o título da form é Task Edit, caso contrário os campos são deixados sem nada, o botão 
de delete não é mostrado e o título da forma é Task Creation*/
if (task_type == "edit") {
   document.querySelector("#task_delete").style.display = "inline-block";
} else {
   document.querySelector("#task_delete").style.display = "none";
   document.querySelector("#task_save").style.width = "95%";
   document.querySelector("#task_creationTitle").textContent = "Task Creation";
   priority_color.style.backgroundColor = "#1eaa28";
   priority_array[0].checked = true;
}

/*Só é possível gravar a tarefa se esta contiver algum título. Caso o campo do título tenha algo escrito
vai haver uma verificação se esta tarefa está a ser criada ou editada. Caso esteja a ser criada, esta tarefa
é adicionada no fim da array de tarefas, caso esteja a ser editada é apenas mudado os valores dos atributos desta*/
document.querySelector("#task_save").addEventListener("click", function () {
   if (title_txt.value != "") {
      console.log(initial_date.value + " and " + end_date.value);
      if (!end_date.value == "" && !initial_date.value == "") {
         if (end_date.value > initial_date.value) {
            if (task_type == "create") {
               const data = new Date();
               for (let i = 0; i < priority_array.length; i++) {
                  if (priority_array[i].checked) {
                     priority_checked = parseInt(priority_array[i].value);
                  }
               }

               let task = {
                  id: data.getTime(),
                  title: title_txt.value,
                  description: description_txt.value,
                  initialDate: initial_date.value,
                  endDate: end_date.value,
                  priority: priority_checked,
                  state: "toDo",
               };

               addTask(username, pass, task);

               window.location.href = "scrum.html";
            } else {
               if (confirmEdit()) {
                  for (let i = 0; i < priority_array.length; i++) {
                     if (priority_array[i].checked) {
                        priority_checked = priority_array[i].value;
                     }
                  }

                  updateTask(username);

                  window.location.href = "scrum.html";
               }
            }
         } else {
            alert("The end date must be greater than the initial date");
         }
      } else {
         alert("You need to put the initial and end date");
      }
   } else {
      alert("Need to put a task title.");
   }
});

for (let i = 0; i < priority_array.length; i++) {
   if (i == 0) {
      priority_array[i].addEventListener("click", function () {
         priority_color.style.backgroundColor = "#1eaa28";
      });
   } else if (i == 1) {
      priority_array[i].addEventListener("click", function () {
         priority_color.style.backgroundColor = "#fbff00";
         console.log(priority_array[i].value);
      });
   } else if (i == 2) {
      priority_array[i].addEventListener("click", function () {
         priority_color.style.backgroundColor = "#e70000";
         console.log(priority_array[i].value);
      });
   }
}
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

async function updateTask(username, pass, id, title, description, initialDate, endDate, priority) {
   await fetch("http://localhost:8080/project_backend/rest/tasks/update", {
      method: "PUT",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
         username: username,
         pass: pass,
         id: id,
         title: title,
         description: description,
         initialDate: initialDate,
         endDate: endDate,
         priority: priority,
      },
   }).then(function (response) {
      if (response.status == 200) {
         alert("Task was updated successfully.");
      } else {
         alert("Something went wrong.");
      }
   });
}

async function addTask(username_value, pass, task) {
   await fetch("http://localhost:8080/project_backend/rest/tasks/create", {
      method: "POST",
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
         username: username_value,
         pass: pass,
      },
      body: JSON.stringify(task),
   }).then(function (response) {
      if (response.status == 200) {
         alert("activity is added successfully :)");
      } else {
         alert("something went wrong :(");
      }
   });
}

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
