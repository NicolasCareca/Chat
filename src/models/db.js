const { MongoClient, ObjectId } = require("mongodb");

let x;

async function connect() {
    if ( x) return  x;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    x = client.db(process.env.DB_DATABASE);
    return  x;
}

let findAll = async(collection)=>{
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

let findOne = async(collection, _id)=>{
    const db = await connect();
    let ob = await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    if(ob)
        return ob[0];
    return false;
}

let updateOne = async (collection, objeto, param)=>{
    const db = await connect();
    let result = await db.collection(collection).updateOne(param,{$set: objeto});
    return result;
}

module.exports = {findAll, insertOne, findOne, updateOne}