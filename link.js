let name=window.prompt('请输入您的姓名:','小明')
let user=document.getElementById('user')
user.value=name
username=user.value===''?'':`?username=${user.value}`
axios.get(`http://localhost:3000/api/login${username}`).then(e => {
    if(e.data.token)localStorage.setItem('token',e.data.token)
    socketStart()
})
function socketStart() {
    var socket = io(`http://localhost:3000/`, {
        // withCredentials: true,
        extraHeaders: {
            Auth: localStorage.getItem("token"),
        },
    });

    var messages = document.getElementById("messages");
    var form = document.getElementById("form");
    var input = document.getElementById("input");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (input.value) {
            socket.emit("chat message", input.value);
            input.value = "";
        }
    });

    socket.on("chat message", function (msg) {
        var item = document.createElement("li");
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
}