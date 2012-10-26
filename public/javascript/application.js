var room = {
  init: function(){
    var room = this;
    room.input = $('textarea');
    room.board = $('#board');
    room.members = $('.members ul');

    room.input.keypress(this.sendMessage);
    room.owner = prompt('Qual o seu nome?');
    room.open();
  },
  open: function(){
    var room = this;
    room.socket = io.connect('http://localhost:8080');

    room.socket.on('connect', function () {
      room.socket.emit('new',{ name: room.owner }, room.setMembersList);
    });

    room.socket.on('new', room.appendNewMember);
    room.socket.on('leave', room.dropMember);
    room.socket.on('message',room.printMessage);
  },
  setMembersList: function(members){
    $.each(members, function(index, member){
      room.appendNewMember({id: index, who: member});
    });
  },
  appendNewMember: function(info) {
    var li = $('<li>', { id: info.id }).text(info.who);
    room.members.append(li);
  },
  dropMember: function(info){
    room.members.find("li#"+info.id+"").remove();
    room.printMessage(info.message);
  },
  printMessage: function(message) {
    var newMessage = $('<dl>');
    var authorTag = $('<dt>').html(message.author);
    var messageTag = $('<dd>').html(message.message);

    newMessage
      .append(authorTag)
      .append(messageTag);

    room.board.append(newMessage);
  },
  sendMessage: function(event) {
    var message = { author: room.owner, message: $(this).val() };

    if (event.which == 13) {
      event.preventDefault();
      room.socket.json.send(message);
      room.printMessage(message);

      $(this).val('');
    }
  }
};

$(function() {
  room.init();
});