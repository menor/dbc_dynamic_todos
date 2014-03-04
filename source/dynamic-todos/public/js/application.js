$(function() {
  bindEvents();
});

var todoTemplate = $.trim($('#todo_template').html());

function bindEvents() {
    $('.submitToDoContent').on('click', function(e) {
      e.preventDefault();
      newTodoEvent(e.target.parentNode);
    })
  }

function newTodoEvent(form){
    $.ajax({
         url   : form.getAttribute('action'),
         type  : form.getAttribute('method'),
         data  : {todo_content: $('#todo_content').val()},
         dataType: 'json',
         // context: this,
         success: function(response){
            createTodo(response.todo.todo_content, response.todo.id)
            // todo = new Todo(response.todo.todo_content, response.todo.id);
            // todo.add ;
            // todo.build ;
         }
    });
};

function createTodo(todo_content, id) {
  todo = new Todo(todo_content, id);
  todo.add() ;
};


function Todo(todoContent, todoId) {
    this.id = todoId;
    this.todoContent = todoContent;
    this.template = $.trim($('#todo_template').html());
  };

  Todo.prototype.build = function() {
    var $template = $(this.template);
    $template.find('h2').text(this.todoContent);
    $template.find('.delete');
    $template.find('.complete');
    // $template.find('.delete').on('click', function() {this.deleteTodo});
    // $template.find('.complete').on('click', function() {this.completeTodo});
    return $template;
  };

  Todo.prototype.add = function() {
    $('.todo_list').css('display', 'block').append(this.build());
  };
