const formPartido = document.getElementById('formPartido');

formPartido.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:3024/partido'
buscarTodosPartido();
var motivoAcao = "CADASTRAR";

function gravarPartido(){
    const objetoPartido = {
        nome: document.getElementById('nome').value,
        sigla: document.getElementById('sigla').value,
        registro: document.getElementById('registro').value,
  
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPartido)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });

}

function selecionarPartido(nome, sigla, registro) {

    document.getElementById('nome').value = nome;
    document.getElementById('sigla').value = sigla;
    document.getElementById('registro').value = registro;



    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }


}

function excluirPartido(){

    fetch(enderecoAPI, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: document.getElementById('nome').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function atualizarPartido(){

    const objetoPartido = {
        nome: document.getElementById('nome').value,
        sigla: document.getElementById('sigla').value,
        registro: document.getElementById('registro').value
    
    }


    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPartido)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });

}

function buscarTodosPartido(){
    fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaPartido(respostaAPI.listaPartido);
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    })
    .catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function validarCampos(evento){

    const nome = document.getElementById('nome').value;
    const sigla = document.getElementById('sigla').value;
    const registro = document.getElementById('registro').value;


    //impedem que o navegador continue o processo de submissão do formulário
    evento.stopPropagation();
    evento.preventDefault();

    if (nome && sigla && registro) {
        if (motivoAcao == "CADASTRAR"){
            gravarPartido();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarPartido();
            motivoAcao = "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirPartido();
            motivoAcao = "CADASTRAR";
        }
        
        formPartido.reset();
        buscarTodosPartido();
        return true;
    }
    else{
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }
}


function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function exibirTabelaPartido(listaPartido){
    console.log(listaPartido);
    if (listaPartido.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Sigla</th>
                <th>Numero de Registro</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const partido of listaPartido) {
            const linha = document.createElement('tr');  
            linha.innerHTML = `
                <td>${partido.nome}</td>
                <td>${partido.sigla}</td>
                <td>${partido.registro}</td>

                <td>
                    <button onclick="selecionarPartido('${partido.nome}','${partido.sigla}','${partido.registro}','EDITAR')">Alterar</button>
                    <button onclick="selecionarPartido('${partido.nome}','${partido.sigla}','${partido.registro}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML="";
        espacoTabela.appendChild(tabela);
    }
    else{
        exibirMensagem('Nenhum partido encontrado.');
    }
}