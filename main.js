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

  },
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/blanton',
  },
  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);
    $el.prepend(template);
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
};

/***TESTING USERNAME***/


var usernames = {

  init: function () {
    usernames.initStyling();
    usernames.initEvents();
  },
  initStyling: function () {
    usernames.renderUsernames();
  },
  initEvents: function () {
    $('#createUsername').on('submit', function (event) {
      event.preventDefault();
        var newUsername = {
          title: $(this).find('input[name="newTitle"]').val(),
        };
        $('input').val("");
        $('textarea').val("");
        usernames.createUsername(newUsername);
    });
  },
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/blanton',
  },
  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);
    $el.prepend(template);
  },
  renderTasks: function () {
    $.ajax({
      url: usernames.config.url,
      type: 'GET',
      success: function (usernames) {
        console.log(usernames);
        var template = _.template($('#usernameTmpl').html());
        var markup = "";
        usernames.forEach(function (item, idx, arr) {
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
  createTask: function (username) {
    $.ajax({
      url: usernames.config.url,
      data: username,
      type: 'POST',
      success: function (data) {
        console.log(data);
        tasks.renderUsernames();
      },
      error: function (err) {
        console.log(err);
      },
    });
  },
};
