const formCandidato = document.getElementById('formCandidato');

formCandidato.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:3024/candidato'

var motivoAcao = "CADASTRAR";

function gravarCandidato(){
    const objetoCandidato = {
        nome: document.getElementById('nome').value,
        sigla: document.getElementById('partido').value,
        registro: document.getElementById('numero').value,
  
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoCandidato)
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

function selecionarCandidato(nome, partido, numero) {

    document.getElementById('nome').value = nome;
    document.getElementById('partido').value = partido;
    document.getElementById('numero').value = numero;



    motivoAcao = motivo;
    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }


}

function excluirCandidato(){

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

function atualizarCandidato(){

    const objetoCandidato = {
        nome: document.getElementById('nome').value,
        partido: document.getElementById('partido').value,
        numero: document.getElementById('numero').value
    
    }


    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoCandidato)
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

function buscarTodosCandidato(){
    fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaPartido(respostaAPI.listaCandidato);
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
    const partido = document.getElementById('partido').value;
    const numero = document.getElementById('numero').value;


    //impedem que o navegador continue o processo de submissão do formulário
    evento.stopPropagation();
    evento.preventDefault();

    if (nome && partido && numero) {
        if (motivoAcao == "CADASTRAR"){
            gravarCandidato();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarCandidato();
            motivoAcao = "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirCandidato();
            motivoAcao = "CADASTRAR";
        }
        
        formCandidato.reset();
        buscarTodosCandidato();
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


function exibirTabelaCandidato(listaCandidato){
    if (listaCandidato.length > 0) {
        const espacoTabela = document.getElementById('Tabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Partido</th>
                <th>Numero do Candidato</th>
                <th>Ações</th>
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const candidato of listaCandidato) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${candidato.nome}</td>
                <td>${candidato.partido}</td>
                <td>${candidato.numero}</td>

                <td>
                    <button onclick="selecionarPartido('${candidato.nome}','${candidato.partido}','${candidato.numero}','EDITAR')">Alterar</button>
                    <button onclick="selecionarPartido('${candidato.nome}','${candidato.partido}','${candidato.numero}','EXCLUIR')">Excluir</button>
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
        exibirMensagem('Nenhum candidato encontrado.');
    }
}