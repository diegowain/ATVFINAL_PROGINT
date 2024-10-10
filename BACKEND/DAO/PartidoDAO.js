import conectar from "../DAO/conexao.js"
import Partido from "../Modelo/partido.js"
export default class PartidoDAO {

    constructor() {
        this.init();
    }


    async init() {
        try{
        const conexao = await conectar();
        const sql =`CREATE TABLE IF NOT EXISTS partido 
        (nome VARCHAR(255) PRIMARY KEY NOT NULL,
        sigla VARCHAR(255) NOT NULL,
        registro INT NOT NULL,
       );`
        await conexao.execute(sql);
        await global.poolConexoes.releaseConnection(conexao);
        console.log("O Banco de Dados foi iniciado")
        }catch(erro){
            console.log("O Banco de Dados não foi iniciado")
        }
    }

    async gravar(partido) {
        if(partido instanceof Partido){
            const conexao = await conectar();
            const sql = `INSERT INTO partido (nome, sigla, registro)
             VALUES (?, ?, ?)`
            const parametros = [
                partido.nome,
                partido.sigla,
                partido.registro
            ]
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
        }

    async alterar(partido) {

        if(partido instanceof Partido){   
            const conexao = await conectar();
            const sql = `UPDATE partido SET nome = ?, registro = ? WHERE sigla = ?`;
            const parametros = [
                partido.nome,
                partido.registro,
                partido.sigla
            ]
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }

    }

    async excluir(partido) {

        if(partido instanceof Partido){
            const conexao = await conectar();
            const sql = `DELETE FROM partido WHERE nome = ?;`;
          
            const parametros = [
                partido.nome
            ]

            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca) {
        let sql = "";
        let parametros = []
        if(termoBusca){
            sql = `SELECT * FROM partido WHERE sigla =  ? order by registro`
            parametros.push(termoBusca);

        }
        else{
            sql = `SELECT * FROM partido order by registro`
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaPartido = [];
        for (const registro of registros) {
            const partido = new Partido(
                registro.nome,
                registro.sigla,
                registro.registro,
               
            );
            listaPartido.push(partido);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaPartido
    }

}