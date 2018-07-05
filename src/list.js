// List helper functions
let lists = []
const urlLists = "http://localhost:3000/lists"

function updateLists(listResponses){
  lists = [];
  listResponses.forEach(listResponse => lists.push(listResponse));
}

function listGenerator (listTitle) {
    const listObj = {
    "title": listTitle
    };
    return listObj;
}

const handleNewListCreation = () => {
  const listTitleField = document.getElementById('new-list-title');
  const listTitle = listTitleField.value;
  const data = listGenerator(listTitle);
  const configObj = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)}
  fetch(urlLists, configObj).then(r => r.json()).then(console.log).then(init);
  listTitleField.value = ''
}

function handleDeleteList(event) {
  const tasksDelete = tasks.filter(taskObj => taskObj.listId === parseInt(event.target.dataset.listId));
  tasksDelete.forEach(function(task){
    const deleteUrl = `${urlTasks}/${task.id}`;
    fetch(deleteUrl, {method: "DELETE"});
  })
  const deleteUrl = `${urlLists}/${event.target.dataset.listId}`;
  fetch(deleteUrl, {method: "DELETE"}).then(init)
}
