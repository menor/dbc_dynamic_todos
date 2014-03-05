$(function() {
  bindEvents();
});

var todoTemplate = $.trim($('#todo_template').html());

function bindEvents() {
    $('.submitToDoContent').on('click', function(e) {
      e.preventDefault();
      newTodoEvent(e.target.parentNode);
    }),
    $('.todo_list').on('click', '.delete', function(e) {
      e.preventDefault();
      console.log(this.getAttribute("data-id"));
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
            createTodo(response.todo.todo_content, response.todo.id);
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
    $template.find('.delete').attr("data-id", this.id);
    $template.find('.complete').attr("data-id", this.id);
    // $template.find('.delete').on('click', function() {this.deleteTodo});
    // $template.find('.complete').on('click', function() {this.completeTodo});
    return $template;
  };

  Todo.prototype.add = function() {
    $('.todo_list').css('display', 'block').append(this.build());
  };


// $template.find('.delete').attr('href', this.id)