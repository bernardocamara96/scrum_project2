const username = localStorage.getItem("username");
document.querySelector("#user").textContent = username;
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const retros = JSON.parse(localStorage.getItem("retros")) || [];

console.log(tasks);
printTasks(tasks);

writeDate();

//Executa a função em intervalos de 1 segundo para atualizar a data
setInterval(writeDate, 1000);

document.querySelector("#logout").addEventListener("click", function () {
   localStorage.setItem("username", "");
   window.location.href = "login.html";
});

//Event Listenner para o botao EditProfile

document.querySelector("#btn_edit").addEventListener("click", function () {
   window.location.href = "edit_profile.html";
});


document.querySelector("#btn_sprint").addEventListener("click", function () {
   window.location.href = "retrospective.html";
});

/*Evento de clicar no botão "+ New Task" da aplicação. Aqui é criado um objeto task. Para ser utilizado
na página task-html. Nessa página há uma condição que ao verificar que a task não tem título 
vai ser apresentada a form de criação e não a de edição */
document.querySelector("#btn_task").addEventListener("click", function () {
   localStorage.setItem("tasks", JSON.stringify(tasks));
   const task = {
      title: "",
      description: "",
   };
   localStorage.setItem("task_object", JSON.stringify(task));
   window.location.href = "task.html";
});

const taskLists = document.querySelectorAll(".task_list");

/*Ciclo for para adicionar a todas as colunas o evento dragover. Este evento vai verificar qual o elemento 
que tem a class drag e quando este elemento passar por cima da coluna vai fazer o append child desta div nela
e vai mudar o atributo column do objeto task para quando a página for atualizada as tarefas serem impressas
na coluna em que estavam anteriormente*/

for (let taskList of taskLists) {
   taskList.addEventListener("dragover", function (e) {
      e.preventDefault();
      const draggable = document.querySelector(".drag");
      taskList.appendChild(draggable);

      for (let task of tasks) {
         if (draggable.id == task.id) {
            task.column = this.id;
         }
      }
   });
}

/*Sempre que a página é fechada ou quando o utilizador muda de página a array das tarefas é guardada em localStorage */

window.addEventListener("beforeunload", function () {
   localStorage.setItem("tasks", JSON.stringify(tasks));
});

document.querySelector("#modal_cancel").addEventListener("click", function () {
   document.querySelector("#modal").style.visibility = "hidden";
   document.querySelector("#background").style.visibility = "hidden";
});

document.querySelector("#background").addEventListener("click", function () {
   document.querySelector("#modal").style.visibility = "hidden";
   document.querySelector("#background").style.visibility = "hidden";
   document.querySelector("#modal_settings").style.visibility = "hidden";
});

document.querySelector("#btn_settings").addEventListener("click", function () {
   document.querySelector("#modal_settings").style.visibility = "visible";
   document.querySelector("#background").style.visibility = "visible";
});

const delete_btns = document.querySelectorAll(".delete_btn");
const buttons = document.querySelectorAll(".task_btn");

/*Ciclo for para adicionar a todos os botões de editar a tarefa o evento de clicar. Neste evento são guardados
em localStorage o índice da array de tarefas correspondente à tarefa clicada e o objeto da tarefa. 
O setTimeout foi inserido apenas pela razão de que ele ao ler a linha de código i=tasks.lenght continuava dentro do ciclo 
por mais um índice. Ou seja a variável i não estava a guardar o valor dos tasks.lenght logo. Apesar de meter a 0 a linha 
já funcionou desta forma */

for (let btn of buttons) {
   btn.addEventListener("click", function () {
      for (let i = 0; i < tasks.length; i++) {
         if (tasks[i].id == this.parentNode.id) {
            localStorage.setItem("task_index", i);
            localStorage.setItem("task_object", JSON.stringify(tasks[i]));
            setTimeout(() => {
               i = tasks.length;
            }, 0);
         }
      }
      window.location.href = "task.html";
   });
}

/*Ciclo for para adicionar o evento de clicar a todos os botões delete. Neste evento é eliminado da array a tarefa com
o id igual ao element div que está a ser clicado. O elemento div também é eliminado da coluna em que está */

for (let btn of delete_btns) {
   btn.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this task?")) {
         for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == this.parentNode.id) {
               tasks.splice(i, 1);
               localStorage.setItem("tasks", JSON.stringify(tasks));
               this.parentNode.remove();
            }
         }
      }
   });
}

