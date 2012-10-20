var room = {
  sendMessage: function() {
    var input = $('textarea');
    
    var newLine = $('<dl></dl>');
    var author = $('<dt></dt>');
    var message = $('<dd></dd>');

    author.html('Eu');
    message.html(input.val());
    newLine.append(author);
    newLine.append(message);

    $('#board').append(newLine);

    input.val("");
  }
};

$(function() {
  $("textarea").keypress(function(event) {
    if ( event.which == 13 ) {
      room.sendMessage();
      return false;
    }
  });
});