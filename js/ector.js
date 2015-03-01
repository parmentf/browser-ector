$(window).load(function () {
    var load = $('#load');
    var save = $('#save');
    var name = $('#name');

    if (!localStorage) {
        load.remove();
        save.remove();
    }
    else {
        save.hide();
        if (typeof localStorage.ector === 'undefined') {
            load.hide();
        }
    }

    var Ector = require('ector');
    ector = window.ector = new Ector();
    var previousResponseNodes = null;
    var user = { username: ector.username};
    var msgtpl = $('#msgtpl').html();
    var lastmsg = false;
    $('#msgtpl').remove();
    var message;
    $('#name').attr('value', user.username);

    $('#send').on('click', function () {
        if (localStorage) { save.show(); load.show(); }
        var d = new Date();
        var entry = $('#message').val();
        message = {
            user: user,
            message: entry,
            h: d.getHours(),
            m: d.getMinutes()
        };
        $('#message').attr('value','');

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
        return false;
    });

    save.on('click', function () {
        localStorage.setItem('ector', JSON.stringify(ector.cn));
        load.hide();
        save.hide();
        alert('ECTOR saved.');
        return false;
    });

    load.on('click', function () {
        var cn = window.cn = localStorage.ector;
        ector.cns = {};
        var newCN = Object.create(require('concept-network').ConceptNetwork.prototype);
        Object.merge(newCN, JSON.parse(cn));
        ector.cn = newCN;
        ector.setUser(ector.username);
        load.hide();
        alert('ECTOR loaded.');
        return false;
    });

    name.on('change', function () {
        ector.setUser(name.attr('value'));
        user.username = ector.username;
    });
});
