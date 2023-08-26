document.getElementById('submitButton').addEventListener('click', createUser);

function createUser() {
    const nomeUsuario = document.getElementById('username').value;

    if (!nomeUsuario) {
        alert("Por favor, insira um nome!");
        return;
    }

    const usuario = {
        nome: nomeUsuario
    };

    fetch('/backend/usuario', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Sem rede ou não conseguiu localizar o recurso');
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            alert('Usuário já existe')
        }else{
            alert("Usuário criado: " + JSON.stringify(data));
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
