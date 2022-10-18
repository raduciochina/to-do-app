let db = [
    {
        id: 0,
        taskName: "do your bed",
        status: "notStartedYet"
    },
    {
        id: 1,
        taskName: "prepare for exam",
        status: "inProgress"
    },
    {
        id: 2,
        taskName: "do the dishes",
        status: "done"
    }

]

let credentials = {
    username: "admin",
    password: "admin"
}

//autentificare/autorizare
function checkCredentials(username, password){
    let token = "unauthorized"
    if(username === "admin" && password === "admin"){
         token = "authorized"
    }
    return token
}

//populare lista de to-do
db.forEach((element) => {
 addTaskToUI(element)
    
})

//adaugare to-do
document.getElementById("submit").addEventListener("click", addToDo)

function addToDo(event) {
    event.preventDefault()
    document.getElementById("info").innerText = ""
    let newToDo = {}
    newToDo.taskName = document.getElementById("taskName").value
    newToDo.status = document.getElementById("status").value
    newToDo.id = null

    const addToDoPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            newToDo.id = Math.max(...db.map((el) => el.id)) + 1
            newToDo.id = newToDo.id < 0 ? 0 : newToDo.id
            db.push(newToDo)
            resolve(newToDo)
        }, 0)
    })
    .then((res) => {
        addTaskToUI(res)
    })
    console.log(addToDoPromise)
}

function addTaskToUI(element){
    console.log(element)
    let task = document.createElement("li")
    
    let taskConainter = document.createElement("div")
    let taskName = document.createTextNode(element.taskName)
    taskConainter.appendChild(taskName)
    
    task.appendChild(taskConainter)
    let taskStatus = document.createElement("div")
    let taskStatusText = document.createTextNode("Status: " + element.status)
    taskStatus.appendChild(taskStatusText)
    task.appendChild(taskStatus)

    let deleteTaskButton = document.createElement("button")
    let deleteTaskButtonText = document.createTextNode("Sterge")
    deleteTaskButton.addEventListener("click", deleteToDo)

    deleteTaskButton.appendChild(deleteTaskButtonText)

    let updateTaskButton = document.createElement("button")
    let updateTaskButtonText = document.createTextNode("Modifica")
    updateTaskButton.appendChild(updateTaskButtonText)

    deleteTaskButton.id = "DEL_BTN_" + element.id
    deleteTaskButton.className = "DEL_BTN"
    updateTaskButton.id = "UPD_BTN_" + element.id


    task.appendChild(updateTaskButton)
    task.appendChild(deleteTaskButton)

    task.id = element.id
    task.className = "task"

    document.getElementById("myTasks").appendChild(task)

}

//stergere to-d0
let delButtons = Array.from(document.getElementsByClassName("DEL_BTN"))
delButtons.forEach(delButton => {
    delButton.addEventListener("click", 
        deleteToDo)
    
})

function deleteToDo(e){
    if(checkCredentials(credentials.username, credentials.password) === "authorized"){

    let id = e.target.id.split("_")[2]
    console.log(id)
    const deleteToDoPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            db = db.filter((el) => el.id != id)
            resolve(id)
        },0)
    })
    .then((res) => {
        document.getElementById(res).remove()
        console.log(document.querySelectorAll("li.task").length)
        if(document.querySelectorAll("li.task").length == 0){
            document.getElementById("info").innerText = "No tasks"
        }
    })
}
else{
    document.getElementById("info").innerText = "You are not authorized"
}
}

function showNoElementMessage(){
    let noElementMessage = document.createElement("p")
    let noElementMessageText = document.createTextNode("Nu aveti nici un task")
    noElementMessage.appendChild(noElementMessageText)
    document.getElementById("myTasks").appendChild(noElementMessage)
}

//to-do update task