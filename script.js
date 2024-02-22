document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
  });

  function addTask() {
    const taskInput = document.getElementById('task');
    const daySelect = document.getElementById('day');

    const task = taskInput.value;
    const day = daySelect.value;

    if (task.trim() === '') {
      alert('Add task!');
      return;
    }

    const taskData = {
      task: task,
      day: day,
      completed: false
    };

    let tasks = getTasks();
    tasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    loadTasks();
  }

  function loadTasks() {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    days.forEach(function (day) {
      const dayTasks = getTasks().filter(task => task.day === day);
      const dayColumn = document.createElement('div');
      dayColumn.classList.add('dayColumn');
      dayColumn.innerHTML = `<h3>${capitalizeFirstLetter(day)}</h3><ul>${renderTasks(dayTasks)}</ul>`;
      tasksContainer.appendChild(dayColumn);
    });
  }

  function renderTasks(tasks) {
    return tasks.map(taskData => {
      return `<li class="${taskData.completed ? 'completed' : ''}">
                <input type="checkbox" ${taskData.completed ? 'checked' : ''} onclick="toggleCompleted(this, ${getTasks().indexOf(taskData)})">
                <span>${taskData.task}</span>
                <button onclick="deleteTask(${getTasks().indexOf(taskData)})">Delete</button>
              </li>`;
    }).join('');
  }

  function toggleCompleted(checkbox, index) {
    const tasks = getTasks();
    tasks[index].completed = checkbox.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }