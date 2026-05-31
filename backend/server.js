import express from 'express'
import { MongoClient } from 'mongodb';
// const bodyparser = require("body-parser")
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();
// console.log(process.env.MONGO_URI)

const dbName = 'VaultX';
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

const app = express()
const port = 3000
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

app.use(express.json())
app.use(bodyParser.json())
await client.connect()

//Get All Passwords
app.get('/', async(req, res) => {
    const database = client.db(dbName);
    const collection=database.collection('Passwords')
    const findResult=await collection.find({}).toArray();
    res.json(findResult)
})

//Save a Password
app.post('/', async(req, res) => {
    const password=req.body
    const database = client.db(dbName);
    const collection=database.collection('Passwords')
    const findResult=await collection.insertOne(password);
    res.send({success:true, result:findResult})
})

//Delete a Password

app.delete('/', async(req, res) => {
    const password=req.body
    const database = client.db(dbName);
    const collection=database.collection('Passwords')
    const findResult=await collection.deleteOne(password);
    res.send({success:true, result:findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost${port}`)
});
