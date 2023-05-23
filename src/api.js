var express = require("express");
var app = express();
const usuarioController = require('./controllers/usuarioController');
const salaController = require('./controllers/salaController');
const token = require("./util/token");
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req, res, next) => {
    res.status(200).send("<h1>API CHAT<h1>");
}));

app.use("/",router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome":"API - CHAT",
        "versão":"0.1.0",
        "autor":"nicolas morschel"
    });
}));

app.use('/entrar',router.post('/entrar',async(req, res, next)=>{
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/sala",router.get("/sala", async (req, res, next) => {
    if(await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
    {
        let resp = await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({mensagem:"Não Autorizado!!"});
    }
}))

app.use('/sala/entrar',router.get('/sala/entrar', async(req, res)=>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.entrar(req.header.iduser, req.query.idsala);
    req.status(200).send(resp);
}));

app.use("/sala/mensagem", router.post("/sala/mensagem", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick))
    return false;
    let resp = await salaController.enviarMensagem(req.headers.nick,req.body.mensagem,req.body.idSala);
    res.status(200).send(resp);
}))

module.exports=app;