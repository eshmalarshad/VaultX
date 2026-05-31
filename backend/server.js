import express from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const dbName = 'VaultX'
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/'
const client = new MongoClient(uri)

const app = express()
const port = process.env.PORT || 3000

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173'
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

app.use(express.json())
app.use(bodyParser.json())

await client.connect()

app.get('/health', (req, res) => {
  res.send({ status: 'Backend is running' })
})

// Get All Passwords
app.get('/', async (req, res) => {
  const database = client.db(dbName)
  const collection = database.collection('Passwords')
  const findResult = await collection.find({}).toArray()
  res.json(findResult)
})

// Save a Password
app.post('/', async (req, res) => {
  const password = req.body
  const database = client.db(dbName)
  const collection = database.collection('Passwords')
  const findResult = await collection.insertOne(password)
  res.send({ success: true, result: findResult })
})

// Delete a Password
app.delete('/', async (req, res) => {
  const password = req.body
  const database = client.db(dbName)
  const collection = database.collection('Passwords')
  const findResult = await collection.deleteOne(password)
  res.send({ success: true, result: findResult })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`)
})