/*Função para fazer a impressão inicial das tarefas, quando a página é inicializada. As tarefas vão ser impressas
nas colunas em que estavam anteriormente a partir do atributo column do objeto task. Também são adicionados todos 
os eventos dos botões de delete e dos botões de edição das tarefas */
function printTasks(tasks) {
   for (let i = 0; i < tasks.length; i++) {
      const task_div = document.createElement("div");
      task_div.id = tasks[i].id;
      task_div.classList.add("task");
      taskCreationAddEvents(task_div);
      task_div.setAttribute("draggable", "true");
      task_div.style.backgroundColor = tasks[i].color;
      task_div.style.color = fontColorRGB(tasks[i].color);

      const task_title = document.createElement("div");
      task_title.classList.add("task_title");
      task_title.textContent = tasks[i].title;
      task_div.appendChild(task_title);

      const task_btn = document.createElement("button");
      task_btn.innerHTML = "&#9998;";
      task_btn.classList.add("task_btn");
      task_btn.style.color = fontColorRGB(tasks[i].color);

      addEventsBeforeDrag(task_btn, task_div);

      const task_btnDelete = document.createElement("button");
      task_btnDelete.innerHTML = "&#128465;";
      task_btnDelete.classList.add("delete_btn");
      task_btnDelete.style.color = fontColorRGB(tasks[i].color);

      addEventsBeforeDrag(task_btnDelete, task_div);

      task_div.appendChild(task_btnDelete);
      task_div.appendChild(task_btn);

      if (tasks[i].column == "list1") {
         document.querySelector("#list1").appendChild(task_div);
      } else if (tasks[i].column == "list2") {
         document.querySelector("#list2").appendChild(task_div);
      } else if (tasks[i].column == "list3") {
         document.querySelector("#list3").appendChild(task_div);
      }
   }
}

/*Função que adiciona todos os eventos a cada div das tarefas. */
function taskCreationAddEvents(task_div) {
   /*Evento que abre a modal que vai mostrar o título e a descrição da tarefa */
   task_div.addEventListener("dblclick", function () {
      for (let i = 0; i < tasks.length; i++) {
         if (tasks[i].id == task_div.id) {
            const task_sel = tasks[i];
            document.querySelector("#modal_title").innerHTML = task_sel.title;
            document.querySelector("#modal_description").innerHTML = task_sel.description;
            document.querySelector("#modal").style.visibility = "visible";
            document.querySelector("#background").style.visibility = "visible";
         }
      }
   });

   /*Evento que muda a cor da div da tarefa quando esta começa a ser arrastada. Também adiciona a class drag a esta div.
   Guarda-se a cor original da div para podermos ir buscá-la quando esta deixar de ser arrastada */
   task_div.addEventListener("dragstart", function () {
      localStorage.setItem("drag_backgroundColor", task_div.style.backgroundColor);
      task_div.classList.add("drag");
      task_div.style.backgroundColor = "#bebebe";
      task_div.style.color = "#bebebe";
   });

   /*Quando a div deixa de ser arrastada é tirada da array das tasks e voltada a ser adicionada no fim desta array. 
   Assim quando a página é atualizada as tarefas são mostradas exatamente pela mesma ordem que o utilizador deixou. 
   Também é removida a class drag da div as cores desta voltam às originais antes dela começar a ser arrastada */
   task_div.addEventListener("dragend", function () {
      for (let i = 0; i < tasks.length; i++) {
         if (this.id == tasks[i].id) {
            tasks.push(tasks[i]);
            tasks.splice(i, 1);
            break;
         }
      }

      task_div.classList.remove("drag");

      task_div.style.backgroundColor = localStorage.getItem("drag_backgroundColor");
      task_div.style.color = fontColorRGB(localStorage.getItem("drag_backgroundColor"));
   });

   /*Os botões de delete e de edit das tasks apenas são mostrados quando o cursor passa por cima da div*/

   task_div.addEventListener("mouseenter", function () {
      task_div.childNodes[1].style.visibility = "visible";
      task_div.childNodes[2].style.visibility = "visible";
   });
   task_div.addEventListener("mouseleave", function () {
      task_div.childNodes[1].style.visibility = "hidden";
      task_div.childNodes[2].style.visibility = "hidden";
   });
}

