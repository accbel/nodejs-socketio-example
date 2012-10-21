var room = {
  init: function(){
    var room = this;

    this.input = $('textarea');
    this.board = $('#board');
    this.members = $('.members ul');

    this.input.keypress(function(){
      if ( event.which == 13 ) {
        room.sendMessage();
        return false;
      }
    });

    room.owner = prompt('Qual o seu nome?');

    room.open();
  },
  open: function(){
    var room = this;
    room.socket = io.connect('http://localhost:8080');

    room.socket.on('connect', function () {
      room.socket.emit('new',{name: room.owner},function(clients){
        room.setMembersList(clients);
      });
    });

    room.socket.on('new',function(who){
      room.appendNewMember(who);
    });

    room.socket.on('leave',function(who){
      room.dropMember(who);
    });

    room.socket.on('message',function(update){
      room.printMessage(update.author,update.message);
    });
  },
  setMembersList: function(members){
    var list = '';
    for (var i in members) {
      list += '<li>'+members[i]+'</li>';
    };

    this.members.html(list);
  },
  appendNewMember: function(who) {
    this.members.append('<li>'+who+'</li>');
  },
  dropMember: function(who){
    this.members.find("li:contains('"+who+"')").remove();
  },
  printMessage: function(author,message) {
    var newMessage = $('<dl></dl>');
    var authorTag = $('<dt></dt>');
    var messageTag = $('<dd></dd>');

    authorTag.html(author);
    messageTag.html(message);
    newMessage.append(authorTag);
    newMessage.append(messageTag);

    this.board.append(newMessage);
  },
  sendMessage: function() {
    var message = this.input.val();

    this.socket.json.send({author: this.owner,message: message});
    this.printMessage(this.owner,message);

    this.input.val('');
  }
};

$(function() {
  room.init();
});