const formCandidato = document.getElementById('formCandidato');


const enderecoAPI = 'http://localhost:3024/candidato'
buscarTodosCandidato();
var motivoAcao = "CADASTRAR";

function gravarCandidato(){
    const objetoCandidato = {
        nome: document.getElementById('nome').value,
        partido: document.getElementById('partido').value,
        numero: document.getElementById('numero').value,
  
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
    const botaoConfirmed = document.getElementById('botaoConfirmed');
    if (motivoAcao == 'EDITAR') {
        botaoConfirmed.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoConfirmed.innerHTML = 'EXCLUIR';
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
            exibirTabelaCandidato(respostaAPI.listaCandidato);
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



    evento.stopPropagation();
    evento.preventDefault();

    if (nome && partido && numero) {
        if (motivoAcao == "CADASTRAR"){
            gravarCandidato();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarCandidato();
            motivoAcao = "EDITAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirCandidato();
            motivoAcao = "EXCLUIR";
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


function exibirTabelaCandidato(listaCandidato) {
    console.log("exibirTabelaCandiato", listaCandidato);
    if (listaCandidato.length > 0) {
      const espacoTabela = document.getElementById("containerTabela");
      const tabela = document.createElement("table");
      tabela.classList = "table table-striped table-hover";
      const cabecalho = document.createElement("thead");
      cabecalho.innerHTML = `
              <tr>
                  <th>Nome</th>
                  <th>Partido</th>
                  <th>Numero do Candidato</th>  
              </tr>
          `;
      const corpo = document.createElement("tbody");
      for (const candidato of listaCandidato) {
        const linha = document.createElement("tr");
        linha.innerHTML =
          "<td>" +
          candidato.nome +
          "</td>" +
          "<td>" +
          candidato.partido +
          "</td>" +
          "<td>" +
          candidato.numero +
          "</td>" +
          `<td>
                      <button id="EDIT" onclick="selecionarCandidato('${candidato.nome}','${candidato.partido}','${candidato.numero}','EDITAR')">EDITAR</button>
                      <button id="EXCLU" onclick="selecionarCandidato( '${candidato.nome}','${candidato.partido}','${candidato.numero}','EXCLUIR')">EXCLUIR</button>
                  </td>
              `;
        corpo.appendChild(linha);
      }
      tabela.appendChild(cabecalho);
      tabela.appendChild(corpo);
      espacoTabela.innerHTML = "";
      espacoTabela.appendChild(tabela);
    } else {
      exibirMensagem("Nenhum candidato encontrado.");
    }
  }
  
  function carregarPartidos() {
  

    fetch('http://localhost:3024/partido')
             .then((resposta) => {
             return resposta.json();
      })
        .then((partido) => {
            const selectPartidos = document.getElementById('partido-select');
            // Limpa o select antes de preencher
             selectPartidos.innerHTML = '';
            // Adiciona uma opção padrão
            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.text = 'Selecione um partido';
             selectPartidos.appendChild(optionDefault);
             // Preenche o select com os partidos retornados
           for (let i = 0; i < partido.length; i++) {
             const option = document.createElement('option');
                 option.value = partido[i].nome;
                option.text = partido[i].nome;
                selectPartidos.appendChild(option);
             }
         })
        .catch((erro) => {
             console.error('Erro:', erro.message);
        });
}
