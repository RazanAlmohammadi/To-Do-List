const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

addTodoBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

   
    if (todoText !== "") {
        const todoWrapper = document.createElement('li');

        const todoItem = `
            <div class="toDoItem">
                <span class="toDoText"> ${todoText} </span>
                <input class="checkBox" type="checkbox"/>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        todoWrapper.innerHTML = todoItem;
        todoList.appendChild(todoWrapper);
        todoInput.value = '';

        const checkBox = todoWrapper.querySelector(".checkBox");
        const toDoText = todoWrapper.querySelector(".toDoText");

        checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                toDoText.classList.add("completed");
            } else {
                toDoText.classList.remove("completed");
            }
        });

        const deleteBtn = todoWrapper.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            const todoItem = event.target.closest('li'); 
            todoItem.remove();
        });
    }
});