/*Função para adicionar os eventos de hover e active ao butão btn consoante a cor da task_div */
function addEventsBeforeDrag(btn, task_div) {
   btn.addEventListener("mouseenter", function () {
      for (let task of tasks) {
         if (task_div.id == task.id) {
            const color = rgbColor(task.color, -15, -15, -15);
            btn.style.backgroundColor = color;
         }
      }
   });

   btn.addEventListener("mouseleave", function () {
      for (let task of tasks) {
         if (task_div.id == task.id) {
            btn.style.backgroundColor = task.color;
         }
      }
   });

   btn.addEventListener("mousedown", function () {
      for (let task of tasks) {
         if (task_div.id == task.id) {
            const color = rgbColor(task.color, -30, -30, -30);
            this.style.backgroundColor = color;
         }
      }
   });
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

//////CORES///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

//Vai colorir a aplicação com as cores anteriormente guardadas em localStorage
colorizeApp(
   localStorage.getItem("background_color") || "#172b4c",
   localStorage.getItem("toDo_color") || "#f1f2f4",
   localStorage.getItem("doing_color") || "#f1f2f4",
   localStorage.getItem("done_color") || "#f1f2f4"
);

document.querySelector("#background_color").value = localStorage.getItem("background_color") || "#172b4c";
document.querySelector("#toDo_color").value = localStorage.getItem("toDo_color") || "#f1f2f4";
document.querySelector("#doing_color").value = localStorage.getItem("doing_color") || "#f1f2f4";
document.querySelector("#done_color").value = localStorage.getItem("done_color") || "#f1f2f4";

/*Evento de click no botão apply que vai buscar as cores escolhidas pelo utilizador e vai aplicar à aplicação.
Estas cores ficam guardadas em localStorage para quando o utilizador mudar de página as cores se manterem*/

document.querySelector("#apply").addEventListener("click", function () {
   const background_color = document.querySelector("#background_color").value;
   const toDo_color = document.querySelector("#toDo_color").value;
   const doing_color = document.querySelector("#doing_color").value;
   const done_color = document.querySelector("#done_color").value;

   colorizeApp(background_color, toDo_color, doing_color, done_color);

   document.querySelector("#btn_task").addEventListener("mouseenter", function () {
      const color = hexToRGB(toDo_color, -15, -15, -15);

      this.style.backgroundColor = color;
   });

   document.querySelector("#btn_task").addEventListener("mouseleave", function () {
      this.style.backgroundColor = toDo_color;
   });

   document.querySelector("#btn_task").addEventListener("mousedown", function () {
      color = hexToRGB(toDo_color, -30, -30, -30);

      this.style.backgroundColor = color;
   });

   localStorage.setItem("background_color", background_color);
   localStorage.setItem("toDo_color", toDo_color);
   localStorage.setItem("doing_color", doing_color);
   localStorage.setItem("done_color", done_color);

   document.querySelector("#background").style.visibility = "hidden";
   document.querySelector("#modal_settings").style.visibility = "hidden";
});

document.querySelector("#btn_task").addEventListener("mouseenter", function () {
   const color = hexToRGB(localStorage.getItem("toDo_color"), -15, -15, -15);

   this.style.backgroundColor = color;
});

document.querySelector("#btn_task").addEventListener("mouseleave", function () {
   this.style.backgroundColor = localStorage.getItem("toDo_color");
});

document.querySelector("#btn_task").addEventListener("mousedown", function () {
   const color = hexToRGB(localStorage.getItem("toDo_color"), -30, -30, -30);

   this.style.backgroundColor = color;
});

document.querySelector("#cancel_settings").addEventListener("click", function () {
   document.querySelector("#background").style.visibility = "hidden";
   document.querySelector("#modal_settings").style.visibility = "hidden";
});

document.querySelector("#modal_cancel2").addEventListener("click", function () {
   document.querySelector("#background").style.visibility = "hidden";
   document.querySelector("#modal_settings").style.visibility = "hidden";
});

//Este evento ao ser acionado muda todas as cores da aplicação para as cores originais desta
document.querySelector("#reset_settings").addEventListener("click", function () {
   colorizeApp("#172b4c", "#f1f2f4", "#f1f2f4", "#f1f2f4");

   localStorage.setItem("background_color", "#172b4c");
   localStorage.setItem("toDo_color", "#f1f2f4");
   localStorage.setItem("doing_color", "#f1f2f4");
   localStorage.setItem("done_color", "#f1f2f4");

   document.querySelector("#background_color").value = "#172b4c";
   document.querySelector("#toDo_color").value = "#f1f2f4";
   document.querySelector("#doing_color").value = "#f1f2f4";
   document.querySelector("#done_color").value = "#f1f2f4";

   document.querySelector("#btn_task").addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#dddddd";
   });

   document.querySelector("#btn_task").addEventListener("mouseleave", function () {
      this.style.backgroundColor = "#f1f2f4";
   });

   document.querySelector("#btn_task").addEventListener("mousedown", function () {
      this.style.backgroundColor = "#c8c8c8";
   });

   document.querySelector("#background").style.visibility = "hidden";
   document.querySelector("#modal_settings").style.visibility = "hidden";
});

