export default class UsersListComponent {
    constructor() {
        this.token = localStorage.getItem('token');
    }

    template() {
        return `
        <div class="content-container">
            <div class="card">
                <button id="getAllButton">Recuperar Todos os Usuários</button>
                <div id="usersList"></div>
            </div>
        </div>
        `;
    }

    attachEventListeners() {
        document.getElementById('getAllButton').addEventListener('click', this.getAll.bind(this));
        this.getAll();
    }

    getAll() {
        fetch('/backend/usuario', {
            method: 'GET',
            headers: {
                'Authorization': this.token,
            },
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    window.location.hash = '#/';
                    throw new Error('Não autorizado');
                } else {
                    throw new Error('Sem rede ou não conseguiu localizar o recurso');
                }
            }
            return response.json();
        })
        .then(data => {
            this.displayUsers(data);
        })
        .catch(error => alert('Erro na requisição: ' + error));
    }

    displayUsers(data) {
        const users = data.usuarios;  
        const usersDiv = document.getElementById('usersList');
        usersDiv.innerHTML = ''; 

        const list = document.createElement('ul');
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.id} - ${user.nome} - ${user.type}`;
            list.appendChild(listItem);
        });

        usersDiv.appendChild(list);
    }
    
}