// SELECTORS
const form = document.querySelector('#todoForm');
const input = document.querySelector('#add');
const list = document.querySelector('#results');

// EVENT LISTENERS
form.addEventListener('submit', addTodo);
list.addEventListener('click', items);
document.addEventListener('DOMContentLoaded', getTodos);


// FUNCTIONS
function addTodo(event) {
  event.preventDefault();

  const newTodo = document.createElement('li');
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = 'Delete';

  newTodo.innerText = input.value;
  newTodo.classList.add('todo-item');
  newTodo.appendChild(removeBtn); // to add remove button
  list.appendChild(newTodo); // to add todo

  saveTodos(input.value) //save to localStorage

  input.value = '';
}

function items(event) {
  //console.log(event.target);
  const item = event.target;

  if (item.tagName === 'BUTTON') {
    const todo = item.parentElement;
    item.remove();

    removeTodos(todo)
    todo.remove();
  } else if (item.tagName === 'LI') {
    item.classList.add('li-item');
  }
}

// SAVE TO LOCAL STORAGE
function saveTodos(todo) {
  let todos;
  // if it doesn't exist
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    // parse it back into an array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos)); // set back the local storage.
}

function getTodos() {
  let todos;
  // check if there is something there
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } 
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // RECREATE  to add on page
  todos.forEach(function (todo) {
    const newTodo = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Delete';
    removeBtn.classList.add('removeB')

    newTodo.innerText = todo; // get from local storage
    newTodo.classList.add('todo-item');
    newTodo.appendChild(removeBtn);
    list.appendChild(newTodo);
  })
}

// REMOVE FROM LOCAL STORAGE
function removeTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log(todo.innerHTML); // li
  const todoIndex = todo.innerHTML;
  //console.log(todos.indexOf('soda'))
  todos.splice(todos.indexOf(todoIndex), 1); // second argument is amount.
  localStorage.setItem('todos', JSON.stringify(todos)); // set back the local storage.
}