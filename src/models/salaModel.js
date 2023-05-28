const db = require("./db");

let buscarSala= async(idsala)=>{
    return db.findOne("sala", {_id: idsala});
}

let listarSala = async()=>{
    let sala = await db.findAll('sala');
    return sala;
}

let atualizarMensagens = async (sala) => {
    return await db.updateOne("sala", sala,{_id:sala._id});
}

let buscarMensagens = async (idsala,timestamp)=>{
    let sala = await buscarSala(idsala);
    if(sala.msgs){
        let msgs =[];
        sala.msgs.forEach((msg)=>{
            if(msg.timestamp >= timestamp){
                msgs.push(msg);
            }
        });
        return msgs;
    }
    return [];
}

module.exports = {listarSala, atualizarMensagens, buscarMensagens, buscarSala};