let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let progressInput = document.getElementById("progressInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let data = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });

/**
 * Valid the form and process data
 */  
  
let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {

    console.log("success");
    msg.innerHTML = "";
    acceptData();
    // Close the modal
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

  (() => {
    add.setAttribute("data-bs-dismiss", "");
  })();
  }
};

  

/**
 * Push data into local storage
 */

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    progress: progressInput.value,
    description: textarea.value,
  });

  console.log("accepting date: " + dateInput.value);
  console.log("accepting progress: " + progressInput.value);
  console.log("accepting description: " + textarea.value);

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

/**
 * 
 */

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <span class="small text-secondary">${x.progress}</span>
            <p>${x.description}</p>
    
            <span class="options text-center">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="bi bi-pencil-square crud"></i></i>
              <i onClick ="deleteTask(this);createTasks()" class="bi bi-trash crud"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };

  /**
   * Clear the form
   */

  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    progressInput.value = "";
    textarea.value = "";
  };

  /**
   * Delete a record
   * @param {*} e 
   */

  let deleteTask = (e) => {

    // detelete HTML element
    e.parentElement.parentElement.remove();
  
    // remove from array
    data.splice(e.parentElement.parentElement.id, 1);
  
    // update local storage
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };
  
  /**
   * Edit a record
   * @param {*} e 
   */

  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    
    console.log(e);

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    progressInput.value = selectedTask.children[2].innerHTML;
    console.log("editing progress " + progressInput.value);
    textarea.value = selectedTask.children[3].innerHTML;
    console.log("editing description " + textarea.value);
  
    deleteTask(e);
  };
  

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();
  