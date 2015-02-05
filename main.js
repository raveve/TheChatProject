$(document).ready(function () {
  tasks.init();

});


var tasks = {

  init: function () {
    tasks.initStyling();
    tasks.initEvents();

  },
  initStyling: function () {
    tasks.renderTasks();
  },
  initEvents: function () {

    $('section').on('click', '.showEditTask', function (event) {
      event.preventDefault();
      $(this).closest('article').find('.editTask').toggleClass('show');
    });

    $('section').on('submit', '.editTask', function (event) {
      event.preventDefault();
      var taskId = $(this).closest('article').data('taskid');
      var editedTask = {
        title: $(this).find('input[name="editTitle"]').val(),
      };

      tasks.updateTask(taskId, editedTask);


    });

    $('#createTask').on('submit', function (event) {
      event.preventDefault();
        var newTask = {
          title: $(this).find('input[name="newTitle"]').val(),
        };
        $('input').val("");
        $('textarea').val("");
        tasks.createTask(newTask);
    });

    $('section').on('click', '.deleteTask', function (event) {
      event.preventDefault();
       var taskId = $(this).closest('article').data('taskid');
       console.log(taskId);
       tasks.deleteTask(taskId);
    });

    $('section').on('click', '.completeTask', tasks.completeTask);

  },
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/catchat',

  },
  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

    $el.appendChild(template);
  },
  renderTasks: function () {
    $.ajax({
      url: tasks.config.url,
      type: 'GET',
      success: function (tasks) {
        console.log(tasks);
        var template = _.template($('#taskTmpl').html());
        var markup = "";
        tasks.forEach(function (item, idx, arr) {
          markup += template(item);
        });
        console.log('markup is.....', markup);
        $('section').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  createTask: function (task) {

    $.ajax({
      url: tasks.config.url,
      data: task,
      type: 'POST',
      success: function (data) {
        console.log(data);
        tasks.renderTasks();
      },
      error: function (err) {
        console.log(err);
      },
    });

  },
  deleteTask: function (id) {

    $.ajax({
      url: tasks.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        tasks.renderTasks();
      },
      error: function (err) {
        console.log(err);
      }
    });



  },
  completeTask: function (event) {

  $(this).siblings("h3").css("text-decoration", "line-through");

  },

  updateTask: function (id, task) {

    $.ajax({
      url: tasks.config.url + '/' + id,
      data: task,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        tasks.renderTasks();
      },
      error: function (err) {
        console.log(err);
      }
    });


  },

};
