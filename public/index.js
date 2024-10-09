const todoList = document.getElementById("todo-list");
const newnameInputInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");

// Fetch to-do list items from backend API
fetch("/movies")
  .then((response) => response.json())
  .then((todoItems) => {
    // console.log(todoItems);  // Check what is returned
    if (Array.isArray(todoItems.data.movies)) {
      todoItems.data.movies.forEach((item) => {
        addItemToList(item);
      });
    } else {
      console.error("Expected an array, but got:", todoItems);
    }
  })
  .catch((error) => {
    console.log("Error fetching movies:", error);
  });

// Add event listener to add-task button
addTaskButton.addEventListener("click", () => {
  const newnameInput = newnameInputInput.value.trim();
  if (newnameInput) {
    // Send POST request to backend API to add new task
    fetch("/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moviename: newnameInput }),
    })
      .then((response) => response.json())
      .then((newTodoItem) => {
        
        addItemToList(newTodoItem.data.movie);
        newnameInputInput.value = "";
      });
  }
});

function addItemToList(item) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
        <span>${item.moviename}</span>
        <div class='saves'>
          <button class="edit-btn">Edit</button>
          <button class="save-btn" style="display: none;">Save</button>
          <button class="delete-btn">&#128465;</button>
        </div>
      `;
  todoList.appendChild(listItem);

  const deleteButton = listItem.querySelector(".delete-btn");
  const editButton = listItem.querySelector(".edit-btn");
  const saveButton = listItem.querySelector(".save-btn");
  const taskSpan = listItem.querySelector("span");

  // Add delete functionality
  deleteButton.addEventListener("click", () => {
    fetch(`/movies/${item._id}`, {
      // Fixed: Use item._id assuming MongoDB ID
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          listItem.remove();
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  });

  // Add edit functionality
  editButton.addEventListener("click", () => {
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = taskSpan.textContent;
    listItem.replaceChild(taskInput, taskSpan);
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
  });

  // Add save functionality
  saveButton.addEventListener("click", () => {
    const taskInput = listItem.querySelector("input");
    const updatedTask = taskInput.value.trim();

    if (updatedTask) {
      // Send PATCH request to backend API to update the task
      fetch(`/movies/${item._id}`, {
        // Fixed: Use item._id assuming MongoDB ID
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moviename: updatedTask }),
      })
        .then((response) => response.json())
        .then((updatedItem) => {
          taskSpan.textContent = updatedItem.data.movie.moviename;
          listItem.replaceChild(taskSpan, taskInput);
          editButton.style.display = "inline-block";
          saveButton.style.display = "none";
        });
    }
  });
}
