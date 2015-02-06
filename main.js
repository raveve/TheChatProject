$(document).ready(function () {
  chat.init();
  // chat.deleteMessage("54d5021eb1cce4030000003e");

  setInterval(function (){
    chat.renderMessages();
  }, 1000);

});

function populateStorage() {
  localStorage.setItem('article');
};

var chat = {

  init: function () {
    chat.initStyling();
    chat.initEvents();
  },

  initStyling: function () {
    chat.renderMessages();
  },

  initEvents: function () {

    $('#createMessage').on('submit', function (event) {
      event.preventDefault();
      console.log("submit working");
      var newMessage = {
        user: $(this).find('input[name="userName"]').val(),
        message: $(this).find('input[name="newMessage"]').val()
      };
      console.log(newMessage);

      chat.createMessage(newMessage);

    });

    $('section').on('click', '.delete-message', function (event) {
      event.preventDefault();
      var taskId = $(this).closest('article').data('taskid');
      console.log(taskId);
      chat.deleteMessage(taskId);
    });

  },

  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/snoopy',
  },

  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

    $el.appendChild(template);
  },

  renderMessages: function () {
    $.ajax({
      url: chat.config.url,
      type: 'GET',
      success: function (chat) {
        console.log(chat);
        var template = _.template($('#mssgTmpl').html());
        var markup = "";
        chat.forEach(function (message, idx, arr) {
          markup += template(message);
        });
        console.log('markup is.....', markup);
        $('section').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  createMessage: function (message) {
    console.log(message);

    $.ajax({
      url: chat.config.url,
      data: message,
      type: 'POST',
      success: function (data) {
        console.log(data);
        chat.renderMessages();

        // Clears the message field on submit
        $('input.message-input').val('');
      },
      error: function (err) {
        console.log(err);
      },
    });

  },

  deleteMessage: function (id) {

    $.ajax({
      url: chat.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
      console.log(data);
      chat.renderMessages();
    },
      error: function (err) {
      console.log(err);
    }
  });

 }

};
