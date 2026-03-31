const localStorageKey = 'to-do-list-gn'

function validateIfExistsNewTask()
{
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    if(!input.value)
    {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
    }
    else if(input.value.length < 3)
    {
        alert('A tarefa deve ter no mínimo 3 caracteres')
    }
    else if(validateIfExistsNewTask())
    {
        alert('Já existe uma task com essa descrição')
    }
    else
    {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

        values.push({
            name: input.value,
            done: false,
            date: new Date().toLocaleDateString()
        })

        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }

    input.value = ''
}

function markAsDone(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)

    values[index].done = !values[index].done

    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

function updateCounter()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    document.getElementById('task-counter').innerText =
        `Total de tarefas: ${values.length}`
}

function showValues()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''

    for(let i = 0; i < values.length; i++)
    {
        let isDone = values[i].done ? 'class="done"' : ''

        list.innerHTML += `
        <li ${isDone}>
            <div>
                ${values[i]['name']}
                <br>
                <small>${values[i]['date']}</small>
            </div>

            <div>
                <button onclick='markAsDone("${values[i]['name']}")'>
                    ✔
                </button>

                <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>
                    ❌
                </button>
            </div>
        </li>`
    }

    updateCounter()
}

function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    if(values.length === 0)
    {
        alert('Não há tarefas para remover')
        return
    }

    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)

    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()

document.getElementById('input-new-task')
.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        newTask()
    }
})