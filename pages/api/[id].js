import { ObjectID } from "bson";

const { MongoClient } = require("mongodb");



export default async function (req, res){
  const client = new MongoClient(process.env.mongodbURL)
  const database = await client.db('client')
  const clients = await database.collection('client')
  
  const { body, method } = req

  if(req.method === "POST") {
    await clients.insertOne(body)
  }
  if(req.method === "DELETE") {
    await clients.deleteOne({_id: ObjectID(body.id)})
  }

  const response = await clients.find({}).toArray()
  await client.close()
  res.status(200).json(response)
}

