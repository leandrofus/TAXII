const res = require('express/lib/response');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://AdmiN:MiCa22052018@cluster0.p2waf.mongodb.net/taxii?retryWrites=true&w=majority";

async function login(req) {
    console.log(req.body)
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const result = await client.db('taxii').collection('users').findOne({
        username: req.body.username
    })
    client.close();
    console.log(result);
    if (result.username === req.body.username && result.password === req.body.password) {
        console.log('ingreso')
        return { userid: result.id, logged: true };
    } else {
        console.log('fuiraaa');
        return false

    }
};



async function verTodo(dbName, collectionName) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const result = await client.db(dbName).collection(collectionName).find({}).toArray();
    console.log(result);
    client.close();
}

async function insert(dbName, collectionName, newdish) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    await client.db(dbName).collection(collectionName).insertOne(newdish);
    console.log("1 document inserted into collection dishes");
    client.close();

}
async function carga(req, session) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log(req);
    await client.db('taxii').collection('registros').insertOne({
        id: session,
        fecha: req.fecha,
        recaudacion: req.recaudacion,
        combustible: req.combustible,
        cincuenta: req.cincuenta,
        km: req.cincuenta,
        gastos: req.gastos
    });

    client.close();

}

module.exports = { verTodo, insert, login, carga }