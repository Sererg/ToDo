
const form =  document.querySelector("#form");
const taskInput =  document.querySelector("#taskInput");
const tasksList =  document.querySelector("#tasksList");
const emptyList =  document.querySelector("#emptyList");
//добавление задачи
form.addEventListener("submit",addTask);
//удаление задачи  
tasksList.addEventListener("click", deletTask);

tasksList.addEventListener("click", doneTask);

if(localStorage.getItem("tasksHTML")){
	tasksList.innerHTML = localStorage.getItem("tasksHTML");
} 

function addTask(event){
	event.preventDefault();

	const taskText = taskInput.value;

	//разметка для новой задачи
	const taskHTML = `
                    <li class="list-group-item d-flex justify-content-between task-item">
                    <span class="task-title">${taskText}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                    </li>
    `;
	tasksList.insertAdjacentHTML("beforeend", taskHTML);
	taskInput.value = "";
	taskInput.focus();
	//скрываем "список дел пуст'
	if(tasksList.children.length > 1){
		emptyList.classList.add("none");
	}
	saveHTMLtoLs();
}

function deletTask(event){
	if(event.target.dataset.action === "delete"){
		console.log("Delete!");
		const parentNode =  event.target.closest("li");
		console.log(parentNode);
		parentNode.remove();
	}
	if(tasksList.children.length === 1){
		emptyList.classList.remove("none");

	}
	saveHTMLtoLs();
}

function doneTask(event){
	if(event.target.dataset.action === "done"){
		console.log("Done!");
		const parentNode =  event.target.closest("li");
		const taskTitle = parentNode.querySelector(".task-title");
		taskTitle.classList.toggle("task-title--done");
		console.log(taskTitle);
	}
    
	saveHTMLtoLs();
}
function saveHTMLtoLs(){
	localStorage.setItem("tasksHTML", tasksList.innerHTML);
}







