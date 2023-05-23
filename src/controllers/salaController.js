const { Timestamp } = require('mongodb');
const salaModel = require('../models/salaModel');

exports.get = async(req, res)=>{
    return await salaModel.listarSala();
}

exports.entrar = async (iduser, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    user.sala={_id:sala._id, nome:sala.nome,tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)){
        return{mensagem:"tudo certo", timestamp:timestamp=Date.now()};
    }
    return false;
};

exports.enviarMensagem = async (nick, mensagem, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    if(!sala.mensagem){
        sala.mensagem=[];
    }
    timestamp=Date.now()
    sala.msgs.push(
        {
            timestamp:timestamp,
            mensagem:mensagem,
            nick:nick
        }
    )
    let resp = await salaModel.atualizarMensagens(sala);
    return {"mensagem":"tudo certo", "timestamp":timestamp};
}