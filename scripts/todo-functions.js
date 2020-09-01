'use strict'
//Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
};

//save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

//remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id;
    });

    console.log(todoIndex);

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
};

//render application todos based on filters
const renderTodos = (todos, filters) => {
    document.querySelector('#date').innerHTML = new Date().toDateString();

    const todoEl = document.querySelector('#todos');

    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleteMatch = !filters.hideCompleted || !todo.completed;

        return searchTextMatch && hideCompleteMatch;
    });

    const incompleteTodos = filteredTodos.filter((todo) => {
        return !todo.completed;
    });

    todoEl.innerHTML = '';
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo));
        })
    } else {
        const messageEl = document.createElement('p');
        messageEl.classList.add('empty-message');
        messageEl.textContent = 'There are no todos to show off';
        todoEl.appendChild(messageEl);
    }

};

//toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id == id;
    });

    if (todo !== undefined) {
        todo.completed = !todo.completed;
    }
};

//get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkboxEl = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button');

    //setup todo checkbox
    checkboxEl.setAttribute('type', 'checkbox');
    checkboxEl.checked = todo.completed;
    containerEl.appendChild(checkboxEl);
    checkboxEl.addEventListener('change', () => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    //setup todo text
    todoText.textContent = todo.text;
    containerEl.appendChild(todoText);

    //setup conatainer
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    //setup the remove button
    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text');
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    return todoEl;
};

//get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2');
    const plural = incompleteTodos.length === 1 ? '' : 's';
    summary.classList.add('list-title');
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left.`;
    return summary;
};
