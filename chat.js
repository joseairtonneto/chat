const socket = io('https://internet-web-chat.herokuapp.com:' + process.env.PORT);

let user = null;

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages)
})

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>'
    messages.forEach(message=>{
        list_messages += `<li><strong>${message.user}:</strong> ${message.msg}</li>`
    })
    list_messages += `</ul>`

    div_messages.innerHTML = list_messages
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if(!user){
            alert("Defina um usuario");
            return;
        }

        const message = document.forms['message_form_name']['msg'].value;
        document.forms['message_form_name']['msg'].value = '';
        socket.emit('new_message', {user: user, msg: message})
        console.log(message)
    })

    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        user = document.forms['user_form_name']['user'].value;
        userForm.parentNode.removeChild(userForm);
    })
})
