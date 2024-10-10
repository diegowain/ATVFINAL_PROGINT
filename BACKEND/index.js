import express from "express"
import rotaPartido from "./Rotas/rotaPartido.js"
import rotaCandidato from "./Rotas/rotaCandidato.js"
import cors from "cors"

const app = express();
const host = '0.0.0.0';
const porta = 3024;

app.use(cors({
    origin: '*',
}));
app.use(express.json());

app.use('/partido', rotaPartido)
app.use('/candidato', rotaCandidato)

app.listen(porta,host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})