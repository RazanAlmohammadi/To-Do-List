// Getting elements by their IDs
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

let totalCount = 0;
let completedCount = 0;
let toDoArray = [];

// Loading any previously stored to-do list from localStorage
const storedToDos = localStorage.getItem("todoArray");
if (storedToDos) {
    toDoArray = JSON.parse(storedToDos);
    totalCount = toDoArray.length;
    totalTasks.textContent = totalCount;

    // Loop through stored todos and render each one on the page
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

        // Handling task completion with the checkbox
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

        // Handling task deletion
        const deleteBtn = todoWrapper.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (event) => {
            const todoItem = event.target.closest('li');
            if (checkBox.checked) {
                completedCount--;
            }
            todoItem.remove();
            totalCount--;
            totalTasks.textContent = totalCount;
            // Update the to-do array after deletion
            toDoArray = toDoArray.filter(item => item !== todoText);
            localStorage.setItem("todoArray", JSON.stringify(toDoArray));
            completedTasks.textContent = completedCount;
        });

        // Handling task editing
        const editBtn = todoWrapper.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            const currentText = toDoTextElement.textContent;
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = currentText;

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';

            // Replacing the task text with an input field for editing
            toDoTextElement.replaceWith(editInput);
            editBtn.replaceWith(saveBtn);

            // Saving the updated task
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

// Adding a new to-do when the add button is clicked
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
        todoInput.value = '';  // Clear input field after adding
        totalCount++;
        totalTasks.textContent = totalCount;

        // Handle task completion
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

        // Handle task deletion
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

        // Handle task editing
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

// Storing and displaying user input
const enterBtn = document.getElementById("enterBtn");
const userInputDisplay = document.getElementById("userInput");

enterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const userInput = document.getElementById("firstName").value;
    userInputDisplay.innerHTML = userInput;
    localStorage.setItem("userFirstName", userInput);
});

// Checking if a user name is stored and displaying it
const storedName = localStorage.getItem("userFirstName");
if (storedName) {
    userInputDisplay.innerHTML = storedName;
}
