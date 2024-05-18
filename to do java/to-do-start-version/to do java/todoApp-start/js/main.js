//Поиск элементов на странице из form в разметке
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')

let tasks = [];

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

//функции
function addTask(event) {
        // Убираю отправку формы и типа страница не обновляется после нажатия на кнопку добавить
        event.preventDefault();

        //Доставляем текст из задачи из поля ввода
        const taskText =  taskInput.value;

        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false,
        };

        //Добавляем задачу в массив с задачами 
        tasks.push(newTask)

        //формируем css класс
        const cssClass = newTask.done ?  'task-title task-title--done' : "task-title";

        //формулирую разметку для новой задачи 
        const taskHTML = `
                    <li id = "${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${newTask.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                 <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;
    
        //Добавление задачи на страницу
        tasksList.insertAdjacentHTML('beforeend', taskHTML);
    
        //Очищаю поле вводаи возвращаем на него фокус
        taskInput.value = ""
        taskInput.focus()
    
        //Если в списке задач болле одного элекмента то он скрывается
        if (tasksList.children.length > 1) {
            emptyList.classList.add('none');
        }

}
function deleteTask(event) {
    //проверка если клик был не по кнопке
    if (event.target.dataset.action !== 'delete') return;

    //проверка на клик по кнопке удалить
    const parenNode = event.target.closest('.list-group-item')

    //определить ID задачи
    const id = Number(parenNode.id); 
    
    //Найти индекс задачи в массиве
    const index =  tasks.findIndex(function (task) {   
        console.log(task);
        if (task.id === id) {
            return true;
        }

        return task.id === id
    });


    //удаляю задачу из массива
    tasks.splice(index, 1)

    //удаляем из разметки 
    parenNode.remove();

     //Если в списке задач болле одного элекмента то он скрывается
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }      
}

function doneTask(event) {
    //если клик был не по кнопке задача выполнена
    if (event.target.dataset.action !== "done") return

    //Проверка на "задача выполнена"    
    const parenNode = event.target.closest('.list-group-item');
    const taskTitle = parenNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done'); 

}
