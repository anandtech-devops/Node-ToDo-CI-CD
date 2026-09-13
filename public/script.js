const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

async function loadTodos() {
    const response = await fetch("/api/todos");
    const todos = await response.json();

    todoList.innerHTML = "";

    todos.forEach((todo) => {
        addTodoToUI(todo);
    });
}

function addTodoToUI(todo) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todo.title;

    if (todo.completed) {
        span.classList.add("completed");
    }

    span.addEventListener("click", async () => {
        await fetch(`/api/todos/${todo.id}`, {
            method: "PUT"
        });

        loadTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", async () => {
        await fetch(`/api/todos/${todo.id}`, {
            method: "DELETE"
        });

        loadTodos();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

todoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = todoInput.value.trim();

    if (!title) {
        return;
    }

    await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    todoInput.value = "";

    loadTodos();
});

loadTodos();