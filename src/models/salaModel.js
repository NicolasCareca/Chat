const db = require("./db");

let buscarSala= async(idsala)=>{
    return db.findOne("sala", idsala);
}

let listarSala = async ()=>{
    let sala = await db.findAll("sala");
    return sala;
}

let atualizarMensagens = async (sala) => {
    return await db.updateOne("sala", sala,{_id:sala.id});
}

let buscarMensagens = async (idsala, timestamp)=>{
    let sala = await buscarSala(idsala);
    if(sala.mensagem){
        let mensagem=[];
        sala.mensagem.forEach((mensagem)=>{
            if(mensagem.timestamp >= timestamp){
                mensagem.push(mensagem);
            }
        });
        return mensagem;
    }
    return [];
}

module.exports = {buscarSala, listarSala, atualizarMensagens, buscarMensagens}