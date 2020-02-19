var webSocket = require('ws');

// var  con=require('conn');


var server = webSocket.Server;
var socket = new server({port: 7070});
var boot = {
    'wel': "welcome",
    'how': "how are you"
    // 'how': "how are you",
    // etc.
};

var badWord=[];
badWord.push('zzzz');
badWord.push('ssss');
badWord.push('cccc');


var users = [];

var oldMessages = [];
socket.on('connection', function (ws) {
    console.log('connection established ');
    var conn = 0;
    var clintName = '';


    ws.on('message', function (message) {

        var array = message.split(" ");

        message='';
        for (var i=0;i<array.length;i++)
        {

            var temp=0;
            for (var j=0;j<badWord.length ;j++)
            {
                if(badWord[j]==array[i])
                    temp=1;

            }

            var message_id=boot[array[i]];
            if(message_id)
                array[i]=boot[array[i]];

            if(temp==0)
                message+=array[i]+' ';

        }


        // console.log(message);

        if (conn == 0) {

            clintName = message;
            var temp = 0;
            for (var i = 0; i < users.length; i++) {
                if (message == users[i])
                    temp = 1;
            }

            if (temp==1)
            {
                ws.send("0");
            }
            else
            {
                conn = 1;

                users.push(message);

                socket.clients.forEach(function (c) {
                    c.send('<li  class="join" style="color:red" >' + clintName + '  : jonin to chat </li> ');


                    // c.send('<span style="color:blue">'+clintName + '  jonin to chat' +'</span>');
                });
                oldMessages.push('<li  class="join" style="color:red" >' + clintName + '  : jonin to chat </li> ');

            }

        } else {

            socket.clients.forEach(function (c) {
                if(c==ws)
                {
                    c.send('<li  class="sender" style="color:red" >' + clintName + '  : ' + message+'</li>');

                }
                else
                {
                    c.send('<li  class="resiver" style="color:red" >' + clintName + '   : ' + message+'</li>');

                }
                oldMessages.push('<li  class="resiver" style="color:red" >' + clintName + '  : ' + message+'</li>');

            });

        }
        // oldMessages.forEach(function (old) {
        //     ws.send(old);
        //
        // });
    });

})