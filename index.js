const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

let totalCount = 0;
let completedCount = 0;
let toDoArray = [];

const storedToDos = localStorage.getItem("todoArray");
if (storedToDos) {
    toDoArray = JSON.parse(storedToDos);
    totalCount = toDoArray.length; 
    totalTasks.textContent = totalCount; 

    toDoArray.forEach(todoText => {
        const todoWrapper = document.createElement('li');
        const todoItem = `
            <div class="toDoItem">
                <span class="toDoText"> ${todoText} </span>
                <input class="checkBox" type="checkbox"/>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        todoWrapper.innerHTML = todoItem;
        todoList.appendChild(todoWrapper);

        const checkBox = todoWrapper.querySelector(".checkBox");
        const toDoTextElement = todoWrapper.querySelector(".toDoText");

       
        checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                toDoTextElement.classList.add("completed");
                completedCount++;
            } else {
                toDoTextElement.classList.remove("completed");
                completedCount--;
            }
            completedTasks.textContent = completedCount;
            localStorage.setItem("todoArray", JSON.stringify(toDoArray));
        });

        const deleteBtn = todoWrapper.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            const todoItem = event.target.closest('li');
            if (checkBox.checked) {
                completedCount--;
            }
            todoItem.remove();
            totalCount--;
            totalTasks.textContent = totalCount;
           
            toDoArray = toDoArray.filter(item => item !== todoText);
            localStorage.setItem("todoArray", JSON.stringify(toDoArray));
            completedTasks.textContent = completedCount; 
        });

        const editBtn = todoWrapper.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            const currentText = toDoTextElement.textContent;
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = currentText;

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';

            toDoTextElement.replaceWith(editInput);
            editBtn.replaceWith(saveBtn);

            saveBtn.addEventListener('click', () => {
                const updatedText = editInput.value;
                if (updatedText !== "") {
                    toDoTextElement.textContent = updatedText;
                    editInput.replaceWith(toDoTextElement);
                    saveBtn.replaceWith(editBtn);

                    const index = toDoArray.indexOf(currentText);
                    toDoArray[index] = updatedText; 
                    localStorage.setItem("todoArray", JSON.stringify(toDoArray)); 
                }
            });
        });
    });
}


addTodoBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;

    if (todoText !== "") {
        toDoArray.push(todoText); 

        const todoWrapper = document.createElement('li');
        const todoItem = `
            <div class="toDoItem">
                <span class="toDoText"> ${todoText} </span>
                <input class="checkBox" type="checkbox"/>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        todoWrapper.innerHTML = todoItem;
        todoList.appendChild(todoWrapper);
        todoInput.value = ''; 
        totalCount++;
        totalTasks.textContent = totalCount;

        const checkBox = todoWrapper.querySelector(".checkBox");
        const toDoTextElement = todoWrapper.querySelector(".toDoText");

      
        checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                toDoTextElement.classList.add("completed");
                completedCount++;
            } else {
                toDoTextElement.classList.remove("completed");
                completedCount--;
            }
            completedTasks.textContent = completedCount;
            localStorage.setItem("todoArray", JSON.stringify(toDoArray));
        });

        
        const deleteBtn = todoWrapper.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            const todoItem = event.target.closest('li');
            if (checkBox.checked) {
                completedCount--;
            }
            todoItem.remove();
            totalCount--;
            totalTasks.textContent = totalCount;

            toDoArray = toDoArray.filter(item => item !== todoText);
            localStorage.setItem("todoArray", JSON.stringify(toDoArray));
            completedTasks.textContent = completedCount; 
        });

        const editBtn = todoWrapper.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            const currentText = toDoTextElement.textContent;
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = currentText;

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';

            toDoTextElement.replaceWith(editInput);
            editBtn.replaceWith(saveBtn);

            saveBtn.addEventListener('click', () => {
                const updatedText = editInput.value;
                if (updatedText !== "") {
                    toDoTextElement.textContent = updatedText;
                    editInput.replaceWith(toDoTextElement);
                    saveBtn.replaceWith(editBtn);

                    const index = toDoArray.indexOf(currentText);
                    toDoArray[index] = updatedText; 
                    localStorage.setItem("todoArray", JSON.stringify(toDoArray)); 
                }
            });
        });

        localStorage.setItem("todoArray", JSON.stringify(toDoArray)); 
        completedTasks.textContent = completedCount; 
    }
});


const enterBtn = document.getElementById("enterBtn");
const userInputDisplay = document.getElementById("userInput");

enterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const userInput = document.getElementById("firstName").value;
    userInputDisplay.innerHTML = userInput;
    localStorage.setItem("userFirstName", userInput);
});


const storedName = localStorage.getItem("userFirstName");
if (storedName) {
    userInputDisplay.innerHTML = storedName;
}
