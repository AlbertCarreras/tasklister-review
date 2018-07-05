// Task helper functions
let tasks = []
const urlTasks = "http://localhost:3000/tasks"

function updateTasks(taskResponses){
  tasks = []
  taskResponses.forEach(taskResponse => tasks.push(taskResponse));
}

function taskGenerator(description, priority, listId) {
  if (!priority) {priority = 'low'};
  const taskOBj = {description: description, priority: priority, listId: listId };
  return taskOBj;
}

function createTask(description, priority, listName) {
  const listId = lists.find(list => list.title === listName).id;
  const taskData = taskGenerator(description, priority, listId);
  return taskData;
}

const handleNewTaskCreation = event => {
  const taskDescription = document.getElementById('new-task-description').value;
  const taskPriority = document.getElementById('new-task-priority').value;
  const newTaskParentListName = document.getElementById('parent-list').value;
  const data = createTask(taskDescription, taskPriority, newTaskParentListName);
  const configObj = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)};
  fetch(urlTasks, configObj).then(r => r.json()).then(console.log).then(init);
}

function handleDeleteTask(event) {
    const deleteUrl = `${urlTasks}/${event.target.dataset.taskId}`;
    fetch(deleteUrl, {method: "DELETE"}).then(init);
}
