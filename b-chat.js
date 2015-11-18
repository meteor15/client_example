var timer, may_scroll = true;

$('#message').keydown(
    function (event) {
        if (event.keyCode == 13) {
            !$('#send').prop('disabled') && $('#send').click();
            return false;
        } else if ($('#message').val().length > 0) {
            clearTimeout(timer);
        } else {
            startUpdate();
        }
    }
).keyup(
    function (event) {
        event.keyCode == 13 && $('#message').val('');
    }
);

$('#send').click(
    function () {
        clearInterval(timer);
        request.text = $('#message').val();
        $('#message').val('');
        if (request.text != '') {
            $.get('message.php', request, updateChat, 'JSON');
        }
    }
);

function update() {
    $.get('chat.php', request, updateChat, 'JSON').fail(startUpdate);
}

function updateChat(data) {
    var date, dateString, field = $('#message_field').html();
    for (i in data.messages) {
        var date = new Date(data.messages[i].time *1000);
        dateString = correctDateNumber(date.getHours()) + ':' + correctDateNumber(date.getMinutes());
        field += '<div class="b-chat-field-message"><span class="b-chat-field-message-time'
        + ($('#times_show').prop('checked') ? ' b-chat-field-message-time-check' : '') +'">' + dateString
        + ' </span>' + '<span class="b-chat-field-message-name b-chat-message-color-' + data.messages[i].color + '">'
        + data.messages[i].name + '</span>: <span class="b-chat-field-message-text">' + data.messages[i].text
        + '</span></div>';
    }
    request.max_time = data.max_time;
    may_scroll && $('#message_field').html(field).scrollTop($('#message_field').height());
    if ($('#message_field').hasClass('b-loading-field')) {
        $('#message_field').removeClass('b-loading-field').addClass('b-chat-field');
        $('#send').prop('disabled', false);
    }
    startUpdate();
}

function startUpdate() {
    clearTimeout(timer);
    timer = window.setTimeout('update()', 5000);
}

$('#message_field').ready(function () {
    $('#message_field').scrollTop($('#message_field').height());
}).mouseleave(function() {may_scroll = true}).mousemove(function() {may_scroll = false});

$('#settings_button').click(
    function () {
        $('#chat_settings').css(
            'visibility', function(i, visibility) {
                return (visibility == 'visible') ? 'hidden' : 'visible';
        });
    }
);

$('.b-chat-settings-field-cell-color').click(
    function () {
        request.color = $(this).attr('id').replace('color_', '');
        $('#settings_button').click();
    }
);

$('#times_show').click(
    function() {
        if ($(this).prop('checked')) {
            $('.b-chat-field-message-time').css({'visibility': 'visible', position: 'relative'})
                .removeClass('b-chat-field-message-time-check');
        } else {
            $('.b-chat-field-message-time').css({'visibility': 'hidden', position: 'absolute'})
                .removeClass('b-chat-field-message-time-check');
        }

    }
);

function correctDateNumber(number)
{
    number = parseInt(number);
    if (number < 10) {
        number = '0' + number;
    }
    return number;
}


$(document).ready(update());
