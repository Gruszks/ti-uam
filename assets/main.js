(function(window) {
  document.addEventListener('DOMContentLoaded', function() {
    var input = document.querySelector('header input');
    var container = document.querySelector('section');

    new window.ToDoList(input, container);
  }, false);
})(window);