/*Função para colorir a aplicação, em que como argumentos temos a cor para o background da aplicação, a cor para a coluna
do To Do, a cor para a coluna Doing e a cor para a coluna Done, respetivamente. As fonts das letras presentes em cada uma
das colunas também vai atualizar consoante a cor da coluna*/

function colorizeApp(backgroundColor, toDoColor, doingColor, doneColor) {
   document.querySelector("#body_color").style.backgroundColor = backgroundColor;
   document.querySelector("#column1").style.backgroundColor = toDoColor;
   document.querySelector("#column2").style.backgroundColor = doingColor;
   document.querySelector("#column3").style.backgroundColor = doneColor;
   document.querySelector("#btn_task").style.backgroundColor = toDoColor;
   document.querySelector("#column1 .title").style.color = fontColor(toDoColor);
   document.querySelector("#column2 .title").style.color = fontColor(doingColor);
   document.querySelector("#column3 .title").style.color = fontColor(doneColor);
   document.querySelector("#btn_task").style.color = fontColor(toDoColor);
}

/*Função para transformar uma cor Hex em RGB, com o qual é mais fácil fazer contas. Esta função existe apenas
porque as cores em hover e active dos butões são calculadas a partir da cor original destes. 
Apenas aceita cores em formato hexadecimal*/

function hexToRGB(hexColor, redChange, greenChange, blueChange) {
   /*Esta linha serve para verificar se a cor é do tipo hexadecimal e extrai os componentes RGB em array. 
 No fundo vai ver se os caracteres coincidem entre a até f ou se é um número décimal para Red, Green e Blue. No fim dá um array em rgb
 onde o primeiro índice corresponde ao componente vermelho, o segundo ao verde e o terceiro ao azul*/

   var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

   var red = parseInt(rgb[1], 16);
   var green = parseInt(rgb[2], 16);
   var blue = parseInt(rgb[3], 16);

   red = red + redChange;
   green = green + greenChange;
   blue = blue + blueChange;

   const color = "rgb(" + red + ", " + green + ", " + blue + ")";

   return color;
}

/*Função para calcular a cor das letras consoante a sua cor de fundo. Dá sempre uma cor perto do preto ou uma cor perto do branco
apenas aceita cores em formato Hexadecimal*/

function fontColor(hexColor) {
   var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
   var red = parseInt(rgb[1], 16);
   var green = parseInt(rgb[2], 16);
   var blue = parseInt(rgb[3], 16);

   if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      return "rgb(14, 14, 14)";
   } else {
      return "rgb(250, 250, 250)";
   }
}

/*Função para calcular a cor das letras consoante a sua cor de fundo. Dá sempre uma cor perto do preto ou uma cor perto do branco
apenas aceita cores em formato RGB*/

function fontColorRGB(RGBcolor) {
   var colorsOnly = RGBcolor.split(")"); //gives "rgba(111,222,333,0.5" at index 0

   var colorsOnly = colorsOnly[0].split("("); //gives "111,222,333,0.5 at index 1

   var colorsOnly = colorsOnly[1].split(",");

   var red = colorsOnly[0].split(",");
   var green = colorsOnly[1].split(",");
   var blue = colorsOnly[2].split(",");

   if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      return "rgb(14, 14, 14)";
   } else {
      return "rgb(250, 250, 250)";
   }
}

/*Função que calcula as cores para hover e active dos butões. Apenas aceita como parâmetro de entradacores em formato RGB*/

function rgbColor(RGBcolor, redChange, greenChange, blueChange) {
   var colorsOnly = RGBcolor.split(")");
   var colorsOnly = colorsOnly[0].split("(");
   var colorsOnly = colorsOnly[1].split(",");

   var red = parseInt(colorsOnly[0].split(","));
   var green = parseInt(colorsOnly[1].split(","));
   var blue = parseInt(colorsOnly[2].split(","));

   red = red + redChange;
   green = green + greenChange;
   blue = blue + blueChange;

   const colorRGB = "rgb(" + red + ", " + green + ", " + blue + ")";

   return colorRGB;
}
