$(window).load(function () {
    var Ector = require('ector');
    var ector = new Ector();
    var previousResponseNodes = null;
    var user = { username: "Guy"}
    var msgtpl = $('#msgtpl').html();
    var lastmsg = false;
    $('#msgtpl').remove();
    var message;

    $('#send').on('click', function () {
        var d = new Date();
        var entry = $('#message').val();
        message = {
            user: user,
            message: entry,
            h: d.getHours(),
            m: d.getMinutes()
        };
        $('#message').value = ''; // FIXME

        $('#messages').append('<div class="message">' + Mustache.render(msgtpl, message) + '</div>');
        $('#messages').animate({scrollTop : $('#messages').prop('scrollHeight')}, 500);

        ector.addEntry(entry);
        ector.linkNodesToLastSentence(previousResponseNodes);
        var response = ector.generateResponse();
        // console.log('%s: %s', ector.name, response.sentence);
        previousResponseNodes = response.nodes;

        d = new Date();
        message = {
            user: {username: ector.name},
            message: response.sentence,
            h: d.getHours(),
            m: d.getMinutes()
        };
        $('#messages').append('<div class="message">' + Mustache.render(msgtpl, message) + '</div>');
        $('#messages').animate({scrollTop : $('#messages').prop('scrollHeight')}, 500);
    });
});