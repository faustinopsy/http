export default class LoginComponent {
    constructor() {
    }

    template() {
        return `
        <div class="content-container">
            <div class="card">
                <form id="loginForm">
                    <label for="username">Nome de usuário:</label><br>
                    <input type="text" id="username" name="username"><br>
                    <label for="password">Senha:</label><br>
                    <input type="password" id="password" name="password"><br><br>
                    <input type="submit" value="Login">
                </form>
            </div>
        </div>
        `;
    }

    attachEventListeners() {
        document.getElementById('loginForm').addEventListener('submit', this.login.bind(this));
    }

    login(event) {
        event.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
    
        fetch('/backend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    throw new Error('Não autorizado');
                } else {
                    throw new Error('Sem rede ou não conseguiu localizar o recurso');
                }
            }
            return response.json();
        })
        .then(data => {
            if(data.token){
                localStorage.setItem('token', data.token);
                alert('Login bem-sucedido!');
                window.location.hash = '#/todos';
            } else {
                alert('Erro: ' + data.error);
            }
        })
        .catch(error => alert('Erro na requisição: ' + error));
    }
}
