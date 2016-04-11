(function(window) {
  var ENTER_KEY = 13;

  function ToDoList(input, container) {
    this.toDoInput = input;
    this.toDoListContainer = container;
    this.initialize();
  }

  ToDoList.prototype = {

    initialize: function() {
      this.toDoItems = this.getToDoList();
      this.restoreToDoList();
      this.bindToDoInput();
    },

    bindToDoInput: function() {
      var self = this;
      var input = this.toDoInput;

      input.addEventListener('keypress', function(e) {
        if (e.which === ENTER_KEY && input.value) {
          self.addToDo({
            text: input.value,
            done: false,
          }, true);

          input.value = '';
        }
      }, false);
    },

    restoreToDoList: function() {
      this.toDoList = document.createElement('ul');
      this.toDoListContainer.appendChild(this.toDoList);
      this.toDoItems.forEach(function(toDo) {
        this.addToDo(toDo);
      }, this);
    },

    getToDoList: function() {
      if (!localStorage.toDoItems) {
        return [];
      }

      return JSON.parse(localStorage.toDoItems);
    },

    saveToDoList: function() {
      localStorage.toDoItems = JSON.stringify(this.toDoItems);
    },

    addToDo: function(toDo, save) {
      var input = document.createElement('input');
      var label = document.createElement('label');
      var li = document.createElement('li');
      var text = document.createTextNode(' ' + toDo.text);

      input.type = 'checkbox';

      if (toDo.done) {
        li.classList.add('done');
        input.checked = true;
      }

      label.appendChild(input);
      label.appendChild(text);
      li.appendChild(label);
      this.bindToDoItem(li, input, toDo);
      this.toDoList.appendChild(li);

      if (save) {
        this.toDoItems.push(toDo);
        this.saveToDoList();
      }
    },

    bindToDoItem: function(li, input, toDo) {
      var self = this;

      input.addEventListener('click', function(e) {
        toDo.done = li.classList.toggle('done');
        self.saveToDoList();
      }, false);
    }
  }

  // Export lib.
  window.ToDoList = ToDoList;
})(window);
