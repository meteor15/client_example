<script type="text/javascript">
    var request = {$request}, currentColor = '';
    request.color = 1;
</script>
<div class="b-chat-head-title">{translate text='S_CHAT_TITLE'}</div>
<div class="b-loading-field" id="message_field"></div>
<div class="b-chat-send">
    <div class="b-chat-send-text-line">
        <textarea id="message" placeholder="{translate text='S_SEND_MESSAGE'}" class="b-chat-send-text-line-area"></textarea>
    </div>
    <div id="chat_settings" class="b-chat-settings">
        <div class="b-chat-settings-field">
            <div class="b-chat-settings-field-head">{translate text='S_CHAT_PARAMETERS'}</div>
            {for $i = 1; $i <= 10; $i++}
                <div class="b-chat-settings-field-cell">
                    <div class="b-chat-settings-field-cell-color b-chat-settings-color-{$i}" id="color_{$i}"></div>
                </div>
            {/for}
            <div class="b-chat-settings-field-time">
                <input type="checkbox" id="times_show" />
                <span class="b-chat-settings-field-time-text">{translate text='S_TIME_SHOW'}</span>
            </div>
        </div>
    </div>
    <div class="b-chat-buttons">
        <div class="b-chat-buttons-left">
            <div id="settings_button" class="b-chat-settings-button"></div>
        </div>
        <div class="b-chat-buttons-right">
            <button class="b-chat-send-right-button" id="send" disabled >
                {translate text='S_SEND_CHAT'}
            </button>
        </div>
    </div>
</div>
