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
      deleteTodoEvent(e.target.getAttribute("data-id"));
    }),
    $('.todo_list').on('click', '.complete', function(e) {
      e.preventDefault();
      updateTodoEvent(e.target.getAttribute("data-id"));
    }),
    $('.todo_list').on('click', '.complete', function(e) {
      e.preventDefault();
      updateTodoEvent(e.target.getAttribute("data-id"));
    })
  }

function newTodoEvent(form){
    $.ajax({
         url   : form.getAttribute('action'),
         type  : form.getAttribute('method'),
         data  : {todo_content: $('#todo_content').val()},
         dataType: 'json',
         success: function(response){
            createTodo(response.todo.todo_content, response.todo.id);
         }
    });
};

function deleteTodoEvent(id) {
     $.ajax({
         url   : '/todos/' + id,
         type  : 'delete',
         success: function(){
            deleteTodo(id);
         }
    });
};

function updateTodoEvent(id) {
     $.ajax({
         url   : '/todos/' + id,
         type  : 'patch',
         success: function(){
            completeTodo(id);
         }
    });
};


function createTodo(todo_content, id) {
  todo = new Todo(todo_content, id);
  todo.add() ;
};

function deleteTodo(id) {
  $('.delete[data-id=' + id +']').parents('.todo').remove()
};

function completeTodo(id) {
  $('.complete[data-id=' + id +']').parents('.todo').addClass('complete');
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
    return $template;
  };

  Todo.prototype.add = function() {
    $('.todo_list').css('display', 'block').append(this.build());
  };

