(function() {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  function ToDoList(toDoInput, toDoList) {
    this.toDoInput = toDoInput;
    this.toDoList = toDoList;
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
      var self = this;

      this.toDoItems.forEach(function(toDo) {
        self.addToDo(toDo);
      });
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
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    var toDoInput = document.querySelector('header input');
    var toDoList = document.querySelector('section ul');

    new ToDoList(toDoInput, toDoList);
  }, false);
})();
